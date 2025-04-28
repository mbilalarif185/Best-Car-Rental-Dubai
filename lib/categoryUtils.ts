// import cars from "@/util/cars.json";
// import categories from "@/util/categories.json";

// type Category = {
//   name: string;
//   image: string;
//   count: number;
// };

// export function getCategoryData(): Category[] {
//   const countMap: Record<string, number> = {};

//   // Count cars by category
//   for (const car of cars) {
//     const category = car.type;
//     if (category) {
//       countMap[category] = (countMap[category] || 0) + 1;
//     }
//   }

//   const merged = categories.map((cat) => ({
//     ...cat,
//     count: countMap[cat.name] || 0, 
//   }));

//   return merged;
// }
import cars from "@/util/cars.json"
import categoriesRaw from "@/util/categories.json"

// 1. Strongly type categories.json
const categories = categoriesRaw as readonly { name: string; image: string }[]

export type Category = (typeof categories)[number] & { count: number }


export function getCategoryData(): Category[] {
  const countMap: Record<string, number> = {}

  for (const car of cars) {
    const category = car.type
    if (category) {
      countMap[category] = (countMap[category] || 0) + 1
    }
  }

  const merged = categories.map((cat) => ({
    ...cat,
    count: countMap[cat.name] || 0,
  }))

  return merged
}
