
// import cars from "@/util/cars.json"
// import categoriesRaw from "@/util/categories.json"

// // 1. Strongly type categories.json
// const categories = categoriesRaw as readonly { name: string; image: string }[]

// export type Category = (typeof categories)[number] & { count: number }


// export function getCategoryData(): Category[] {
//   const countMap: Record<string, number> = {}

//   for (const car of cars) {
//     const category = car.type
//     if (category) {
//       countMap[category] = (countMap[category] || 0) + 1
//     }
//   }

//   const merged = categories.map((cat) => ({
//     ...cat,
//     count: countMap[cat.name] || 0,
//   }))

//   return merged
// }
import cars from "@/util/cars.json";
import categoriesRaw from "@/util/categories.json";

// 1. Strongly type categories.json
const categories = categoriesRaw as readonly { name: string; image: string }[];

// 2. Exported Category type includes slug and count
export type Category = {
  name: string;
  image: string;
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

// 4. Main function to get categories with count and slug
export function getCategoryData(): Category[] {
  const countMap: Record<string, number> = {};

  for (const car of cars) {
    const category = car.type;
    if (category) {
      countMap[category] = (countMap[category] || 0) + 1;
    }
  }

  const merged = categories.map((cat) => ({
    ...cat,
    count: countMap[cat.name] || 0,
    slug: slugify(cat.name),
  }));

  return merged;
}
