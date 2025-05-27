import cars from "@/util/cars_details.json";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
const CarDetail = dynamic(() => import("@/components/cars/CarDetail"));
import Layout from "@/components/layout/Layout";
import { Car } from "@/types/detail_type";

const BASE_URL = "https://bestcarrentaldubai.ae";
const makeAbsoluteUrl = (path: string) =>
  path.startsWith("http") ? path : `${BASE_URL}${path}`;

export async function generateStaticParams() {
  return cars.map(car => ({
    slug: car.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const car = cars.find(car => car.slug === params.slug);
  if (!car) return {};
  
  const canonicalUrl = `${BASE_URL}/cars/${car.slug}`;
  const imageUrl = makeAbsoluteUrl(car.image);
  return {
    title: `${car.name} Rental in Dubai | Best Car Rental Dubai`,
    description: `Rent the ${car.name} with ${car.seats} seats, ${car.doors} doors.`,
    openGraph: {
       url: canonicalUrl,
      images: [imageUrl],
    },
    alternates: {
      canonical:canonicalUrl,
    },
  };
}

export default function CarDetailPage({ params }: { params: { slug: string } }) {
  const car: Car | undefined = cars.find(car => car.slug === params.slug);

  if (!car) return notFound();

  const color = "Black"; 
  const interiorColor = "Beige"; 

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Car",
    "name": car.name,
    "model": "Latest Model",
    "vehicleModelDate": "2024",
    "vehicleIdentificationNumber": `N/A-${car.slug}`,

    "itemCondition": "https://schema.org/NewCondition",
   "image": makeAbsoluteUrl(car.image),
    "description": `Rent the ${car.name} with ${car.seats} seats, ${car.doors} doors.`,
    "brand": {
      "@type": "Brand",
      "name": car.brand.trim() || "Best Car Rental Dubai",
    },
    "bodyType": car.type.trim(),
    "vehicleTransmission": car.gear.trim(),
    "color": color,
    "vehicleSeatingCapacity": car.seats,
    "numberOfDoors": car.doors,
    "fuelType": car.fuel || "Petrol",
    "vehicleInteriorColor": interiorColor,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "AED",
      "price": car.price,
      "availability": "https://schema.org/InStock",
       "url": `${BASE_URL}/cars/${car.slug}`,
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": car.rating || 0,
      "reviewCount": car.reviews || 0,
      "ratingCount": car.reviews || 0,
    },
  };

  return (
    <main>
      <Layout footerStyle={1}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
        <CarDetail car={car} />
      </Layout>
    </main>
  );
}
