
import cars from "@/util/cars.json";
import categoriesRaw from "@/util/categories.json";
import type { Car } from "@/types/type";

type RawCategory = Omit<Category, "count">;
const categories = categoriesRaw as RawCategory[];

export type Category = {
  name: string;
  image: string;
  bannerimage: string;
  count: number;
  slug: string;
};

// 3. Slugify helper function
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")       // Replace spaces with hyphens
    .replace(/[^\w-]+/g, "")    // Remove non-word characters
    .replace(/--+/g, "-")       // Replace multiple hyphens with one
    .replace(/^-+|-+$/g, "");   // Trim hyphens from start and end
}

/** Normalize type for comparison (trim + lowercase). */
function normType(t: string): string {
  return (t ?? "").trim().toLowerCase();
}

// 4. Main function to get categories with count and slug. Pass current cars (e.g. JSON + DB) for correct counts.
export function getCategoryData(carsData?: Car[]): Category[] {
  const source = carsData ?? (cars as Car[]);
  const countMap: Record<string, number> = {};

  for (const car of source) {
    const category = car.type;
    if (category) {
      const key = normType(category);
      countMap[key] = (countMap[key] || 0) + 1;
    }
  }

  const merged = categories.map((cat) => {
    const key = normType(cat.name);
    return {
      ...cat,
      count: countMap[key] || 0,
      slug: slugify(cat.name),
    };
  });

  return merged;
}
