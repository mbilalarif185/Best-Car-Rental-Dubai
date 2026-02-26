import { notFound } from "next/navigation";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { getVendorDetailsBySlug, getPublicCarsForVendor } from "@/lib/cars";
import { getStaticDealerDetailsBySlug, getCarsForStaticDealer } from "@/lib/staticDealers";
import { toDisplayLabel } from "@/util/format";
import CarsListing4 from "@/components/sections/CarsListing4";
import DealerContactForm from "@/components/dealer/DealerContactForm";

const DEFAULT_BANNER = "/assets/imgs/page-header/banner8.png";

/** Build WhatsApp link from contact number (digits only; assume 971 for UAE if 9 digits). */
function toWhatsAppHref(contact_number: string | null | undefined): string {
  if (!contact_number?.trim()) return "https://wa.me/971545514155";
  const digits = contact_number.replace(/\D/g, "");
  if (digits.length === 0) return "https://wa.me/971545514155";
  if (digits.length === 9 && digits.startsWith("5")) return `https://wa.me/971${digits}`;
  if (digits.length >= 12 && digits.startsWith("971")) return `https://wa.me/${digits}`;
  if (digits.length >= 10) return `https://wa.me/${digits}`;
  return `https://wa.me/971${digits}`;
}

type Params = { slug: string } | Promise<{ slug: string }>;

async function resolveSlug(params: Params): Promise<string> {
  const p = await Promise.resolve(params);
  return p.slug ?? "";
}

export async function generateMetadata({ params }: { params: Params }) {
  const slug = await resolveSlug(params);
  const vendor = (await getVendorDetailsBySlug(slug)) ?? getStaticDealerDetailsBySlug(slug);
  const name = vendor?.company_name?.trim() || "Dealer";
  return {
    title: `${toDisplayLabel(name)} | Dealer Details | Best Car Rental Dubai`,
    description: `Rent luxury cars from ${toDisplayLabel(name)}. ${vendor?.bio?.slice(0, 120) ?? ""}`,
  };
}

export default async function DealerDetailsPage({ params }: { params: Params }) {
  const slug = await resolveSlug(params);
  const vendor = (await getVendorDetailsBySlug(slug)) ?? getStaticDealerDetailsBySlug(slug);
  if (!vendor) return notFound();

  const isStaticDealer = vendor.id.startsWith("static-");
  const cars = isStaticDealer ? getCarsForStaticDealer(slug) : await getPublicCarsForVendor(vendor.id);
  const companyName = toDisplayLabel(vendor.company_name ?? "Dealer");
  const bannerImage = vendor.company_logo_url ?? vendor.avatar_url ?? DEFAULT_BANNER;
  const mapQuery = vendor.address !== "—" ? vendor.address : "Dubai";

  return (
    <Layout footerStyle={1}>
      <div>
        {/* Banner: company profile image, H1 = company name, p = Rent luxury Cars from {company_name} */}
        <div className="page-header pt-30 background-body">
          <div className="custom-container position-relative mx-auto">
            <div className="bg-overlay rounded-12 overflow-hidden">
              <img
                className="w-100 h-100 img-banner object-fit-cover"
                src={bannerImage}
                alt=""
              />
            </div>
            <div className="container position-absolute z-1 top-50 start-50 translate-middle text-center">
              <h1 className="text-white">{companyName}</h1>
              <p className="text-white text-xl-medium">Rent luxury cars from {companyName}</p>
            </div>
          </div>
        </div>

        {/* Dealer details: overview + sidebar */}
        <section className="box-section box-content-tour-detail box-content-room-detail background-body border-bottom">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="box-collapse-expand">
                  <div className="group-collapse-expand">
                    <button
                      className="btn btn-collapse"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOverview"
                      aria-expanded="true"
                      aria-controls="collapseOverview"
                    >
                      <h6>Overview</h6>
                      <svg width={12} height={7} viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                    <div className="collapse show" id="collapseOverview">
                      <div className="card-contact border-0 border-bottom rounded-0 d-flex">
                        <div className="card-image me-3">
                          <div className="position-relative">
                            <img
                              src={vendor.avatar_url ?? "/assets/imgs/dealer/dealer-listing/icon-9.svg"}
                              alt=""
                              className={vendor.avatar_url ? "object-fit-cover" : undefined}
                            />
                          </div>
                        </div>
                        <div className="card-info">
                          <div className="card-title">
                            <span className="title heading-6">{companyName}</span>
                            <p className="text-md-medium neutral-500">{vendor.address}</p>
                          </div>
                          <div className="card-method-contact2">
                            <span className="email text-xs-bold">{vendor.total_vehicles} Vehicle{vendor.total_vehicles !== 1 ? "s" : ""}</span>
                          </div>
                        </div>
                      </div>
                      {vendor.bio && (
                        <div className="card card-body">
                          <p className="mb-0">{vendor.bio}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="sidebar-left border-1 background-card">
                  <h6 className="text-xl-bold neutral-1000">Get in touch</h6>
                  <div className="box-sidebar-content">
                    <DealerContactForm
                      vendorEmail={vendor.business_email}
                      vendorName={companyName}
                    />
                    <div className="box-info-contact pt-4">
                      <p className="text-md-medium mobile-phone neutral-1000">
                        <span className="text-md-bold">Mobile:</span> {vendor.contact_number ?? "—"}
                      </p>
                      <p className="text-md-medium email neutral-1000">
                        <span className="text-md-bold">Email:</span>{" "}
                        {vendor.business_email ? (
                          <a href={`mailto:${vendor.business_email}`} className="neutral-1000">{vendor.business_email}</a>
                        ) : (
                          "—"
                        )}
                      </p>
                      <p className="text-md-medium whatsapp neutral-1000">
                        <span className="text-md-bold">WhatsApp:</span>{" "}
                        {vendor.contact_number ? (
                          <a
                            href={toWhatsAppHref(vendor.contact_number)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="neutral-1000"
                          >
                            {vendor.contact_number}
                          </a>
                        ) : (
                          "—"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="sidebar-banner">
                  <div className="p-4 background-body border rounded-3">
                    <p className="text-xl-bold neutral-1000 mb-4">Dealer location</p>
                    <div className="box-collapse scrollFilter mb-15">
                      <div className="pt-0">
                        <div className="box-map-small">
                          <iframe
                            src={`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
                            width="100%"
                            height={160}
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Dealer location"
                          />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm-medium neutral-1000">{vendor.address}</p>
                    <a
                      className="text-sm-medium text-primary mt-2 d-inline-block"
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Listed by this dealer - cars */}
        {cars.length > 0 ? (
          <CarsListing4
            cars={cars}
            customHeading="Listed by this dealer"
            customDescription={`${cars.length} vehicle${cars.length !== 1 ? "s" : ""} from ${companyName}`}
          />
        ) : (
          <section className="section-box pt-50 background-body">
            <div className="container">
              <div className="row align-items-end">
                <div className="col-md-9 mb-30">
                  <h4 className="title-svg neutral-1000 mb-15">Listed by this dealer</h4>
                  <p className="text-lg-medium text-bold neutral-500">No cars currently listed.</p>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
