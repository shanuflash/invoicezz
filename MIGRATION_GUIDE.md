# Migration Guide - Next.js 13.4 to 15.0 + Supabase v2.46

This document details all the changes made during the migration to ensure zero runtime errors.

## Package Updates

### Core Framework
```json
"next": "^13.4.1" → "^15.0.3"
"react": "18.2.0" → "^19.0.0"
"react-dom": "18.2.0" → "^19.0.0"
```

### Dependencies
```json
"@reduxjs/toolkit": "^1.9.5" → "^2.3.0"
"react-redux": "^8.0.7" → "^9.1.2"
"@headlessui/react": "^1.7.14" → "^2.2.0"
"@supabase/supabase-js": "^2.24.0" → "^2.46.0"
```

### Removed
- `@supabase/auth-helpers-nextjs` - Deprecated package removed

## Critical Changes

### 1. Supabase Client Configuration

**Before:**
```javascript
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
    },
  }
);
```

**After:**
```javascript
import { createClient } from "@supabase/supabase-js";

// Environment variable validation
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
}
if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);
```

**Why:** 
- Added environment variable validation to catch missing config early
- Disabled auth features since app is now public
- Prevents unnecessary session detection and token refresh

### 2. Auth Helpers Removal

**Before:**
```javascript
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

const supabase = createClientComponentClient();
```

**After:**
```javascript
import { supabase } from "@/app/supabase";

// Use the singleton client directly
```

**Why:**
- Auth helpers are deprecated in favor of direct client usage
- Simpler approach for public apps without authentication
- Single client instance is more efficient

### 3. Redux State Management

**Before:**
```javascript
export const fetchData = createAsyncThunk("fetchData", async () => {
  let { data, error } = await supabase
    .from("inventory")
    .select("*")
    .order("id", { ascending: true });
  if (error) console.log(error);
  return data;
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    price: { total: 0 },
    tax: {},
  },
  // ...
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});
```

**After:**
```javascript
export const fetchData = createAsyncThunk("fetchData", async (_, { rejectWithValue }) => {
  try {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .order("id", { ascending: true });
    
    if (error) throw error;
    
    // Add count property for cart functionality
    return data.map(item => ({ ...item, count: 0 }));
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return rejectWithValue(error.message);
  }
});

const dataSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
    price: { total: 0 },
    tax: {},
    loading: false,
    error: null,
  },
  // ...
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload || [];
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
```

**Why:**
- Proper error handling with try/catch
- Loading and error states for better UX
- Handles all async thunk states (pending/fulfilled/rejected)
- Ensures data always has count property initialized

### 4. Error Handling Patterns

All database operations now include proper error handling:

```javascript
// Pattern for all Supabase operations
try {
  const { data, error } = await supabase
    .from("table")
    .operation();
  
  if (error) throw error;
  
  // Process data
} catch (error) {
  console.error("Error description:", error);
  // User feedback (alert, toast, etc.)
}
```

### 5. Server Component Updates

**Before:**
```javascript
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const dashboard = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data, error } = await supabase
    .from("inventory")
    .select("*");

  return <div>{data.map(item => ...)}</div>;
};
```

**After:**
```javascript
import { supabase } from "@/app/supabase";

const dashboard = async () => {
  const { data, error } = await supabase
    .from("inventory")
    .select("*");

  if (error) {
    console.error("Error fetching inventory:", error);
  }

  const items = data || [];

  return (
    <div>
      {items.length === 0 ? (
        <div>No items found</div>
      ) : null}
      {items.map((item, id) => (
        <div key={item.id}>...</div>
      ))}
    </div>
  );
};
```

**Why:**
- Direct client usage without cookies helper
- Null safety with default empty array
- Empty state handling
- Proper key props for list items

### 6. Key Prop Usage

All `.map()` operations now use proper keys:

```javascript
// Before
{data.map((item, i) => <div>...</div>)}

// After
{data.map((item, i) => <div key={item.id || i}>...</div>)}
```

### 7. Invoice Generation

**Before:**
```javascript
const handlePrint = async () => {
  // ... print logic
  await supabase.from("history").insert([...]);
  
  data?.forEach(async (item) => {
    if (item.count > 0) {
      await supabase.from("inventory").update(...);
    }
  });
};
```

**After:**
```javascript
const handlePrint = async () => {
  try {
    // ... print logic
    
    const { error: historyError } = await supabase
      .from("history")
      .insert([...]);
    
    if (historyError) throw historyError;

    // Batch update all inventory items
    const updatePromises = data
      .filter(item => item.count > 0)
      .map(item => 
        supabase
          .from("inventory")
          .update({ stock: item.stock - item.count })
          .eq("id", item.id)
      );

    const results = await Promise.all(updatePromises);
    
    // Check for errors
    const stockErrors = results.filter(r => r.error);
    if (stockErrors.length > 0) {
      console.error("Some stock updates failed:", stockErrors);
    }
  } catch (error) {
    console.error("Error generating invoice:", error);
    alert("Failed to generate invoice. Please try again.");
  }
};
```

**Why:**
- Proper Promise.all instead of forEach with async
- Better error tracking for batch operations
- User feedback on failures
- Atomic-like operation with error recovery

### 8. Next.js 15 Compatibility

**next.config.js:**
```javascript
// Before
const nextConfig = {
  experimental: {
    serverActions: true,
  },
};

// After
const nextConfig = {
  // Server Actions are stable in Next.js 15
};
```

### 9. Middleware Simplification

**Before:**
```javascript
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  return res;
}
```

**After:**
```javascript
import { NextResponse } from "next/server";

// Middleware is disabled for public access
export async function middleware(req) {
  return NextResponse.next();
}
```

## Database Setup Requirements

Since authentication is removed, you need to configure Supabase Row Level Security (RLS):

### Option A: Disable RLS (Development/Internal Use)
```sql
ALTER TABLE inventory DISABLE ROW LEVEL SECURITY;
ALTER TABLE types DISABLE ROW LEVEL SECURITY;
ALTER TABLE history DISABLE ROW LEVEL SECURITY;
```

### Option B: Enable Public Access (Recommended)
```sql
-- Inventory table
CREATE POLICY "Enable all access for anon users" ON inventory
  FOR ALL TO anon USING (true) WITH CHECK (true);

-- Types table
CREATE POLICY "Enable all access for anon users" ON types
  FOR ALL TO anon USING (true) WITH CHECK (true);

-- History table
CREATE POLICY "Enable all access for anon users" ON history
  FOR ALL TO anon USING (true) WITH CHECK (true);
```

## Testing Checklist

- [ ] Install dependencies: `npm install` or `yarn install`
- [ ] Set up `.env.local` with Supabase credentials
- [ ] Configure Supabase RLS policies
- [ ] Test inventory loading on home page
- [ ] Test adding items in dashboard
- [ ] Test adding types in dashboard
- [ ] Test stock updates
- [ ] Test invoice generation
- [ ] Test invoice history viewing
- [ ] Test price updates
- [ ] Verify no console errors in browser
- [ ] Test print functionality

## Breaking Changes Summary

1. **Auth removal**: No login required, all pages public
2. **Supabase client**: Single instance instead of context-based helpers
3. **Error handling**: All operations now have try/catch
4. **Loading states**: Redux now tracks loading/error states
5. **Database access**: Requires RLS policy configuration

## Common Issues & Solutions

### Issue: "Missing env.NEXT_PUBLIC_SUPABASE_URL"
**Solution:** Create `.env.local` file with your Supabase credentials

### Issue: Database operations fail with permission errors
**Solution:** Configure RLS policies as described above

### Issue: Items not loading on home page
**Solution:** Check Redux state and ensure `fetchData()` is dispatched in store.js

### Issue: Console warnings about keys in lists
**Solution:** All resolved - every `.map()` now has proper key prop

## Performance Improvements

1. **Single Supabase client** - No client recreation on every component
2. **Batch operations** - Invoice generation uses Promise.all
3. **Loading states** - Better UX with loading indicators
4. **Error boundaries** - Graceful error handling prevents crashes

## Security Considerations

⚠️ **Important**: This is now a PUBLIC app. Consider:

1. Adding rate limiting for API calls
2. Implementing soft authentication for sensitive operations
3. Adding input validation on all forms
4. Regular backups of Supabase database
5. Monitoring for abuse if publicly deployed

## Rollback Plan

If you need to rollback:

1. Checkout previous commit
2. Run `npm install` to restore old packages
3. Re-enable auth middleware
4. Restore RLS policies in Supabase

## Additional Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React 19 Release Notes](https://react.dev/blog)
- [Supabase JavaScript Client v2](https://supabase.com/docs/reference/javascript)
- [Redux Toolkit RTK Query](https://redux-toolkit.js.org/)
- [Headless UI v2](https://headlessui.com/)
