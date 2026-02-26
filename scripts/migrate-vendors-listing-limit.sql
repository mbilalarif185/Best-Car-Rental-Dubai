-- Add listing_limit to vendors if it doesn't exist (e.g. DB created before this column was added).
-- Run once: psql -d your_database -f scripts/migrate-vendors-listing-limit.sql
ALTER TABLE vendors ADD COLUMN IF NOT EXISTS listing_limit INTEGER DEFAULT 10;
