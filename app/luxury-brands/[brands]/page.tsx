import cars from '@/util/cars.json';
import brands from '@/util/brands.json';
import { Car } from '@/types/type';
import Layout from "@/components/layout/Layout";
import Header from '@/components/category/header';
import { notFound } from 'next/navigation';
import dynamic from "next/dynamic";
const CarsListing4 =dynamic(()=>import("@/components/sections/CarsListing4"))
interface Props {
  params: {
    brands: string;
  };
}

export default function CategoryPage({ params }: Props) {
  const brandSlug = params.brands.toLowerCase();

  const matchedBrand = brands.find(
    (brand) => brand.slug.trim().toLowerCase() === brandSlug
  );

  if (!matchedBrand) {
    notFound();
  }

  const filteredCars = cars.filter(
    (car: Car) => car.brand.trim().toLowerCase() === matchedBrand.name.trim().toLowerCase()
  );
  if (filteredCars.length === 0) {
    notFound();
  }

  return (
    <main>
      <Layout footerStyle={1}>
        <Header
          breadcrumbLabel={matchedBrand.name}
          secondbreadcrumb="Luxury Brands"
          secondbreadcrumburl="/luxury-brands"
          breadcrumbUrl={`/luxury-brands/${matchedBrand.slug}`}
          categorySlug={undefined} // Not a category page
        />
        <CarsListing4
          cars={filteredCars}
          brandSlug={matchedBrand.slug}
        />
      </Layout>
    </main>
  );
}
