
import cars from '@/util/cars.json';
import { Car } from '@/types/type';
import dynamic from "next/dynamic";
import categoryData from '@/util/categories.json';
import Layout from "@/components/layout/Layout";
import Header from '@/components/category/header';
import Notfound from '@/components/category/notfound';
import { notFound } from 'next/navigation';

const CarsListing4 = dynamic(() => import("@/components/sections/CarsListing4"));

interface Props {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  return categoryData.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const categorySlug = params.category.toLowerCase();
  const category = categoryData.find(item => item.slug.toLowerCase() === categorySlug);

  if (!category) return notFound();

  const canonicalUrl = `https://bestcarrentaldubai.ae/luxury-fleet/${categorySlug}`;

  return {
    title: category.title,
    description: category.meta_desc,
    openGraph: {
      title: category.title,
      description: category.meta_desc,
      url: canonicalUrl,
      type: "website",
      images: [
        {
          url: category.image,
          width: 800,
          height: 600,
          alt: `${category.name} Car Rental Dubai`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: category.title,
      description: category.meta_desc,
      images: [category.image],
    },
    alternates: {
      canonical: canonicalUrl, // ✅ Canonical tag added
    },
  };
}

// ✅ Render the category page
export default function CategoryPage({ params }: Props) {
  const categorySlug = params.category.toLowerCase();
  const filteredCars = cars.filter(
    (car: Car) => car.type.trim().toLowerCase() === categorySlug
  );

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
          <CarsListing4 cars={filteredCars} categorySlug={categorySlug} />
        ) : (
          <Notfound />
        )}
      </Layout>
    </main>
  );
}
