import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/Layout";
import Header from "@/components/about_sections/header";
import { getPublicCarsForVendor, getVendorBySlug } from "@/lib/cars";
import { toDisplayLabel } from "@/util/format";

const CarsListing4 = dynamic(() => import("@/components/sections/CarsListing4"));

type Params = { slug: string } | Promise<{ slug: string }>;

async function resolveSlug(params: Params): Promise<string> {
  const p = await Promise.resolve(params);
  return p.slug ?? "";
}

export async function generateMetadata({ params }: { params: Params }) {
  const slug = await resolveSlug(params);
  const vendor = await getVendorBySlug(slug);
  const name = vendor?.company_name?.trim() || "Vendor";
  return {
    title: `Cars by ${toDisplayLabel(name)} | Best Car Rental Dubai`,
    description: `Browse all cars listed by ${toDisplayLabel(name)} for rent in Dubai.`,
  };
}

export default async function VendorCarsPage({ params }: { params: Params }) {
  const slug = await resolveSlug(params);
  const vendor = await getVendorBySlug(slug);
  if (!vendor) return notFound();

  const cars = await getPublicCarsForVendor(vendor.id);
  const companyName = vendor.company_name?.trim() || "This dealer";
  const heading = `Cars by ${toDisplayLabel(companyName)}`;
  const description =
    cars.length === 0
      ? "No cars currently listed."
      : `Explore ${cars.length} car${cars.length === 1 ? "" : "s"} from ${toDisplayLabel(companyName)}.`;

  return (
    <Layout footerStyle={1}>
      <Header
        title="Best Car Rental Dubai"
        subtitle="Your Luxury Car Rental Provider in Dubai"
        currentPage={heading}
        backgroundImage="/assets/imgs/page-header/banner.webp"
      />
      <CarsListing4
        cars={cars}
        customHeading={heading}
        customDescription={description}
      />
    </Layout>
  );
}
