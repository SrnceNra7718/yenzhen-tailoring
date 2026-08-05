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