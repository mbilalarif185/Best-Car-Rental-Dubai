import cars from "./cars.json"
import { Car } from "@/types/type"

export function getCarBySlug(slug: string): Car | undefined {
  return cars.find(car => car.slug === slug)
}
