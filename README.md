# YENZHEN TAILORING

Premium custom sublimation sportswear website built with Next.js 14+, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Product Catalog** — Browse custom sportswear categories (Basketball Jerseys, Shorts, Hoodies, Sando, Muse Uniform)
- **Finished Works Gallery** — Responsive image grid with lightbox
- **Pre-Made Templates** — Design template showcase
- **Quote Calculator** — Multi-step form with real-time price estimation
- **Customer Ratings** — 5-star rating display
- **Contact Form** — Customer inquiries saved to Supabase + email notifications
- **Sizing Guide** — Detailed size charts per category
- **Admin Dashboard** — Full CRUD management panel (password protected)

## Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Image Hosting:** OneDrive for Education (shared links)
- **Hosting:** Vercel + Supabase (free tier)
- **Auth:** Supabase Auth (admin email/password)

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Supabase project ([supabase.com](https://supabase.com))
- OneDrive for Education account (for image hosting)
- Optional: Resend API key for email notifications

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd yenzhen-tailoring
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**
   
   Copy `.env.example` to `.env.local` and fill in your values:
   ```bash
   cp .env.example .env.local
   ```
   
   Required variables:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ADMIN_EMAIL=admin@example.com
   # Optional: for email notifications
   EMAIL_SERVICE_API_KEY=your_resend_api_key
   ```

4. **Set up the database**
   
   Open the Supabase SQL Editor and run the SQL from `sql/schema.sql` (see below).

5. **Run the development server**
   ```bash
   npm run dev
   ```
   
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

Run this SQL in your Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Product categories
CREATE TABLE product_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  base_price DECIMAL(10,2),
  material_options TEXT[],
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Finished works gallery
CREATE TABLE gallery_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT,
  image_url TEXT NOT NULL,
  uploaded_at TIMESTAMP DEFAULT NOW(),
  display_order INT DEFAULT 0
);

-- Pre-made templates
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  thumbnail_url TEXT,
  image_url TEXT,
  product_category_id UUID REFERENCES product_categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Quote requests
CREATE TABLE quote_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  product_type TEXT,
  quantity INT,
  fabric_options TEXT,
  printing_type TEXT,
  estimated_price TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Contact messages
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Static ratings
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_name TEXT,
  stars INT CHECK (stars >= 1 AND stars <= 5),
  review_text TEXT,
  product_id UUID NULL,
  created_at TIMESTAMP
);

-- Insert sample product categories
INSERT INTO product_categories (name, slug, description, base_price, material_options) VALUES
('Basketball Jersey', 'basketball-jersey', 'Custom sublimation jersey', 25.00, ARRAY['Polyester', 'Spandex']),
('Shorts', 'shorts', 'Matching basketball shorts', 18.00, ARRAY['Polyester', 'Cotton']),
('Hoodie', 'hoodie', 'Premium fleece hoodie', 35.00, ARRAY['Cotton', 'Polyester Blend']),
('Sando', 'sando', 'Tank top for sports', 15.00, ARRAY['Polyester']),
('Muse Uniform', 'muse-uniform', 'Cheer/dance uniform', 40.00, ARRAY['Spandex', 'Nylon']);

-- Insert sample ratings
INSERT INTO ratings (customer_name, stars, review_text) VALUES
('Michael T.', 5, 'Amazing quality! The sublimation on the basketball jerseys is vibrant and durable.'),
('Sarah L.', 5, 'Perfect fit and excellent craftsmanship. The custom hoodie looks professional.'),
('David K.', 4, 'Great communication and fast turnaround. The shorts quality exceeded expectations.');
```

## OneDrive Image Links — Getting Direct URLs

The site stores OneDrive shared links as-is. To get a **direct image URL** from OneDrive:

1. Open the image in OneDrive
2. Click **Share** → **Embed**
3. In the embed code, find the `<iframe>` tag
4. Copy the `src` attribute — this is your direct image URL
5. Paste it into the admin dashboard

The URL will look like: `https://*.sharepoint.com/:i:/g/personal/.../thumbnail.jpg?width=800`

**Important:** If the URL does not end with an image extension (.jpg, .png, .gif, .webp), the image may not display properly on the website.

## Admin Panel

### Creating an Admin Account

1. Go to your Supabase Dashboard → Authentication → Users
2. Click "Add user" and enter the admin email and password
3. Or use the Supabase Auth sign-up page at `/admin`

### Protected Routes

All `/admin/*` routes are protected by Supabase Auth. Only authenticated users can access the admin panel.

## Email Notifications (Optional)

To enable email notifications when new quotes or contacts are submitted:

1. Sign up at [Resend](https://resend.com) (free tier available)
2. Add your API key to `.env.local`:
   ```env
   EMAIL_SERVICE_API_KEY=re_xxxxxxxxxxxx
   ```
3. Configure `ADMIN_EMAIL` in `.env.local` to receive notifications

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in project settings
4. Deploy!

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Your Supabase service role key |
| `ADMIN_EMAIL` | No | Admin email for notifications |
| `EMAIL_SERVICE_API_KEY` | No | Resend/SendGrid API key for emails |

## Project Structure

```
├── app/
│   ├── page.tsx                 # Home page (hero, featured, gallery)
│   ├── catalog/
│   │   ├── page.tsx             # All categories listing
│   │   └── [slug]/
│   │       └── page.tsx         # Single category detail
│   ├── gallery/page.tsx         # Finished works gallery
│   ├── templates/page.tsx       # Template showcase
│   ├── quote/page.tsx           # Quote calculator (multi-step)
│   ├── sizing/page.tsx          # Sizing guides
│   ├── contact/page.tsx         # Contact form
│   ├── ratings/page.tsx         # Customer ratings
│   ├── api/
│   │   ├── quote/route.ts       # POST quote + email
│   │   └── contact/route.ts     # POST message + email
│   ├── admin/
│   │   ├── layout.tsx           # Auth wrapper
│   │   ├── page.tsx             # Login page
│   │   ├── dashboard/page.tsx   # Dashboard overview
│   │   ├── quotes/page.tsx      # Manage quotes
│   │   ├── messages/page.tsx    # Manage messages
│   │   ├── gallery/page.tsx     # Gallery CRUD
│   │   ├── templates/page.tsx   # Templates CRUD
│   │   └── categories/page.tsx  # Categories CRUD
│   └── layout.tsx               # Root layout
├── components/
│   ├── layout/                  # Navbar, Footer
│   ├── sections/                # Hero, CategoryCard, Gallery
│   ├── admin/                   # Sidebar, DataTable
│   └── ui/                      # Reusable components
├── lib/
│   ├── utils.ts                 # Helper functions
│   ├── supabase.ts              # Server-side Supabase functions
│   └── metadata.ts              # SEO metadata builder
├── types/
│   └── database.ts              # TypeScript type definitions
├── sql/
│   └── schema.sql               # Database schema
└── public/                      # Static assets
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |

## License

Copyright © 2024 YenZhen Tailoring. All rights reserved.