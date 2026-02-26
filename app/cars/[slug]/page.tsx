import cars from "@/util/cars_details.json";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
const CarDetail = dynamic(() => import("@/components/cars/CarDetail"));
import Layout from "@/components/layout/Layout";
import { Car } from "@/types/detail_type";
import crypto from "crypto";
import { getCarBySlug } from "@/lib/cars";
import { toDisplayLabel } from "@/util/format";

const BASE_URL = "https://bestcarrentaldubai.ae";

const generateDeterministicVIN = (slug: string): string => {
  const base = slug.replace(/[^A-Z0-9]/gi, "").toUpperCase().padEnd(10, "X").slice(0, 10);
  const hash = crypto.createHash("sha1").update(slug).digest("hex").toUpperCase();
  const hashPart = hash.replace(/[^A-Z0-9]/g, "").slice(0, 7);
  return (base + hashPart).slice(0, 17);
};

/** Resolve slug from params (supports Next 15 Promise<params>). */
async function resolveSlug(params: { slug: string } | Promise<{ slug: string }>): Promise<string> {
  const p = await Promise.resolve(params);
  return p.slug ?? "";
}

/** Get car by slug: DB first, then static JSON fallback. Returns car, fromDb, and vendor when from DB. */
async function getCar(slug: string): Promise<{ car: Car; fromDb: boolean; vendor?: { id: string; slug: string; company_name: string | null; contact_number: string | null; business_email: string | null; city: string | null; country: string | null } } | undefined> {
  const dbResult = await getCarBySlug(slug);
  if (dbResult) return { car: dbResult.car, fromDb: true, vendor: dbResult.vendor };
  const staticCar = (cars as Car[]).find((c) => c.slug === slug);
  if (staticCar) return { car: staticCar, fromDb: false };
  return undefined;
}

export async function generateStaticParams() {
  return (cars as { slug: string }[]).map((car) => ({
    slug: car.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const slug = await resolveSlug(params);
  const result = await getCar(slug);
  if (!result) return {};
  const { car } = result;

  const canonicalUrl = `${BASE_URL}/cars/${car.slug}`;
  const imageUrl = car.image?.startsWith("http") ? car.image : `${BASE_URL}${car.image}`;

  return {
    title: `${toDisplayLabel(car.name)} Rental in Dubai | Best Car Rental Dubai`,
    description: `Rent the ${toDisplayLabel(car.name)} with ${car.seats} seats, ${car.doors} doors.`,
    openGraph: {
      url: canonicalUrl,
      images: [imageUrl],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function CarDetailPage({ params }: { params: { slug: string } | Promise<{ slug: string }> }) {
  const slug = await resolveSlug(params);
  const result = await getCar(slug);

  if (!result) return notFound();
  const { car, fromDb, vendor } = result;

  const color = "Black";
  const interiorColor = "Beige";
  const imageUrlForSchema = car.image?.startsWith("http") ? car.image : `${BASE_URL}${car.image}`;

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Car",
    "name": toDisplayLabel(car.name),
    "model": "Latest Model",
    "vehicleModelDate": "2024",
    "vehicleIdentificationNumber": generateDeterministicVIN(car.slug),
    "itemCondition": "https://schema.org/NewCondition",
    "image": imageUrlForSchema,
    "description": `Rent the ${toDisplayLabel(car.name)} with ${car.seats} seats, ${car.doors} doors.`,
    "brand": {
      "@type": "Brand",
      "name": toDisplayLabel(car.brand?.trim()) || "Best Car Rental Dubai",
    },
    "bodyType": toDisplayLabel(car.type?.trim()) ?? "",
    "vehicleTransmission": toDisplayLabel(car.gear?.trim()) ?? "",
    "color": color,
    "vehicleSeatingCapacity": car.seats,
    "numberOfDoors": car.doors,
    "fuelType": toDisplayLabel(car.fuel) || "Petrol",
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
      "ratingValue": car.rating ?? 0,
      "reviewCount": car.reviews ?? 0,
      "ratingCount": car.reviews ?? 0,
    },
  };

  return (
    <main>
      <Layout footerStyle={1}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
        <CarDetail car={car} fromDb={fromDb} vendor={vendor} />
      </Layout>
    </main>
  );
}
