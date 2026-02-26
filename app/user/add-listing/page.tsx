"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CAR_TYPES = [
  "SUV",
  "Sedan",
  "Coupe",
  "Hatchback",
  "Convertible",
  "Sport",
] as const;

/** Static list so we always show all features (merge with API for ids). */
const DEFAULT_FEATURE_NAMES = [
  "A/C: Front",
  "Backup Camera",
  "Cruise Control",
  "Audio system",
  "Touchscreen display",
  "GPS navigation",
  "Phone connectivity",
  "Breakfast",
  "In-car Wi-Fi",
  "Anti-lock brake system (ABS)",
  "Brake assist (BA)",
  "Airbags",
];

type ImageItem = { id?: string; url: string; file?: File };

type Feature = { id: string; name: string };

const initialForm = {
  title: "",
  brand: "",
  model: "",
  year: "",
  car_type: "",
  doors: "",
  color: "",
  luggage_capacity: "",
  fuel_type: "",
  transmission: "",
  seats: "",
  price_per_day: "",
  description: "",
  country: "",
  city: "",
};

export default function AddListingPage() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [featureIds, setFeatureIds] = useState<string[]>([]);
  const [selectedFeatureNames, setSelectedFeatureNames] = useState<string[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [primaryImage, setPrimaryImage] = useState<ImageItem | null>(null);
  const [additionalImages, setAdditionalImages] = useState<ImageItem[]>([]);
  const [imageTab, setImageTab] = useState<"primary" | "additional">("primary");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingFeatures, setLoadingFeatures] = useState(true);
  const [profileBlocked, setProfileBlocked] = useState<boolean | null>(null);
  const [atCarLimit, setAtCarLimit] = useState<boolean | null>(null);
  const [carLimitInfo, setCarLimitInfo] = useState<{ limit: number; current: number } | null>(null);

  useEffect(() => {
    fetch("/api/vendor/profile", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        const v = data.vendor;
        if (v && (!v.is_approved || v.is_blocked)) {
          setProfileBlocked(true);
          return;
        }
        if (v && data.can_add_car === false) {
          setAtCarLimit(true);
          setCarLimitInfo({
            limit: typeof data.listing_limit === "number" ? data.listing_limit : 10,
            current: typeof data.active_car_count === "number" ? data.active_car_count : 0,
          });
          return;
        }
        setProfileBlocked(false);
      })
      .catch(() => setProfileBlocked(false));
  }, []);

  useEffect(() => {
    if (profileBlocked === true) {
      router.replace("/user");
      return;
    }
  }, [profileBlocked, router]);

  useEffect(() => {
    fetch("/api/features")
      .then((res) => res.json())
      .then((data) => {
        const apiFeatures = data.features ?? [];
        // Always show all 12: merge API (for ids) with DEFAULT_FEATURE_NAMES so every feature is visible
        const merged = DEFAULT_FEATURE_NAMES.map((name) => {
          const fromApi = apiFeatures.find((f: Feature) => f.name === name);
          return fromApi ? { id: fromApi.id, name: fromApi.name } : { id: "", name };
        });
        setFeatures(merged);
      })
      .catch(() => {
        setFeatures(DEFAULT_FEATURE_NAMES.map((name) => ({ id: "", name })));
      })
      .finally(() => setLoadingFeatures(false));
  }, []);

  const update = useCallback(
    (field: string, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }));
      setError(null);
    },
    []
  );

  const onPrimaryFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    if (primaryImage?.url && !primaryImage.file) URL.revokeObjectURL(primaryImage.url);
    setPrimaryImage({ url: URL.createObjectURL(file), file });
    e.target.value = "";
  }, [primaryImage]);

  const removePrimaryImage = useCallback(async () => {
    if (!primaryImage) return;
    if (primaryImage.id) {
      try {
        await fetch(`/api/car-image/${primaryImage.id}`, { method: "DELETE" });
      } catch {}
    }
    if (primaryImage.url && !primaryImage.file) URL.revokeObjectURL(primaryImage.url);
    setPrimaryImage(null);
  }, [primaryImage]);

  const onAdditionalFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    const newItems: ImageItem[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) continue;
      newItems.push({ url: URL.createObjectURL(file), file });
    }
    setAdditionalImages((prev) => [...prev, ...newItems]);
    e.target.value = "";
  }, []);

  const removeAdditionalImage = useCallback(async (index: number) => {
    const item = additionalImages[index];
    if (item.id) {
      try {
        await fetch(`/api/car-image/${item.id}`, { method: "DELETE" });
      } catch {}
    }
    if (item.url && !item.file) URL.revokeObjectURL(item.url);
    setAdditionalImages((prev) => prev.filter((_, i) => i !== index));
  }, [additionalImages]);

  const toggleFeature = useCallback((name: string) => {
    setSelectedFeatureNames((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      if (!form.title?.trim()) {
        setError("Car name is required.");
        return;
      }
      if (!form.brand?.trim()) {
        setError("Brand is required.");
        return;
      }
      if (!form.model?.trim()) {
        setError("Model is required.");
        return;
      }
      const year = parseInt(form.year, 10);
      if (!form.year || isNaN(year) || year < 1900 || year > 2100) {
        setError("Please enter a valid year (1900-2100).");
        return;
      }
      const price = parseFloat(form.price_per_day);
      if (!form.price_per_day || isNaN(price) || price < 0) {
        setError("Price per day is required and must be 0 or greater.");
        return;
      }
      if (!form.car_type?.trim()) {
        setError("Type is required.");
        return;
      }
      const doors = form.doors ? parseInt(form.doors, 10) : NaN;
      if (!form.doors || isNaN(doors) || doors < 1) {
        setError("Doors is required (at least 1).");
        return;
      }
      if (!form.transmission?.trim()) {
        setError("Gear box (transmission) is required.");
        return;
      }
      const seats = form.seats ? parseInt(form.seats, 10) : NaN;
      if (!form.seats || isNaN(seats) || seats < 1) {
        setError("Seating capacity is required (at least 1).");
        return;
      }
      if (!form.fuel_type?.trim()) {
        setError("Fuel type is required.");
        return;
      }
      const luggage = form.luggage_capacity ? parseInt(form.luggage_capacity, 10) : NaN;
      if (!form.luggage_capacity || isNaN(luggage) || luggage < 0) {
        setError("Number of bags is required (0 or greater).");
        return;
      }
      if (!form.color?.trim()) {
        setError("Color is required.");
        return;
      }
      if (!form.country?.trim()) {
        setError("Country is required.");
        return;
      }
      if (!form.city?.trim()) {
        setError("City is required.");
        return;
      }
      if (!primaryImage?.file && !primaryImage?.id) {
        setError("Please add a primary image.");
        return;
      }

      setLoading(true);
      try {
        const fd = new FormData();
        fd.set("title", form.title.trim());
        fd.set("brand", form.brand.trim());
        fd.set("model", form.model.trim());
        fd.set("year", String(year));
        fd.set("price_per_day", String(price));
        fd.set("car_type", form.car_type.trim());
        fd.set("doors", form.doors);
        fd.set("transmission", form.transmission.trim());
        fd.set("seats", form.seats);
        fd.set("fuel_type", form.fuel_type.trim());
        fd.set("luggage_capacity", form.luggage_capacity);
        fd.set("color", form.color.trim());
        fd.set("country", form.country.trim());
        fd.set("city", form.city.trim());
        if (form.description) fd.set("description", form.description);
        fd.set("feature_ids", JSON.stringify(featureIds.filter(Boolean)));
        fd.set("feature_names", JSON.stringify(selectedFeatureNames));
        if (primaryImage?.file) fd.append("images", primaryImage.file);
        additionalImages.forEach((item) => item.file && fd.append("images", item.file));

        const res = await fetch("/api/cars", { method: "POST", body: fd });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          setError(data.error || "Failed to create listing.");
          return;
        }
        const message = data.message || "Car listing created successfully.";
        router.push(`/user/listings?success=${encodeURIComponent(message)}`);
      } catch {
        setError("Something went wrong. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [form, featureIds, primaryImage, additionalImages, router, selectedFeatureNames]
  );

  if (profileBlocked !== false || atCarLimit === true) {
    return (
      <div className="row">
        <div className="col-12">
          <div className="card shadow-none">
            <div className="card-body text-center py-5">
              {atCarLimit === true ? (
                <>
                  <p className="text-body-secondary mb-2">
                    You have reached your car listing limit
                    {carLimitInfo && (
                      <span className="d-block mt-1">
                        ({carLimitInfo.current} of {carLimitInfo.limit} cars). Contact admin to increase your limit.
                      </span>
                    )}
                  </p>
                  <Link href="/user" className="btn btn-primary">
                    Back to Dashboard
                  </Link>
                </>
              ) : (
                <p className="text-body-secondary mb-0">
                  {profileBlocked === true ? "Redirecting…" : "Checking access…"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row mb-3">
        <div className="col-xl-12 d-flex">
          <div className="card shadow-none flex-fill">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <span className="neutral-1000 text-md-bold fs-5">Add Car details</span>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="row">
                  <div className="col-lg-12 mb-3">
                    <ul className="nav nav-tabs mb-3" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          type="button"
                          className={`nav-link ${imageTab === "primary" ? "active" : ""}`}
                          onClick={() => setImageTab("primary")}
                          role="tab"
                          aria-selected={imageTab === "primary"}
                        >
                          Primary image
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          type="button"
                          className={`nav-link ${imageTab === "additional" ? "active" : ""}`}
                          onClick={() => setImageTab("additional")}
                          role="tab"
                          aria-selected={imageTab === "additional"}
                        >
                          More images
                        </button>
                      </li>
                    </ul>
                    <div className="list-image-upload">
                      {imageTab === "primary" && (
                        <>
                          <div className="box-upload-image">
                            <label htmlFor="add-listing-primary-image" className="item-upload-image d-block text-decoration-none text-body">
                              <input
                                id="add-listing-primary-image"
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                onChange={onPrimaryFileChange}
                              />
                              <div className="upload-info">
                                <div className="icon-upload">
                                  <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 10.25C6.48 10.25 5.25 9.02 5.25 7.5C5.25 5.98 6.48 4.75 8 4.75C9.52 4.75 10.75 5.98 10.75 7.5C10.75 9.02 9.52 10.25 8 10.25ZM8 6.25C7.31 6.25 6.75 6.81 6.75 7.5C6.75 8.19 7.31 8.75 8 8.75C8.69 8.75 9.25 8.19 9.25 7.5C9.25 6.81 8.69 6.25 8 6.25Z" fill="" />
                                    <path d="M14 22.25H8C2.57 22.25 0.25 19.93 0.25 14.5V8.5C0.25 3.07 2.57 0.75 8 0.75H12C12.41 0.75 12.75 1.09 12.75 1.5C12.75 1.91 12.41 2.25 12 2.25H8C3.39 2.25 1.75 3.89 1.75 8.5V14.5C1.75 19.11 3.39 20.75 8 20.75H14C18.61 20.75 20.25 19.11 20.25 14.5V9.5C20.25 9.09 20.59 8.75 21 8.75C21.41 8.75 21.75 9.09 21.75 9.5V14.5C21.75 19.93 19.43 22.25 14 22.25Z" fill="" />
                                    <path d="M17 8.24994C16.59 8.24994 16.25 7.90994 16.25 7.49994V1.49994C16.25 1.19994 16.43 0.919939 16.71 0.809939C16.99 0.699939 17.31 0.759939 17.53 0.969939L19.53 2.96994C19.82 3.25994 19.82 3.73994 19.53 4.02994C19.24 4.31994 18.76 4.31994 18.47 4.02994L17.75 3.30994V7.49994C17.75 7.90994 17.41 8.24994 17 8.24994Z" fill="" />
                                    <path d="M14.9999 4.24994C14.8099 4.24994 14.6199 4.17994 14.4699 4.02994C14.1799 3.73994 14.1799 3.25994 14.4699 2.96994L16.4699 0.969941C16.7599 0.679941 17.2399 0.679941 17.5299 0.969941C17.8199 1.25994 17.8199 1.73994 17.5299 2.02994L15.5299 4.02994C15.3799 4.17994 15.1899 4.24994 14.9999 4.24994Z" fill="" />
                                    <path d="M1.6698 19.2001C1.4298 19.2001 1.1898 19.0801 1.0498 18.8701C0.819805 18.5301 0.909805 18.0601 1.2498 17.8301L6.1798 14.5201C7.2598 13.8001 8.7498 13.8801 9.7298 14.7101L10.0598 15.0001C10.5598 15.4301 11.4098 15.4301 11.8998 15.0001L16.0598 11.4301C17.1198 10.5201 18.7898 10.5201 19.8598 11.4301L21.4898 12.8301C21.7998 13.1001 21.8398 13.5701 21.5698 13.8901C21.2998 14.2001 20.8198 14.2401 20.5098 13.9701L18.8798 12.5701C18.3798 12.1401 17.5398 12.1401 17.0398 12.5701L12.8798 16.1401C11.8198 17.0501 10.1498 17.0501 9.0798 16.1401L8.7498 15.8501C8.2898 15.4601 7.52981 15.4201 7.01981 15.7701L2.0998 19.0801C1.9598 19.1601 1.8098 19.2001 1.6698 19.2001Z" fill="" />
                                  </svg>
                                </div>
                                <div className="text-upload">
                                  <p className="text-sm-medium neutral-500 mb-0">Primary image (PNG, JPEG, WebP, max 5MB) — shown as main photo</p>
                                </div>
                              </div>
                            </label>
                          </div>
                          <div className="preview-images">
                            <div className="list-preview">
                              {primaryImage && (
                                <div className="image-preview">
                                  <div className="box-image-preview">
                                    <img src={primaryImage.url} alt="Primary" />
                                    <span className="badge bg-primary position-absolute top-0 start-0 m-2">Primary</span>
                                    <button
                                      type="button"
                                      className="btn-delete-image"
                                      aria-label="Remove primary image"
                                      onClick={removePrimaryImage}
                                    >
                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.3335 7.33333V11.3333" stroke="" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.6665 7.33333V11.3333" stroke="" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4 4.66667V12.6667C4 13.403 4.59695 14 5.33333 14H10.6667C11.403 14 12 13.403 12 12.6667V4.66667" stroke="" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2.6665 4.66667H13.3332" stroke="" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4.6665 4.66667L5.99984 2H9.99984L11.3332 4.66667" stroke="" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                      {imageTab === "additional" && (
                        <>
                          <div className="box-upload-image">
                            <label htmlFor="add-listing-additional-images" className="item-upload-image d-block text-decoration-none text-body">
                              <input
                                id="add-listing-additional-images"
                                type="file"
                                accept="image/png,image/jpeg,image/webp"
                                multiple
                                onChange={onAdditionalFileChange}
                              />
                              <div className="upload-info">
                                <div className="icon-upload">
                                  <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 10.25C6.48 10.25 5.25 9.02 5.25 7.5C5.25 5.98 6.48 4.75 8 4.75C9.52 4.75 10.75 5.98 10.75 7.5C10.75 9.02 9.52 10.25 8 10.25ZM8 6.25C7.31 6.25 6.75 6.81 6.75 7.5C6.75 8.19 7.31 8.75 8 8.75C8.69 8.75 9.25 8.19 9.25 7.5C9.25 6.81 8.69 6.25 8 6.25Z" fill="" />
                                    <path d="M14 22.25H8C2.57 22.25 0.25 19.93 0.25 14.5V8.5C0.25 3.07 2.57 0.75 8 0.75H12C12.41 0.75 12.75 1.09 12.75 1.5C12.75 1.91 12.41 2.25 12 2.25H8C3.39 2.25 1.75 3.89 1.75 8.5V14.5C1.75 19.11 3.39 20.75 8 20.75H14C18.61 20.75 20.25 19.11 20.25 14.5V9.5C20.25 9.09 20.59 8.75 21 8.75C21.41 8.75 21.75 9.09 21.75 9.5V14.5C21.75 19.93 19.43 22.25 14 22.25Z" fill="" />
                                    <path d="M17 8.24994C16.59 8.24994 16.25 7.90994 16.25 7.49994V1.49994C16.25 1.19994 16.43 0.919939 16.71 0.809939C16.99 0.699939 17.31 0.759939 17.53 0.969939L19.53 2.96994C19.82 3.25994 19.82 3.73994 19.53 4.02994C19.24 4.31994 18.76 4.31994 18.47 4.02994L17.75 3.30994V7.49994C17.75 7.90994 17.41 8.24994 17 8.24994Z" fill="" />
                                    <path d="M14.9999 4.24994C14.8099 4.24994 14.6199 4.17994 14.4699 4.02994C14.1799 3.73994 14.1799 3.25994 14.4699 2.96994L16.4699 0.969941C16.7599 0.679941 17.2399 0.679941 17.5299 0.969941C17.8199 1.25994 17.8199 1.73994 17.5299 2.02994L15.5299 4.02994C15.3799 4.17994 15.1899 4.24994 14.9999 4.24994Z" fill="" />
                                    <path d="M1.6698 19.2001C1.4298 19.2001 1.1898 19.0801 1.0498 18.8701C0.819805 18.5301 0.909805 18.0601 1.2498 17.8301L6.1798 14.5201C7.2598 13.8001 8.7498 13.8801 9.7298 14.7101L10.0598 15.0001C10.5598 15.4301 11.4098 15.4301 11.8998 15.0001L16.0598 11.4301C17.1198 10.5201 18.7898 10.5201 19.8598 11.4301L21.4898 12.8301C21.7998 13.1001 21.8398 13.5701 21.5698 13.8901C21.2998 14.2001 20.8198 14.2401 20.5098 13.9701L18.8798 12.5701C18.3798 12.1401 17.5398 12.1401 17.0398 12.5701L12.8798 16.1401C11.8198 17.0501 10.1498 17.0501 9.0798 16.1401L8.7498 15.8501C8.2898 15.4601 7.52981 15.4201 7.01981 15.7701L2.0998 19.0801C1.9598 19.1601 1.8098 19.2001 1.6698 19.2001Z" fill="" />
                                  </svg>
                                </div>
                                <div className="text-upload">
                                  <p className="text-sm-medium neutral-500 mb-0">Add more images (optional)</p>
                                </div>
                              </div>
                            </label>
                          </div>
                          <div className="preview-images">
                            <div className="list-preview">
                              {additionalImages.map((item, index) => (
                                <div key={index} className="image-preview">
                                  <div className="box-image-preview">
                                    <img src={item.url} alt="Car" />
                                    <button
                                      type="button"
                                      className="btn-delete-image"
                                      aria-label="Remove image"
                                      onClick={() => removeAdditionalImage(index)}
                                    >
                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.3335 7.33333V11.3333" stroke="" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M6.6665 7.33333V11.3333" stroke="" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4 4.66667V12.6667C4 13.403 4.59695 14 5.33333 14H10.6667C11.403 14 12 13.403 12 12.6667V4.66667" stroke="" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M2.6665 4.66667H13.3332" stroke="" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M4.6665 4.66667L5.99984 2H9.99984L11.3332 4.66667" stroke="" strokeLinecap="round" strokeLinejoin="round" />
                                      </svg>
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Car Name*"
                        value={form.title}
                        onChange={(e) => update("title", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Price / Day*"
                        value={form.price_per_day}
                        onChange={(e) => update("price_per_day", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Model *"
                        value={form.model}
                        onChange={(e) => update("model", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <select
                        className="form-select form-control"
                        value={form.car_type}
                        onChange={(e) => update("car_type", e.target.value)}
                      >
                        <option value="">Type *</option>
                        {CAR_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="number"
                        min="1"
                        placeholder="Doors *"
                        value={form.doors}
                        onChange={(e) => update("doors", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Brand *"
                        value={form.brand}
                        onChange={(e) => update("brand", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Gear Box * e.g Auto"
                        value={form.transmission}
                        onChange={(e) => update("transmission", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="number"
                        min="1"
                        placeholder="Seating Capacity *"
                        value={form.seats}
                        onChange={(e) => update("seats", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Fuel Type *"
                        value={form.fuel_type}
                        onChange={(e) => update("fuel_type", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="number"
                        min="0"
                        placeholder="Number of Bags *"
                        value={form.luggage_capacity}
                        onChange={(e) => update("luggage_capacity", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Color *"
                        value={form.color}
                        onChange={(e) => update("color", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="number"
                        min="1900"
                        max="2100"
                        placeholder="Year *"
                        value={form.year}
                        onChange={(e) => update("year", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Country *"
                        value={form.country}
                        onChange={(e) => update("country", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="City *"
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        placeholder="Description"
                        rows={6}
                        value={form.description}
                        onChange={(e) => update("description", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 mb-3">
                    <h6>Features</h6>
                  </div>
                  {loadingFeatures ? (
                    <div className="col-lg-12">Loading features…</div>
                  ) : (
                    features.map((f, idx) => (
                      <div key={f.id || `f-${idx}`} className="col-lg-6 col-md-6 col-12 mb-2">
                        <label className="lbl-checkbox text-md-medium neutral-500 d-block">
                          <input
                            type="checkbox"
                            checked={selectedFeatureNames.includes(f.name)}
                            onChange={() => toggleFeature(f.name)}
                          />{" "}
                          {f.name}
                        </label>
                      </div>
                    ))
                  )}
                </div>
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <div className="box-button-save mt-15">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Saving…" : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
