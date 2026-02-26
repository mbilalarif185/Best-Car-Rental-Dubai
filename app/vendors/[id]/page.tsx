import { notFound, redirect } from "next/navigation";
import { getVendorById, makeVendorSlug } from "@/lib/cars";

type Params = { id: string } | Promise<{ id: string }>;

async function resolveId(params: Params): Promise<string> {
  const p = await Promise.resolve(params);
  return p.id ?? "";
}

/** Old URL /vendors/[uuid] redirects to /dealer-details/[company-slug] */
export default async function VendorsIdPage({ params }: { params: Params }) {
  const id = await resolveId(params);
  const vendor = await getVendorById(id);
  if (!vendor) return notFound();
  const slug = makeVendorSlug(vendor.id, vendor.company_name);
  redirect(`/dealer-details/${slug}`);
}
