import { notFound } from "next/navigation"
import { getCarBySlug } from "@/util/getCarBySlug"
import { Car } from "@/types/type"
import cars from "@/util/cars.json"
import CarDetail from "@/components/cars/CarDetail"
import Head from "next/head"
import link from "next/link"

type Props = {
  params: { slug: string } 
}

export async function getStaticPaths() {
  const paths = cars.map(car => ({
    params: { slug: car.slug }
  }))

  return {
    paths,
    fallback: 'blocking', 
  }
}


export default function CarDetailPage({ params }: Props) {
  const car: Car | undefined = getCarBySlug(params.slug)

  if (!car) return notFound()

    const schemaMarkup = {
      "@context": "https://schema.org",
      "@type": "Car",
      "name": car.name,
      "image": car.image,
      "description": `Rent the ${car.name} with ${car.seats} seats, ${car.doors} doors. Drive luxury in Dubai today!`,
      "brand": {
        "@type": "Brand",
        "name": "Legendary Car Rental Dubai"
      },
      "offers": {
        "@type": "Offer",
        "priceCurrency": "AED",
        "price": car.price,
        "availability": "https://schema.org/InStock",
        "url": `https://bestcarrentaldubai.ae/cars/${car.slug}`
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": car.rating
      },
     
    }
  return (
    <main>
     
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaMarkup),
          }}
        />
         <link rel="preload" href={car.image} as="image" />
        <link
          rel="preload"
          href="/fonts/font-awesome.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"  
        />
      </Head>

      <CarDetail car={car} />
    </main>
  )
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const car = getCarBySlug(params.slug)
  if (!car) return { notFound: true }

  return {
    props: { car },
    revalidate: 60, 
  }
}
export async function generateMetadata({ params }: { params: { slug: string } }) {  
  const car = getCarBySlug(params.slug)
  if (!car) return {}

  return {
    title: `${car.name} Rental in Dubai | Legendary Car Rental`,
    description: `Rent the ${car.name} with ${car.seats} seats, ${car.doors} doors. Drive luxury in Dubai today!`,
    openGraph: {
      images: [car.image],
    },
  }
}

// import { notFound } from "next/navigation"
// import { getCarBySlug } from "@/util/getCarBySlug"
// import { Car } from "@/types/type"
// import cars from "@/util/cars.json"
// import CarDetail from "@/components/cars/CarDetail"
// import Head from "next/head"
// import Link from "next/link"

// type Props = {
//   car: Car // Fix the type to represent a car
//   params: { slug: string }
// }

// // Static Paths Generation
// export async function getStaticPaths() {
//   const paths = cars.map((car) => ({
//     params: { slug: car.slug },
//   }))

//   return {
//     paths,
//     fallback: "blocking", // Use 'blocking' for ISR or 'false' for SSG
//   }
// }

// // Static Props (pre-generated data for each car)
// export async function getStaticProps({ params }: { params: { slug: string } }) {
//   const car = getCarBySlug(params.slug)

//   if (!car) {
//     return { notFound: true }
//   }

//   return {
//     props: { car },
//     revalidate: 60, // Incremental Static Regeneration (ISR) for fresh data every 60 seconds
//   }
// }

// // Page Metadata
// export async function generateMetadata({ params }: { params: { slug: string } }) {
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

// // Main Car Detail Page Component
// export default function CarDetailPage({ car }: Props) {
//   if (!car) return notFound()

//   const schemaMarkup = {
//     "@context": "https://schema.org",
//     "@type": "Car",
//     "name": car.name,
//     "image": car.image,
//     "description": `Rent the ${car.name} with ${car.seats} seats, ${car.doors} doors. Drive luxury in Dubai today!`,
//     "brand": {
//       "@type": "Brand",
//       "name": "Legendary Car Rental Dubai",
//     },
//     "offers": {
//       "@type": "Offer",
//       "priceCurrency": "AED",
//       "price": car.price,
//       "availability": "https://schema.org/InStock",
//       "url": `https://bestcarrentaldubai.ae/cars/${car.slug}`,
//     },
//     "aggregateRating": {
//       "@type": "AggregateRating",
//       "ratingValue": car.rating,
//     },
//   }

//   return (
//     <main>
//       <Head>
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{
//             __html: JSON.stringify(schemaMarkup),
//           }}
//         />
//         <link rel="preload" href={car.image} as="image" />
//         <link
//           rel="preload"
//           href="/fonts/font-awesome.woff2"
//           as="font"
//           type="font/woff2"
//           crossOrigin="anonymous"
//         />
//       </Head>

//       <CarDetail car={car} />

      
//     </main>
//   )
// }
