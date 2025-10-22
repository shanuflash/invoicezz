# Deployment Guide

## Pre-Deployment Checklist

### 1. Dependencies Installation
```bash
# Remove old node_modules and lockfiles if you have issues
rm -rf node_modules yarn.lock package-lock.json

# Install fresh dependencies
npm install
# OR
yarn install
```

### 2. Environment Configuration

Create `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

**Get your Supabase credentials:**
1. Go to [supabase.com](https://supabase.com)
2. Select your project
3. Go to Settings → API
4. Copy "Project URL" and "anon public" key

### 3. Supabase Database Setup

#### Required Tables

**inventory** table:
```sql
CREATE TABLE inventory (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  type TEXT NOT NULL,
  gst NUMERIC NOT NULL DEFAULT 0,
  count INTEGER DEFAULT 0
);
```

**types** table:
```sql
CREATE TABLE types (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  cgst NUMERIC NOT NULL,
  sgst NUMERIC NOT NULL,
  gst NUMERIC NOT NULL
);
```

**history** table:
```sql
CREATE TABLE history (
  id SERIAL PRIMARY KEY,
  invoiceno INTEGER UNIQUE NOT NULL,
  date TEXT NOT NULL,
  name TEXT NOT NULL,
  address TEXT,
  gstin TEXT,
  delname TEXT,
  deladdress TEXT,
  paymed TEXT,
  payref TEXT,
  disthro TEXT,
  total NUMERIC NOT NULL,
  items JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Row Level Security (RLS) Configuration

**For Development/Testing** (disable RLS):
```sql
ALTER TABLE inventory DISABLE ROW LEVEL SECURITY;
ALTER TABLE types DISABLE ROW LEVEL SECURITY;
ALTER TABLE history DISABLE ROW LEVEL SECURITY;
```

**For Production** (enable public access with RLS):
```sql
-- Enable RLS
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE types ENABLE ROW LEVEL SECURITY;
ALTER TABLE history ENABLE ROW LEVEL SECURITY;

-- Create policies for inventory
CREATE POLICY "Public read access" ON inventory FOR SELECT TO anon USING (true);
CREATE POLICY "Public insert access" ON inventory FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public update access" ON inventory FOR UPDATE TO anon USING (true);
CREATE POLICY "Public delete access" ON inventory FOR DELETE TO anon USING (true);

-- Create policies for types
CREATE POLICY "Public read access" ON types FOR SELECT TO anon USING (true);
CREATE POLICY "Public insert access" ON types FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Public update access" ON types FOR UPDATE TO anon USING (true);
CREATE POLICY "Public delete access" ON types FOR DELETE TO anon USING (true);

-- Create policies for history
CREATE POLICY "Public read access" ON history FOR SELECT TO anon USING (true);
CREATE POLICY "Public insert access" ON history FOR INSERT TO anon WITH CHECK (true);
```

#### Seed Data (Optional)

Add some sample types:
```sql
INSERT INTO types (name, cgst, sgst, gst) VALUES
  ('Electronics', 0.09, 0.09, 0.18),
  ('Food', 0.025, 0.025, 0.05),
  ('Clothing', 0.06, 0.06, 0.12);
```

Add sample inventory:
```sql
INSERT INTO inventory (id, name, price, stock, type, gst) VALUES
  (1, 'Laptop', 50000, 10, 'Electronics', 0.18),
  (2, 'Rice (1kg)', 100, 50, 'Food', 0.05),
  (3, 'T-Shirt', 500, 25, 'Clothing', 0.12);
```

### 4. Customize Company Details

Edit `/src/app/preview/page.jsx` and update:

```javascript
// Line ~106
<div className={styles["invoice-company-name"]}>
  YOUR COMPANY NAME  // ← Change this
</div>

// Line ~109
<div className={styles["invoice-company-address"]}>
  Your Company Address Line 1, <br />  // ← Change this
  Your City, State - Postal Code, Country.  // ← Change this
</div>

// Line ~113
<div className={styles["invoice-company-contact"]}>
  GSTIN: YOUR-GSTIN-HERE <br />  // ← Change this
  Email: your-email@example.com  // ← Change this
</div>

// Line ~259
<div className={styles["invoice-bank"]}>
  Bank Name: Your Bank Name  // ← Change this
</div>
<div className={styles["invoice-bank"]}>
  Account Number: XXXX-XXXX-XXXX  // ← Change this
</div>
<div className={styles["invoice-bank"]}>
  Branch/IFSC Code: YOUR-BRANCH/IFSC-CODE  // ← Change this
</div>
```

### 5. Build & Test

```bash
# Development mode
npm run dev
# OR
yarn dev

# Test the following:
# 1. Navigate to http://localhost:3000
# 2. Add items from dashboard
# 3. Create a test invoice
# 4. Check history

# Production build (test before deploying)
npm run build
npm start
```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Update to Next.js 15 with public access"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables:
     - `NEXT_PUBLIC_SUPABASE_URL`
     - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Deploy!

### Option 2: Netlify

1. **Build settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Environment variables**
   - Add the same Supabase env vars

### Option 3: Self-Hosted (Docker)

Create `Dockerfile`:
```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t invoice-generator .
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_SUPABASE_URL=your_url \
  -e NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key \
  invoice-generator
```

### Option 4: Traditional VPS

1. **Install Node.js 20+**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Clone and setup**
   ```bash
   git clone your-repo.git
   cd your-repo
   npm install
   npm run build
   ```

3. **Use PM2 for process management**
   ```bash
   npm install -g pm2
   pm2 start npm --name "invoice-app" -- start
   pm2 save
   pm2 startup
   ```

4. **Setup Nginx reverse proxy**
   ```nginx
   server {
     listen 80;
     server_name your-domain.com;

     location / {
       proxy_pass http://localhost:3000;
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
     }
   }
   ```

## Post-Deployment

### 1. Verify Functionality
- [ ] Home page loads with items
- [ ] Can add items to cart
- [ ] Dashboard accessible
- [ ] Can add new items
- [ ] Can add new types
- [ ] Can update stock
- [ ] Can generate invoice
- [ ] Invoice history works
- [ ] Print functionality works

### 2. Performance Optimization

**Enable caching in Vercel/Netlify:**
- Static assets are automatically cached
- Consider adding `Cache-Control` headers

**Optimize images:**
- Use Next.js Image component (already used where needed)
- Compress images in `/public` folder

**Database optimization:**
- Add indexes on frequently queried columns
  ```sql
  CREATE INDEX idx_inventory_type ON inventory(type);
  CREATE INDEX idx_history_invoiceno ON history(invoiceno);
  CREATE INDEX idx_history_date ON history(date);
  ```

### 3. Monitoring

**Vercel Analytics** (if using Vercel):
- Automatically included
- View in Vercel dashboard

**Supabase Monitoring:**
- Monitor database usage in Supabase dashboard
- Set up email alerts for errors

**Error Tracking:**
- Consider adding Sentry or similar:
  ```bash
  npm install @sentry/nextjs
  ```

### 4. Backup Strategy

**Supabase automatic backups:**
- Enabled by default on paid plans
- Daily backups retained for 7 days

**Manual backup:**
```bash
# Using Supabase CLI
supabase db dump -f backup.sql

# Or export from Supabase dashboard
# Project Settings → Database → Backups
```

## Security Considerations

⚠️ **Important**: This is a PUBLIC application

### Recommended Security Measures:

1. **Rate Limiting**
   - Add rate limiting middleware
   - Consider Vercel's built-in rate limiting

2. **Input Validation**
   - All form inputs are validated
   - Consider adding additional server-side validation

3. **Database Security**
   - Use RLS policies (already configured)
   - Regularly review access logs
   - Monitor for unusual patterns

4. **Environment Variables**
   - Never commit `.env.local` to git
   - Use different Supabase projects for dev/prod
   - Rotate keys periodically

5. **Optional: Add Basic Auth**
   If you want to restrict access without full authentication:
   ```javascript
   // middleware.js
   export async function middleware(req) {
     const basicAuth = req.headers.get('authorization');
     
     if (basicAuth) {
       const auth = basicAuth.split(' ')[1];
       const [user, pwd] = Buffer.from(auth, 'base64').toString().split(':');
       
       if (user === 'admin' && pwd === 'your-password') {
         return NextResponse.next();
       }
     }
     
     return new Response('Auth required', {
       status: 401,
       headers: {
         'WWW-Authenticate': 'Basic realm="Secure Area"',
       },
     });
   }
   ```

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

### Database Connection Issues
- Verify Supabase URL and key
- Check if Supabase project is active
- Verify RLS policies are configured

### Items Not Loading
- Check browser console for errors
- Verify Supabase tables exist
- Check network tab for failed requests
- Ensure RLS policies allow anonymous access

### Invoice Generation Fails
- Check if `history` table exists
- Verify stock update permissions
- Check browser console for specific errors

## Maintenance

### Regular Tasks
- [ ] Weekly: Check Supabase database size
- [ ] Monthly: Review invoice history
- [ ] Monthly: Clean up old test data
- [ ] Quarterly: Update dependencies
- [ ] Quarterly: Review and update company details

### Updating Dependencies
```bash
# Check for updates
npm outdated

# Update all packages
npm update

# Or update to latest (with caution)
npx npm-check-updates -u
npm install
```

## Support

For issues or questions:
1. Check console errors in browser
2. Review server logs (Vercel/Netlify dashboard)
3. Check Supabase logs
4. Verify all environment variables are set
5. Review this documentation

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for detailed version history.

## License

This project is open source and available for personal and commercial use.
