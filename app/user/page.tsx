import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import {
  getVendorDashboardData,
  type VendorDashboardData,
} from "@/lib/dashboard";

export const dynamic = "force-dynamic";

function VendorAvatar({
  companyName,
  avatarUrl,
}: {
  companyName: string | null;
  avatarUrl: string | null;
}) {
  const initial = companyName?.trim().charAt(0)?.toUpperCase() ?? "V";
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={companyName ?? "Vendor"}
        className="avatar avatar-xl rounded-circle object-cover"
      />
    );
  }
  return (
    <span className="avatar avatar-xl rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fs-4 fw-bold">
      {initial}
    </span>
  );
}

export default async function UserDashboardHomePage() {
  const session = await getSession();
  if (!session?.user_id) {
    redirect("/login");
  }

  const data: VendorDashboardData | null = await getVendorDashboardData(
    session.user_id
  );

  if (!data) {
    return (
      <div className="row">
        <div className="col-xl-12">
          <div className="card shadow-none flex-fill">
            <div className="card-body text-center py-5">
              <p className="text-md-medium neutral-500 mb-3">
                No vendor profile found. Please complete your profile to access
                the dashboard.
              </p>
              <Link href="/user/settings" className="btn btn-primary">
                Complete Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { vendor, stats, latestCars, canAddMoreCars } = data;
  const canAddOrViewListings = vendor.is_approved && !vendor.is_blocked;
  const showAddCar = canAddOrViewListings && canAddMoreCars;
  const atCarLimit = canAddOrViewListings && !canAddMoreCars;

  return (
    <>
      {/* Profile status banner when pending or blocked */}
      {(!vendor.is_approved || vendor.is_blocked) && (
        <div className="row mb-3">
          <div className="col-12">
            <div className={`alert ${vendor.is_blocked ? "alert-danger" : "alert-warning"} mb-0 d-flex align-items-center flex-wrap gap-2`} role="alert">
              <i className="fi fi-rr-info flex-shrink-0" style={{ fontSize: "1.25rem" }} />
              <div className="flex-grow-1">
                <strong>Profile status:</strong>{" "}
                {vendor.is_blocked
                  ? "Your account has been blocked. Please contact support."
                  : "Your profile is pending approval. You cannot add cars or view your listings until an admin approves your profile."}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* At car limit - explain why Add Car is hidden */}
      {atCarLimit && (
        <div className="row mb-3">
          <div className="col-12">
            <div className="alert alert-info mb-0 d-flex align-items-center flex-wrap gap-2" role="alert">
              <i className="fi fi-rr-info flex-shrink-0" style={{ fontSize: "1.25rem" }} />
              <div className="flex-grow-1">
                You have reached your car listing limit ({(vendor.listing_limit ?? 10)}). Contact admin to increase it.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Vendor Info + Quick Actions */}
      <div className="row">
        <div className="col-xl-12">
          <div className="card shadow-none flex-fill">
            <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
              <span className="neutral-1000 text-md-bold fs-5 py-1 mb-0">
                Dashboard
              </span>
              <div className="d-flex flex-wrap gap-2">
                {showAddCar && (
                  <Link href="/user/add-listing" className="btn btn-primary btn-sm">
                    <i className="fi fi-rr-plus me-1" />
                    Add New Car
                  </Link>
                )}
                <Link href="/user/settings" className="btn btn-sort bg-neutral-100 btn-sm text-gray-6 rounded-pill fw-normal fs-8 d-inline-flex align-items-center">
                  <i className="fi fi-rr-user me-1" />
                  Edit Profile
                </Link>
                {canAddOrViewListings && (
                  <Link href="/user/listings" className="btn btn-sort bg-neutral-100 btn-sm text-gray-6 rounded-pill fw-normal fs-8 d-inline-flex align-items-center">
                    <i className="fi fi-rr-list me-1" />
                    View All Cars
                  </Link>
                )}
              </div>
            </div>
            <div className="card-body">
              <div className="d-flex flex-wrap align-items-start gap-4">
                <VendorAvatar
                  companyName={vendor.company_name}
                  avatarUrl={vendor.avatar_url}
                />
                <div className="flex-grow-1">
                  <h5 className="neutral-1000 text-md-bold mb-1">
                    {vendor.company_name ?? "My Company"}
                  </h5>
                  <span
                    className={`badge rounded-pill d-inline-flex align-items-center fs-10 ${
                      vendor.is_blocked
                        ? "bg-danger"
                        : vendor.is_approved
                          ? "badge-success"
                          : "badge-warning"
                    }`}
                  >
                    <i className="fi fi-rr-caret-right me-1" />
                    {vendor.is_blocked ? "Blocked" : vendor.is_approved ? "Approved" : "Pending approval"}
                  </span>
                  <div className="mt-3 d-flex flex-wrap gap-4 text-sm-medium">
                    <div className="d-flex align-items-center gap-2">
                      <i className="fi fi-rr-user text-neutral-500" />
                      <span className="neutral-500">Owner:</span>
                      <span className="neutral-1000">{vendor.owner_name ?? "—"}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <i className="fi fi-rr-envelope text-neutral-500" />
                      <span className="neutral-500">Email:</span>
                      <a href={`mailto:${vendor.email ?? ""}`} className="neutral-1000 text-decoration-none">
                        {vendor.email ?? "—"}
                      </a>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <i className="fi fi-rr-phone-call text-neutral-500" />
                      <span className="neutral-500">Contact:</span>
                      <span className="neutral-1000">{vendor.contact_number ?? "—"}</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <i className="fi fi-rr-globe text-neutral-500" />
                      <span className="neutral-500">Website:</span>
                      {vendor.website_url ? (
                        <a href={vendor.website_url.startsWith("http") ? vendor.website_url : `https://${vendor.website_url}`} target="_blank" rel="noopener noreferrer" className="neutral-1000 text-decoration-none">
                          {vendor.website_url}
                        </a>
                      ) : (
                        <span className="neutral-1000">—</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards - clean stacked design with soft colors */}
      <div className="row g-3 mt-2">
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 rounded-3 shadow-sm h-100 overflow-hidden" style={{ borderLeft: "4px solid var(--bs-primary, #0d6efd)" }}>
            <div className="card-body py-4">
              <div className="d-flex flex-column">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: 48, height: 48, backgroundColor: "rgba(13, 110, 253, 0.12)" }}
                >
                  <i className="fi fi-rr-car text-primary" style={{ fontSize: "1.35rem" }} />
                </div>
                <span className="text-body-secondary small mb-1">Total Cars</span>
                <span className="fw-bold fs-4 text-dark lh-1">{stats.totalCars}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 rounded-3 shadow-sm h-100 overflow-hidden" style={{ borderLeft: "4px solid var(--bs-success, #198754)" }}>
            <div className="card-body py-4">
              <div className="d-flex flex-column">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: 48, height: 48, backgroundColor: "rgba(25, 135, 84, 0.12)" }}
                >
                  <i className="fi fi-rr-check text-success" style={{ fontSize: "1.35rem" }} />
                </div>
                <span className="text-body-secondary small mb-1">Active Cars</span>
                <span className="fw-bold fs-4 text-dark lh-1">{stats.activeCars}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 rounded-3 shadow-sm h-100 overflow-hidden" style={{ borderLeft: "4px solid var(--bs-secondary, #6c757d)" }}>
            <div className="card-body py-4">
              <div className="d-flex flex-column">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: 48, height: 48, backgroundColor: "rgba(108, 117, 125, 0.12)" }}
                >
                  <i className="fi fi-rr-pause text-secondary" style={{ fontSize: "1.35rem" }} />
                </div>
                <span className="text-body-secondary small mb-1">Inactive Cars</span>
                <span className="fw-bold fs-4 text-dark lh-1">{stats.inactiveCars}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-3 col-md-6">
          <div className="card border-0 rounded-3 shadow-sm h-100 overflow-hidden" style={{ borderLeft: "4px solid var(--bs-info, #0dcaf0)" }}>
            <div className="card-body py-4">
              <div className="d-flex flex-column">
                <div
                  className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: 48, height: 48, backgroundColor: "rgba(13, 202, 240, 0.12)" }}
                >
                  <i className="fi fi-rr-gallery text-info" style={{ fontSize: "1.35rem" }} />
                </div>
                <span className="text-body-secondary small mb-1">Total Car Images</span>
                <span className="fw-bold fs-4 text-dark lh-1">{stats.totalCarImages}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* My Cars - all cars on dashboard; Edit goes to edit-listing */}
      <div className="row mt-4">
        <div className="col-xl-12 d-flex">
          <div className="card shadow-none flex-fill">
            <div className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
              <span className="neutral-1000 text-md-bold fs-5 py-1 mb-0">
                My Cars
              </span>
              {showAddCar && (
                <Link href="/user/add-listing" className="btn btn-primary btn-sm">
                  <i className="fi fi-rr-plus me-1" />
                  Add Car
                </Link>
              )}
            </div>
            <div className="card-body">
              {!canAddOrViewListings ? (
                <div className="text-center py-5">
                  <p className="text-md-medium neutral-500 mb-0">
                    Complete your profile and wait for admin approval to add and view car listings.
                  </p>
                  <Link href="/user/settings" className="btn btn-primary mt-3">
                    Edit Profile
                  </Link>
                </div>
              ) : latestCars.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-md-medium neutral-500 mb-0">
                    No cars yet.
                  </p>
                  {showAddCar && (
                    <Link href="/user/add-listing" className="btn btn-primary mt-3">
                      Add your first car
                    </Link>
                  )}
                </div>
              ) : (
                <div className="box-grid-tours">
                  <div className="row">
                    {latestCars.map((car) => (
                      <div key={car.id} className="col-lg-4 col-md-6">
                        <div className="card-journey-small background-card hover-up">
                          <div className="card-image position-relative">
                            <Link href={`/cars/${car.slug}`}>
                              {car.primary_image_url ? (
                                <img
                                  src={car.primary_image_url}
                                  alt={car.title}
                                  className="img-fluid w-100"
                                />
                              ) : (
                                <div
                                  className="d-flex align-items-center justify-content-center bg-neutral-100 text-neutral-500"
                                  style={{ minHeight: 200 }}
                                >
                                  <i className="fi fi-rr-picture fs-1" />
                                </div>
                              )}
                            </Link>
                            <span
                              className={`position-absolute top-0 end-0 m-2 badge rounded-pill d-inline-flex align-items-center fs-10 ${
                                car.is_active ? "badge-success" : "bg-secondary"
                              }`}
                            >
                              {car.is_active ? "Active" : "Inactive"}
                            </span>
                            {car.is_approved && (
                              <span className="position-absolute top-0 start-0 m-2 badge rounded-pill bg-success d-inline-flex align-items-center fs-10">
                                Listed
                              </span>
                            )}
                          </div>
                          <div className="card-info p-4 pt-30">
                            <div className="card-title">
                              <Link
                                className="text-lg-bold neutral-1000 text-nowrap"
                                href={`/cars/${car.slug}`}
                              >
                                {car.title}
                              </Link>
                            </div>
                            <div className="card-program">
                              <div className="endtime d-flex align-items-center justify-content-between flex-wrap gap-2">
                                <div className="card-price d-flex align-items-baseline">
                                  <h6 className="text-lg-bold neutral-1000 mb-0">
                                    AED {car.price_per_day.toLocaleString()}
                                  </h6>
                                  <p className="text-md-medium neutral-500 mb-0 ms-1">
                                    / day
                                  </p>
                                </div>
                                <Link
                                  href={`/user/edit-listing/${car.slug}`}
                                  className="btn btn-primary btn-sm"
                                >
                                  Edit
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
