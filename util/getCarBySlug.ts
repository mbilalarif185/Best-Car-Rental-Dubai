import cars from "./cars_details.json"
import { Car } from "@/types/detail_type"

export function getCarBySlug(slug: string): Car | undefined {
  return cars.find(car => car.slug === slug)
}
