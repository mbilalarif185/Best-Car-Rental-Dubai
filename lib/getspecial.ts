import allCars from "@/util/cars.json";

export function getspecial(count = 4) {
  return [...allCars]
    .sort((a, b) => b.price - a.price) 
    .slice(0, count);
}

