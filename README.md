# Invoice & Inventory Manager

A modern invoice generator and inventory management system built with Next.js 15 and Supabase.

## Features

- Create and manage invoices
- Track inventory with real-time stock updates
- Generate professional PDF invoices
- View invoice history
- Multi-category product management with GST support

## Setup

1. Clone the repo
2. Install dependencies:
   ```bash
   yarn install
   ```

3. Add your Supabase credentials to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Run the dev server:
   ```bash
   yarn dev
   ```

Open [http://localhost:3000](http://localhost:3000)

## Database Schema

You'll need these Supabase tables:
- `inventory` - Products (id, name, price, stock, type, gst)
- `types` - Product categories (name, cgst, sgst, gst)
- `history` - Invoice records

## Stack

- Next.js 15
- Supabase
- Redux Toolkit
- Tailwind CSS (via globals.css)
