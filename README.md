# Invoice Generator + Inventory Management

A modern web application built with Next.js 15 for generating invoices and managing inventory. This is a public version - no login required!

## Features

- 📝 **Invoice Generation**: Create professional invoices with GST calculations
- 📦 **Inventory Management**: Track stock levels and manage products
- 📊 **Dashboard**: Manage items, prices, and stock quantities
- 📜 **History**: View all generated invoices with filtering options
- 💾 **Supabase Integration**: Database storage for inventory and invoice history
- 🎨 **Modern UI**: Clean and responsive interface

## Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **Redux Toolkit** - State management
- **Supabase** - Backend and database
- **Headless UI** - Accessible UI components

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Supabase account and project (optional - for data persistence)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables (create `.env.local`):

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Setup

You'll need to set up the following tables in Supabase:

1. **inventory** - Stores product information
2. **types** - Stores product categories with GST rates
3. **history** - Stores generated invoices

## Usage

1. **Add Items**: Go to Dashboard and add products with prices and stock
2. **Add Types**: Create product categories with GST rates
3. **Create Invoice**: Select items from home page, add quantities
4. **Fill Details**: Enter buyer and delivery information
5. **Generate**: Preview and generate the final invoice

## Customization

Update the following in `/src/app/preview/page.jsx` to customize your invoice:

- Company name
- Company address
- GSTIN number
- Bank details
- Email and contact info

## Notes

- This is a public version with authentication disabled
- Anyone can access and use all features
- The login page is kept but non-functional for reference
- Update company details in the preview page to match your business

## License

This project is open source and available for personal and commercial use.
