import cars from '@/util/cars.json';
import { Car } from '@/types/type';
import dynamic from "next/dynamic";
import categoryData from '@/util/categories.json';
const CarsListing4 =dynamic(()=>import("@/components/sections/CarsListing4"))
import Layout from "@/components/layout/Layout";
import Header from '@/components/category/header';
import Notfound from '@/components/category/notfound';
import { Metadata } from 'next';
interface Props {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const categorySlug = params.category.toLowerCase();
  const category = categoryData.find(item => item.slug.toLowerCase() === categorySlug);

  if (!category) Notfound();

  // TypeScript doesn't narrow after notFound, so use a non-null assertion
  const definedCategory = category!;

  return {
    title: definedCategory.title,
    description: definedCategory.meta_desc,
    openGraph: {
      title: definedCategory.title,
    description: definedCategory.meta_desc,
      url: `https://bestcarrentaldubai.ae/luxury-fleet/${categorySlug}`,
      type: "website",
      images: [
        {
          url: definedCategory.image,
          width: 800,
          height: 600,
          alt: `${definedCategory.name} Car Rental Dubai`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: definedCategory.title,
      description: definedCategory.meta_desc,
      images: [definedCategory.image],
    },
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
