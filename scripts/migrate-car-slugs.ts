/**
 * One-time migration: update all existing cars to use SEO slug format
 * rent-{car_name}-in-dubai-{company_name}
 *
 * Run from bcr directory (ensure .env is loaded or DATABASE_URL/DB_* are set):
 *   npx tsx scripts/migrate-car-slugs.ts
 */
import path from "path";
import { config } from "dotenv";
config({ path: path.resolve(process.cwd(), ".env") });

import pool from "../lib/db";
import { slugifyCarSlug, ensureUniqueSlug } from "../lib/slug";

type Row = { id: string; title: string; slug: string; company_name: string | null };

async function migrate() {
  const client = await pool.connect();
  try {
    const rows = await client.query<Row>(
      `SELECT c.id, c.title, c.slug, v.company_name
       FROM cars c
       INNER JOIN vendors v ON v.id = c.vendor_id
       ORDER BY c.created_at ASC`
    );

    if (rows.rows.length === 0) {
      console.log("No cars to migrate.");
      return;
    }

    const existingSlugs = new Set<string>();
    let updated = 0;

    for (const car of rows.rows) {
      const company = car.company_name ?? "";
      const baseSlug = slugifyCarSlug(car.title, company);
      const newSlug = ensureUniqueSlug(baseSlug, [...existingSlugs]);

      if (newSlug === car.slug) {
        existingSlugs.add(car.slug.toLowerCase());
        continue;
      }

      await client.query("UPDATE cars SET slug = $1, updated_at = NOW() WHERE id = $2", [
        newSlug,
        car.id,
      ]);
      existingSlugs.add(newSlug.toLowerCase());
      updated++;
      console.log(`  ${car.id}: ${car.slug} → ${newSlug}`);
    }

    console.log(`Done. Updated ${updated} of ${rows.rows.length} cars.`);
  } finally {
    client.release();
    await pool.end();
  }
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
