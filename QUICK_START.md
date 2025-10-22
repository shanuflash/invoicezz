# Quick Start Guide

Get your Invoice Generator up and running in 5 minutes!

## Prerequisites
- Node.js 18 or higher
- A Supabase account (free tier works)

## Setup Steps

### 1. Install Dependencies (1 minute)
```bash
npm install
# or
yarn install
```

### 2. Setup Supabase (2 minutes)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for database to initialize (~2 minutes)
3. Go to **SQL Editor** and run this setup script:

```sql
-- Create tables
CREATE TABLE inventory (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  type TEXT NOT NULL,
  gst NUMERIC NOT NULL DEFAULT 0,
  count INTEGER DEFAULT 0
);

CREATE TABLE types (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  cgst NUMERIC NOT NULL,
  sgst NUMERIC NOT NULL,
  gst NUMERIC NOT NULL
);

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

-- Disable RLS for quick start (enable in production)
ALTER TABLE inventory DISABLE ROW LEVEL SECURITY;
ALTER TABLE types DISABLE ROW LEVEL SECURITY;
ALTER TABLE history DISABLE ROW LEVEL SECURITY;

-- Add sample data
INSERT INTO types (name, cgst, sgst, gst) VALUES
  ('Electronics', 0.09, 0.09, 0.18),
  ('Food', 0.025, 0.025, 0.05),
  ('Stationery', 0.06, 0.06, 0.12);

INSERT INTO inventory (id, name, price, stock, type, gst) VALUES
  (1, 'Laptop', 50000, 10, 'Electronics', 0.18),
  (2, 'Mouse', 500, 50, 'Electronics', 0.18),
  (3, 'Rice (1kg)', 100, 100, 'Food', 0.05),
  (4, 'Notebook', 50, 200, 'Stationery', 0.12);
```

4. Go to **Settings → API**
5. Copy your **Project URL** and **anon public** key

### 3. Configure Environment (30 seconds)

Create `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=paste-your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=paste-your-anon-key-here
```

### 4. Run the App (30 seconds)

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

## What You Can Do Now

### Home Page
- View all inventory items
- Add items to cart with +/- buttons
- See total price with GST

### Dashboard
- Manage inventory
- Update stock levels
- Update prices
- Add new items
- Add new product types
- Delete items

### Create Invoice
1. Add items to cart from home page
2. Click "Next"
3. Fill in customer details
4. Click "Next" to preview
5. Click "Generate" to create invoice
6. Print the invoice

### History
- View all generated invoices
- Filter by date range
- See total sales

## Customize Your Company Details

Edit `/src/app/preview/page.jsx`:

**Line ~106** - Company Name:
```javascript
<div className={styles["invoice-company-name"]}>
  YOUR COMPANY NAME  // ← Change this
</div>
```

**Line ~109-111** - Address:
```javascript
<div className={styles["invoice-company-address"]}>
  Your Company Address Line 1, <br />
  Your City, State - Postal Code, Country.
</div>
```

**Line ~113-114** - GSTIN & Email:
```javascript
<div className={styles["invoice-company-contact"]}>
  GSTIN: YOUR-GSTIN-HERE <br />
  Email: your-email@example.com
</div>
```

**Line ~259-265** - Bank Details:
```javascript
<div className={styles["invoice-bank"]}>
  Bank Name: Your Bank Name
</div>
<div className={styles["invoice-bank"]}>
  Account Number: XXXX-XXXX-XXXX
</div>
<div className={styles["invoice-bank"]}>
  Branch/IFSC Code: YOUR-BRANCH/IFSC-CODE
</div>
```

Save the file and refresh your browser!

## Common Issues

### "Missing env.NEXT_PUBLIC_SUPABASE_URL"
- Make sure `.env.local` file exists in root directory
- Check that variable names match exactly
- Restart the dev server after creating .env.local

### Items Not Loading
- Check browser console (F12) for errors
- Verify Supabase tables were created
- Ensure RLS is disabled or policies are set
- Check that your Supabase project is active

### Can't Add Items
- Verify your Supabase anon key has write permissions
- Check that RLS is disabled for quick start
- Look for errors in browser console

## Production Deployment

For production deployment, see [DEPLOYMENT.md](./DEPLOYMENT.md)

Key considerations:
- Enable RLS with proper policies
- Use environment variables in hosting platform
- Customize company details
- Set up backups

## Next Steps

✅ Customize company details in invoice template
✅ Add your own product types
✅ Add your inventory items
✅ Generate your first invoice
✅ Review [DEPLOYMENT.md](./DEPLOYMENT.md) for production setup
✅ Check [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for technical details

## Need Help?

1. Check browser console (F12) for errors
2. Review [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed setup
3. Check [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) for technical details
4. Verify Supabase dashboard for database issues

Enjoy your Invoice Generator! 🚀
