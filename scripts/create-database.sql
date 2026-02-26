-- Run this as a PostgreSQL superuser (e.g. postgres) to create the app database.
-- From command line: psql -U postgres -f scripts/create-database.sql

CREATE DATABASE "BCR_CAR_HIRE"
  WITH ENCODING = 'UTF8'
       LC_COLLATE = 'en_US.UTF-8'
       LC_CTYPE = 'en_US.UTF-8'
       TEMPLATE = template0;

-- Then connect to BCR_CAR_HIRE and run: \i scripts/schema-bcr.sql
-- Or: psql -U postgres -d BCR_CAR_HIRE -f scripts/schema-bcr.sql
