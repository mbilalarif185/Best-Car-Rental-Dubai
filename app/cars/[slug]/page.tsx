import { notFound } from "next/navigation"
import { getCarBySlug } from "@/util/getCarBySlug"
import { Car } from "@/types/detail_type"
import cars from "@/util/cars_details.json"
import Layout from "@/components/layout/Layout"
import dynamic from "next/dynamic";
const CarDetail=dynamic(()=>import("@/components/cars/CarDetail"))
import Head from "next/head"
import Link from "next/link"

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
        "name": "Best Car Rental Dubai"
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
       <Layout footerStyle={1}>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaMarkup),
          }}
        />
         <Link rel="preload" href={car.image} as="image" />
       
      </Head>
       
      <CarDetail car={car} />
    </Layout>
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
    title: `${car.name} Rental in Dubai | Best Car Rental Dubai`,
    description: `Rent the ${car.name} with ${car.seats} seats, ${car.doors} doors.`,
    openGraph: {
      images: [car.image],
    },
  }
}
