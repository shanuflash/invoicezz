# Invoicezz

Professional invoice generator and inventory management system.

## Setup

Install dependencies:
```bash
npm install
```

Create a `.env.local` file:
```bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

Get your credentials from [supabase.com](https://supabase.com).

Run the dev server:
```bash
npm run dev
```

## Features

- Invoice generation with professional templates
- Inventory management with real-time stock tracking
- Invoice history with date filtering
- Print-ready invoice layouts
- Sample data generation for testing
- Responsive design with clean UI

## Tech Stack

- Next.js 15 (App Router, React 19)
- Supabase (Database & Real-time)
- Tailwind CSS v4
- Redux Toolkit (State Management)
- Headless UI (Modal Components)
- num-words (Number to words conversion)

## Database Schema

### Tables
- `inventory` - Product items with stock levels
- `history` - Generated invoice records

### Key Features
- Automatic stock deduction on invoice generation
- Invoice numbering system
- Customer and shipping information storage (including tax ID)