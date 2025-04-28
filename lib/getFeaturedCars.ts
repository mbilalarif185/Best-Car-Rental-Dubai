import allCars from "@/util/cars.json";

export function getFeaturedCars(count = 6) {
  return allCars.slice(0, count); 
}
