"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Car = {
  id: string;
  title: string;
  slug: string;
  brand: string | null;
  car_type: string | null;
  doors: number | null;
  transmission: string | null;
  fuel_type: string | null;
  seats: number | null;
  price_per_day: number;
  city: string | null;
  country: string | null;
  created_at: string | null;
  primary_image_url: string | null;
};

const CAR_TYPE_OPTIONS = [
  { value: "", label: "Car type" },
  { value: "suv", label: "SUV" },
  { value: "sedan", label: "Sedan" },
  { value: "sport", label: "Sport" },
  { value: "convertible", label: "Convertible" },
  { value: "coupe", label: "Coupe" },
  { value: "hatchback", label: "Hatchback" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "price", label: "Price" },
  { value: "name", label: "Name" },
  { value: "reviews", label: "Reviews" },
];

/** Deterministic placeholder rating (4.0–5.0) and review count from car id. */
function getPlaceholderRatingAndReviews(carId: string): { rating: number; reviews: number } {
  let h = 0;
  for (let i = 0; i < carId.length; i++) {
    h = (h * 31 + carId.charCodeAt(i)) >>> 0;
  }
  const rating = 4 + (h % 11) / 10;
  const reviews = 100 + (h % 701);
  return { rating: Math.min(5, Math.round(rating * 100) / 100), reviews };
}

export default function UserListingsPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [profileApproved, setProfileApproved] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [carTypeFilter, setCarTypeFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filteredAndSortedCars = (() => {
    let list = [...cars];

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (car) =>
          car.title.toLowerCase().includes(q) ||
          (car.brand && car.brand.toLowerCase().includes(q))
      );
    }

    if (carTypeFilter) {
      const typeLower = carTypeFilter.toLowerCase();
      list = list.filter(
        (car) => car.car_type && car.car_type.toLowerCase() === typeLower
      );
    }

    switch (sortBy) {
      case "oldest":
        list.sort(
          (a, b) =>
            new Date(a.created_at || 0).getTime() -
            new Date(b.created_at || 0).getTime()
        );
        break;
      case "price":
        list.sort((a, b) => a.price_per_day - b.price_per_day);
        break;
      case "name":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "reviews":
        list.sort(
          (a, b) =>
            getPlaceholderRatingAndReviews(b.id).reviews -
            getPlaceholderRatingAndReviews(a.id).reviews
        );
        break;
      default:
        list.sort(
          (a, b) =>
            new Date(b.created_at || 0).getTime() -
            new Date(a.created_at || 0).getTime()
        );
    }

    return list;
  })();

  useEffect(() => {
    async function fetchCars() {
      try {
        const res = await fetch("/api/user/cars", { credentials: "include", cache: "no-store" });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(data.error || "Failed to load listings.");
          setCars([]);
          setProfileApproved(false);
          return;
        }
        setCars(Array.isArray(data.cars) ? data.cars : []);
        setProfileApproved(data.profileApproved === true);
      } catch {
        setError("Failed to load listings.");
        setCars([]);
        setProfileApproved(false);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  return (
    <>
      <div className="alert alert-info alert-dismissible d-flex align-items-center border-0 mb-4 fade show">
        <i className="fi fi-rr-info me-2 mt-1" />
        <p className="mb-0">Join the year-end sale to boost your sales now</p>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        />
      </div>

      {!loading && profileApproved === false && (
        <div className="row mb-4">
          <div className="col-12">
            <div className="alert alert-warning mb-0 d-flex align-items-center" role="alert">
              <i className="fi fi-rr-info me-2" style={{ fontSize: "1.25rem" }} />
              <div className="flex-grow-1">
                <strong>Profile pending approval.</strong> You cannot view your car listings until an admin approves your profile. Complete your profile in settings and wait for approval.
              </div>
              <Link href="/user/settings" className="btn btn-sm btn-warning ms-2">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="row">
        <div className="col-xl-12 d-flex">
          <div className="card shadow-none flex-fill">
            <div className="card-header card-header-listings">
              <div className="card-header-listings-inner">
                <span className="neutral-1000 text-md-bold fs-5">My Listings</span>
                <div className="card-header-listings-filters">
                  <div className="listings-search-wrap">
                    <span className="listings-search-icon" aria-hidden>
                      <i className="fi fi-rr-search" />
                    </span>
                    <input
                      type="search"
                      className="form-control listings-search-input"
                      placeholder="Search"
                      aria-label="Search listings"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="listings-select-wrap">
                    <select
                      className="form-control listings-select"
                      aria-label="Car type"
                      value={carTypeFilter}
                      onChange={(e) => setCarTypeFilter(e.target.value)}
                    >
                      {CAR_TYPE_OPTIONS.map((opt) => (
                        <option key={opt.value || "any"} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="listings-select-wrap">
                    <select
                      className="form-control listings-select"
                      aria-label="Sort"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      {SORT_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              {loading ? (
                <div className="text-center py-5 text-secondary">
                  Loading listings…
                </div>
              ) : cars.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-md-medium neutral-500 mb-0">No cars listed yet.</p>
                  <Link href="/user/add-listing" className="btn btn-primary mt-3">
                    Add your first listing
                  </Link>
                </div>
              ) : filteredAndSortedCars.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-md-medium neutral-500 mb-0">No cars match your filters.</p>
                </div>
              ) : (
                <div className="box-grid-tours">
                  <div className="row">
                    {filteredAndSortedCars.map((car) => (
                      <div key={car.id} className="col-lg-4 col-md-6">
                        <div className="card-journey-small background-card hover-up">
                          <div className="card-image">
                            <Link href={`/cars/${car.slug}`}>
                              <img
                                src={
                                  car.primary_image_url ||
                                  "/assets/imgs/cars-listing/cars-listing-6/car-1.png"
                                }
                                alt={car.title}
                              />
                            </Link>
                          </div>
                            <div className="card-info p-4 pt-30">
                            <div className="card-rating">
                              <div className="card-left" />
                              <div className="card-right">
                                <span className="rating text-xs-medium rounded-pill">
                                  {(() => {
                                    const { rating, reviews } = getPlaceholderRatingAndReviews(car.id);
                                    return (
                                      <>
                                        {rating.toFixed(2)}{" "}
                                        <span className="text-xs-medium neutral-500">({reviews} reviews)</span>
                                      </>
                                    );
                                  })()}
                                </span>
                              </div>
                            </div>
                            <div className="card-title">
                              <Link
                                className="text-lg-bold neutral-1000 text-nowrap"
                                href={`/cars/${car.slug}`}
                              >
                                {car.title}
                              </Link>
                            </div>
                            <div className="card-program">
                              <div className="card-location">
                                <p className="text-location text-sm-medium neutral-500">
                                  {[car.city, car.country].filter(Boolean).join(" - ") || "—"}
                                </p>
                              </div>
                              <div className="card-facitlities">
                                {car.doors != null && (
                                  <p className="card-miles text-md-medium">{car.doors} doors</p>
                                )}
                                <p className="card-gear text-md-medium">
                                  {car.transmission || "—"}
                                </p>
                                <p className="card-fuel text-md-medium">
                                  {car.fuel_type || "—"}
                                </p>
                                <p className="card-seat text-md-medium">
                                  {car.seats != null ? `${car.seats} seats` : "—"}
                                </p>
                              </div>
                              <div className="endtime">
                                <div className="card-price">
                                  <h6 className="text-lg-bold neutral-1000">
                                    AED {car.price_per_day.toLocaleString()}
                                  </h6>
                                  <p className="text-md-medium neutral-500">/ day</p>
                                </div>
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
