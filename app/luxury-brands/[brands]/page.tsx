import cars from '@/util/cars.json';
import brands from '@/util/brands.json';
import { Car } from '@/types/type';
import Layout from "@/components/layout/Layout";
import Header from '@/components/category/header';
import { notFound } from 'next/navigation';
import dynamic from "next/dynamic";

const CarsListing4 = dynamic(() => import("@/components/sections/CarsListing4"));

interface Props {
  params: {
    brands: string;
  };
}

export async function generateStaticParams() {
  return brands.map(brand => ({
    brands: brand.slug,
  }));
}

export async function generateMetadata({ params }: { params: { brands: string } }) {
  const brandSlug = params.brands.toLowerCase();

  const matchedBrand = brands.find(
    (brand) => brand.slug.trim().toLowerCase() === brandSlug
  );

  if (!matchedBrand) return {};

  const canonicalUrl = `https://bestcarrentaldubai.ae/luxury-brands/${matchedBrand.slug}`;

  return {
    title: `Rent ${matchedBrand.name} Cars in Dubai | Best Car Rental Dubai`,
    description: `Explore luxury ${matchedBrand.name} cars for rent in Dubai. Book now for top deals on premium ${matchedBrand.name} models.`,
    openGraph: {
      url: canonicalUrl,
      title: `Rent ${matchedBrand.name} Cars in Dubai`,
      description: `Browse premium ${matchedBrand.name} cars available for rental in Dubai.`,
      images: matchedBrand.image ? [matchedBrand.image] : [],
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const brandSlug = params.brands.toLowerCase();

  const matchedBrand = brands.find(
    (brand) => brand.slug.trim().toLowerCase() === brandSlug
  );

  if (!matchedBrand) {
    return notFound();
  }

  const filteredCars = cars.filter(
    (car: Car) =>
      car.brand.trim().toLowerCase() === matchedBrand.name.trim().toLowerCase()
  );

  if (filteredCars.length === 0) {
    return notFound();
  }

  return (
    <main>
      <Layout footerStyle={1}>
        <Header
          breadcrumbLabel={matchedBrand.name}
          secondbreadcrumb="Luxury Brands"
          secondbreadcrumburl="/luxury-brands"
          breadcrumbUrl={`/luxury-brands/${matchedBrand.slug}`}
          categorySlug={undefined}
        />
        <CarsListing4
          cars={filteredCars}
          brandSlug={matchedBrand.slug}
        />
      </Layout>
    </main>
  );
}
