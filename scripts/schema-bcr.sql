-- BCR_CAR_HIRE: run this in PostgreSQL to create tables if they don't exist

CREATE TYPE user_role AS ENUM ('admin', 'vendor');

CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role user_role DEFAULT 'vendor',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE IF NOT EXISTS vendors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  company_name VARCHAR(255),
  phone VARCHAR(50),
  whatsapp_number VARCHAR(50),
  address TEXT,
  city VARCHAR(100),
  description TEXT,
  is_approved BOOLEAN DEFAULT false,
  is_blocked BOOLEAN DEFAULT false,
  listing_limit INTEGER DEFAULT 10,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_vendors_user_id ON vendors(user_id);

-- If vendors was created before listing_limit existed, run: ALTER TABLE vendors ADD COLUMN IF NOT EXISTS listing_limit INTEGER DEFAULT 10;

-- Cars and related tables (for /user/add-listing)
CREATE TABLE IF NOT EXISTS cars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vendor_id UUID NOT NULL REFERENCES vendors(id) ON DELETE CASCADE,
  title VARCHAR(200) NOT NULL,
  slug VARCHAR(250) UNIQUE NOT NULL,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL,
  car_type VARCHAR(100),
  doors INTEGER,
  color VARCHAR(100),
  luggage_capacity INTEGER,
  fuel_type VARCHAR(50),
  transmission VARCHAR(50),
  seats INTEGER,
  price_per_day NUMERIC(10,2) NOT NULL,
  description TEXT,
  country VARCHAR(100),
  city VARCHAR(100),
  is_approved BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS car_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  car_id UUID NOT NULL REFERENCES cars(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  is_primary BOOLEAN DEFAULT FALSE,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS features (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS car_features (
  car_id UUID REFERENCES cars(id) ON DELETE CASCADE,
  feature_id UUID REFERENCES features(id) ON DELETE CASCADE,
  PRIMARY KEY (car_id, feature_id)
);

-- Seed features so add-listing always has all options (safe to run multiple times)
INSERT INTO features (name) VALUES
  ('A/C: Front'),
  ('Backup Camera'),
  ('Cruise Control'),
  ('Audio system'),
  ('Touchscreen display'),
  ('GPS navigation'),
  ('Phone connectivity'),
  ('Breakfast'),
  ('In-car Wi-Fi'),
  ('Anti-lock brake system (ABS)'),
  ('Brake assist (BA)'),
  ('Airbags')
ON CONFLICT (name) DO NOTHING;
