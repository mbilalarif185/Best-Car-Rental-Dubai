"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getProfileCompletionPercent } from "@/lib/profileCompletion";

type VendorProfile = {
  id: string;
  user_id: string;
  avatar_url: string | null;
  company_logo_url: string | null;
  company_name: string | null;
  business_email: string | null;
  contact_number: string | null;
  website_url: string | null;
  bio: string | null;
  country: string | null;
  city: string | null;
  address: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  youtube_url: string | null;
  is_approved: boolean;
  is_blocked: boolean;
  created_at: string;
  updated_at: string;
};

function orEmpty(s: string | null | undefined): string {
  return s ?? "";
}

function imageSrc(url: string | null | undefined): string {
  if (!url) return "";
  return url.startsWith("/") ? url : `/${url}`;
}

export default function UserProfilePage() {
  const [vendor, setVendor] = useState<VendorProfile | null | undefined>(undefined);
  const [fullName, setFullName] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/vendor/profile", { credentials: "include" });
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        setVendor(res.ok ? (data.vendor ?? null) : null);
        setFullName(typeof data.full_name === "string" ? data.full_name : "");
      } catch {
        if (!cancelled) {
          setVendor(null);
          setFullName("");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <div className="row">
        <div className="col-xl-12">
          <div className="card shadow-none flex-fill">
            <div className="card-body text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading</span>
              </div>
              <p className="text-muted mt-2 mb-0">Loading profile…</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const hasProfile = vendor != null;
  const v = vendor;
  const completionPercent = getProfileCompletionPercent({ full_name: fullName, vendor: v ?? undefined });
  const isCompleteEnough = completionPercent >= 80;

  const companyLogoSrc = (hasProfile && v?.avatar_url) ? imageSrc(v.avatar_url) : "/assets/imgs/template/best-car-rental-dubai.webp";
  const profilePicSrc = (hasProfile && v?.company_logo_url) ? imageSrc(v.company_logo_url) : "/assets/imgs/hero/hero-1/luxury-convertible.jpg";
  const bannerSrc = profilePicSrc;

  return (
    <>
      <div className="row mb-3">
        <div className="col-xl-12">
          <div className="card shadow-none flex-fill mb-3">
            <div className="bg-overlay overflow-hidden">
              <img className="w-100 h-100 img-banner" src={bannerSrc} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card shadow-none flex-fill mb-3">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap gap-2">
              <p className="neutral-1000 text-md-bold fs-5 py-1 mb-0">Your profile</p>
              {hasProfile && (
                <Link href="/user/settings" className="btn btn-primary btn-sm">Edit in Settings</Link>
              )}
            </div>
            <div className="card-body">
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-sm-medium neutral-700">Profile completion</span>
                  <span className="text-sm-bold neutral-1000">{completionPercent}%</span>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: `${completionPercent}%` }}
                    aria-valuenow={completionPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
                {!isCompleteEnough && (
                  <p className="text-muted small mt-1 mb-0">Complete at least 80% to unlock Add Listing and My Listings.</p>
                )}
              </div>
              {!isCompleteEnough && (
                <div className="alert alert-info mb-4">
                  <p className="neutral-1000 mb-2">Profile not completed yet.</p>
                  <p className="text-muted small mb-0">Complete your vendor profile in settings to display it here and unlock all features.</p>
                  <Link href="/user/settings" className="btn btn-primary btn-sm mt-2">
                    Go to Settings
                  </Link>
                </div>
              )}
              <div className="row pt-4">
                <div className="col-lg-6 mb-3 mb-lg-0">
                  <div className="box-avatar-profile d-flex align-items-center">
                    <div className="image-avatar me-3">
                      <img src={companyLogoSrc} alt="Company logo" />
                    </div>
                    <p className="neutral-1000 text-md-bold fs-5 py-1 mb-0">Company Logo</p>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="box-avatar-profile d-flex align-items-center">
                    <div className="image-avatar-2 w-50 me-3 rounded-2 overflow-hidden">
                      <img src={profilePicSrc} alt="Company profile pic" />
                    </div>
                    <p className="neutral-1000 text-md-bold fs-5 py-1 mb-0">Profile Pic</p>
                  </div>
                  <p className="text-sm-medium neutral-500 mt-2">Recommended dimensions are typically 942 x 300 pixels.</p>
                </div>
              </div>
              <div className="py-5">
                <div className="hr" />
              </div>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">Full Name *</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Sam Haider"
                      value={fullName}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">Email *</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="info@bestcarrentaldubai.ae"
                      value={hasProfile ? orEmpty(v?.business_email) : ""}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">Company Name *</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Best Car Rental Dubai"
                      value={hasProfile ? orEmpty(v?.company_name) : ""}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">Personal website</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="https://bestcarrentaldubai.ae/"
                      value={hasProfile ? orEmpty(v?.website_url) : ""}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">Bio</label>
                    <textarea
                      className="form-control"
                      placeholder="Write Complete Detials about your Company"
                      rows={6}
                      value={hasProfile ? orEmpty(v?.bio) : ""}
                      readOnly
                    />
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          <div className="card shadow-none flex-fill mb-3">
            <div className="card-header">
              <p className="neutral-1000 text-md-bold fs-5 py-1">Contact Information</p>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">Country</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Country"
                      value={hasProfile ? orEmpty(v?.country) : ""}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">City</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="City"
                      value={hasProfile ? orEmpty(v?.city) : ""}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">Complete Address</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Plot 25 street 4 - Al Quoz - Al Quoz Industrial Area 4 - Dubai"
                      value={hasProfile ? orEmpty(v?.address) : ""}
                      readOnly
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label className="text-sm-medium neutral-500 mb-10">Contact Number *</label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="+971545514155"
                      value={hasProfile ? orEmpty(v?.contact_number) : ""}
                      readOnly
                    />
                  </div>
                </div>
                
                
               
                
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card shadow-none flex-fill">
                <div className="card-header">
                  <p className="neutral-1000 text-md-bold fs-5 py-1">Social Network</p>
                </div>
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-lg-12">
                      <label className="lbl-checkbox text-sm-medium neutral-500">Facebook</label>
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="https://www.facebook.com/"
                          value={hasProfile ? orEmpty(v?.facebook_url) : ""}
                          readOnly
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <label className="lbl-checkbox text-sm-medium neutral-500">YouTube</label>
                      <div className="form-group">
                        <input className="form-control" type="text" placeholder="https://youtube.com/"
                        value={hasProfile ? orEmpty(v?.youtube_url) : ""}
                        readOnly />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <label className="lbl-checkbox text-sm-medium neutral-500">Instagram</label>
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="https://www.instagram.com/"
                          value={hasProfile ? orEmpty(v?.instagram_url) : ""}
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
