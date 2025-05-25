import cars from "@/util/cars_details.json";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
const CarDetail = dynamic(() => import("@/components/cars/CarDetail"));
import Layout from "@/components/layout/Layout";
import { Car } from "@/types/detail_type";

export async function generateStaticParams() {
  return cars.map(car => ({
    slug: car.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const car = cars.find(car => car.slug === params.slug);
  if (!car) return {};
  const canonicalUrl = `https://bestcarrentaldubai.ae/cars/${car.slug}`;
  return {
    title: `${car.name} Rental in Dubai | Best Car Rental Dubai`,
    description: `Rent the ${car.name} with ${car.seats} seats, ${car.doors} doors.`,
    openGraph: {
      url: canonicalUrl,
      images: [car.image],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function CarDetailPage({ params }: { params: { slug: string } }) {
  const car = cars.find(car => car.slug === params.slug);

  if (!car) return notFound();

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Car",
    "name": car.name,
    "image": car.image,
    "description": `Rent the ${car.name} with ${car.seats} seats, ${car.doors} doors.`,
    "brand": { "@type": "Brand", "name": "Best Car Rental Dubai" },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "AED",
      "price": car.price,
      "availability": "https://schema.org/InStock",
      "url": `https://bestcarrentaldubai.ae/cars/${car.slug}`,
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": car.rating,
    },
  };

  return (
    <main>
      <Layout footerStyle={1}>
        {/* Instead of Head from next/head, use metadata functions or next/script */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
        <CarDetail car={car} />
      </Layout>
    </main>
  );
}
