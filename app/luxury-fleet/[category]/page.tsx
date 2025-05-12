import cars from '@/util/cars.json';
import { Car } from '@/types/type';
import dynamic from "next/dynamic";
const CarsListing4 =dynamic(()=>import("@/components/sections/CarsListing4"))
import Layout from "@/components/layout/Layout";
import Header from '@/components/category/header';
import Notfound from '@/components/category/notfound';
interface Props {
  params: {
    category: string;
  };
}

export default function CategoryPage({ params }: Props) {
  const categorySlug = params.category.toLowerCase();
  const filteredCars = cars.filter((car: Car) => car.type.trim().toLowerCase() === categorySlug);

  const formattedTitle = categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1);

  return (
    <main>
      <Layout footerStyle={1}>
        <Header
          breadcrumbLabel={formattedTitle}
          secondbreadcrumb="Luxury Fleet"
          secondbreadcrumburl="/luxury-fleet"
          breadcrumbUrl={`/luxury-fleet/${categorySlug}`}
          categorySlug={categorySlug}
        />
        {filteredCars.length > 0 ? (
          <CarsListing4 cars={filteredCars}
          categorySlug={categorySlug} />
        ) : (
          <Notfound/>
        )}
      </Layout>
    </main>
  );
}
