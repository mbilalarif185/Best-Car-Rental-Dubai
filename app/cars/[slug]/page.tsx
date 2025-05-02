import { notFound } from "next/navigation"
import { getCarBySlug } from "@/util/getCarBySlug"
import { Car } from "@/types/type"
import cars from "@/util/cars.json"
import CarDetail from "@/components/cars/CarDetail" 

type Props = {
  params: { slug: string }
}

// ✅ SERVER COMPONENT (no 'use client')
export default function CarDetailPage({ params }: Props) {
  const car: Car | undefined = getCarBySlug(params.slug)

  if (!car) return notFound()

  return (
    <main>
      <CarDetail car={car} />
    </main>
  )
}

// ✅ Static generation for each car
export async function generateStaticParams() {
  return cars.map(car => ({
    slug: car.slug,
  }))
}

// ✅ SEO metadata
// export async function generateMetadata({ params }) {
//   const car = getCarBySlug(params.slug)
//   if (!car) return {}

//   return {
//     title: `${car.name} Rental in Dubai | Legendary Car Rental`,
//     description: `Rent the ${car.name} with ${car.seats} seats, ${car.doors} doors. Drive luxury in Dubai today!`,
//     openGraph: {
//       images: [car.image],
//     },
//   }
// }
