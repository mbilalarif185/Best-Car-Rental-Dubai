"use client";

import { useEffect, useState, FormEvent, useRef } from "react";

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
};

const emptyForm = {
  full_name: "",
  avatar_url: "",
  company_logo_url: "",
  company_name: "",
  business_email: "",
  contact_number: "",
  website_url: "",
  bio: "",
  country: "",
  city: "",
  address: "",
  facebook_url: "",
  instagram_url: "",
  youtube_url: "",
};

const DEFAULT_AVATAR = "/assets/imgs/template/best-car-rental-dubai.webp";
const DEFAULT_LOGO = "/assets/imgs/hero/hero-1/luxury-convertible.jpg";

function imageSrc(url: string | null | undefined): string {
  if (!url) return "";
  return url.startsWith("/") ? url : `/${url}`;
}

export default function UserSettingsPage() {
  const [form, setForm] = useState(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordMessage, setPasswordMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [changingPassword, setChangingPassword] = useState(false);

  const ACCEPT_IMAGES = "image/png,image/jpeg,image/webp";
  const MAX_SIZE_MB = 5;

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/vendor/profile", { credentials: "include" });
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (!res.ok) {
          setForm(emptyForm);
          return;
        }
        const vendor: VendorProfile | null = data.vendor ?? null;
        const fullName = typeof data.full_name === "string" ? data.full_name : "";
        if (vendor) {
          setForm({
            full_name: fullName,
            avatar_url: vendor.avatar_url ?? "",
            company_logo_url: vendor.company_logo_url ?? "",
            company_name: vendor.company_name ?? "",
            business_email: vendor.business_email ?? "",
            contact_number: vendor.contact_number ?? "",
            website_url: vendor.website_url ?? "",
            bio: vendor.bio ?? "",
            country: vendor.country ?? "",
            city: vendor.city ?? "",
            address: vendor.address ?? "",
            facebook_url: vendor.facebook_url ?? "",
            instagram_url: vendor.instagram_url ?? "",
            youtube_url: vendor.youtube_url ?? "",
          });
        } else {
          setForm({ ...emptyForm, full_name: fullName });
        }
      } catch {
        if (!cancelled) setForm(emptyForm);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    setSaving(true);
    try {
      const res = await fetch("/api/vendor/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setMessage({ type: "error", text: data.error ?? "Failed to save profile" });
        return;
      }
      setMessage({ type: "success", text: "Profile saved successfully." });
      const vendor: VendorProfile | null = data.vendor ?? null;
      if (vendor) {
        const fullName = typeof data.full_name === "string" ? data.full_name : form.full_name;
        setForm({
          full_name: fullName,
          avatar_url: vendor.avatar_url ?? "",
          company_logo_url: vendor.company_logo_url ?? "",
          company_name: vendor.company_name ?? "",
          business_email: vendor.business_email ?? "",
          contact_number: vendor.contact_number ?? "",
          website_url: vendor.website_url ?? "",
          bio: vendor.bio ?? "",
          country: vendor.country ?? "",
          city: vendor.city ?? "",
          address: vendor.address ?? "",
          facebook_url: vendor.facebook_url ?? "",
          instagram_url: vendor.instagram_url ?? "",
          youtube_url: vendor.youtube_url ?? "",
        });
      }
    } catch {
      setMessage({ type: "error", text: "Failed to save profile." });
    } finally {
      setSaving(false);
    }
  }

  function update(name: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function uploadFile(file: File, field: "avatar" | "logo"): Promise<string | null> {
    if (!file.type.match(/^image\/(png|jpeg|webp)$/i)) {
      setMessage({ type: "error", text: "Allowed formats: PNG, JPEG, WebP." });
      return null;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setMessage({ type: "error", text: `File too large. Max ${MAX_SIZE_MB}MB.` });
      return null;
    }
    const formData = new FormData();
    formData.append(field, file);
    const res = await fetch("/api/vendor/upload", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setMessage({ type: "error", text: data.error ?? "Upload failed." });
      return null;
    }
    return typeof data.path === "string" ? data.path : null;
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploadingAvatar(true);
    setMessage(null);
    try {
      const path = await uploadFile(file, "avatar");
      if (path) setForm((prev) => ({ ...prev, avatar_url: path }));
    } finally {
      setUploadingAvatar(false);
    }
  }

  async function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setUploadingLogo(true);
    setMessage(null);
    try {
      const path = await uploadFile(file, "logo");
      if (path) setForm((prev) => ({ ...prev, company_logo_url: path }));
    } finally {
      setUploadingLogo(false);
    }
  }

  async function handlePasswordSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPasswordMessage(null);
    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage({ type: "error", text: "New password must be at least 6 characters." });
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage({ type: "error", text: "New password and confirm password do not match." });
      return;
    }
    setChangingPassword(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setPasswordMessage({ type: "error", text: data.error ?? "Failed to update password." });
        return;
      }
      setPasswordMessage({ type: "success", text: "Password updated successfully." });
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch {
      setPasswordMessage({ type: "error", text: "Failed to update password." });
    } finally {
      setChangingPassword(false);
    }
  }

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

  return (
    <>
      <div className="row mb-3">
        <div className="col-xl-12">
          <div className="card shadow-none flex-fill mb-3">
            <div className="bg-overlay overflow-hidden">
              <img className="w-100 h-100 img-banner" src={imageSrc(form.company_logo_url || form.avatar_url) || DEFAULT_LOGO} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card shadow-none flex-fill mb-3">
            <div className="card-header">
              <p className="neutral-1000 text-md-bold fs-5 py-1">Update your profile</p>
            </div>
            <div className="card-body">
              {message && (
                <div className={`alert ${message.type === "success" ? "alert-success" : "alert-danger"} mb-3`} role="alert">
                  {message.text}
                </div>
              )}
              <input ref={avatarInputRef} type="file" accept={ACCEPT_IMAGES} className="d-none" aria-hidden onChange={handleAvatarChange} />
              <input ref={logoInputRef} type="file" accept={ACCEPT_IMAGES} className="d-none" aria-hidden onChange={handleLogoChange} />
              <form onSubmit={handleSubmit} id="vendor-settings-form">
                <div className="row pt-4">
                  <div className="col-lg-6 mb-3 mb-lg-0">
                    <div className="box-avatar-profile d-flex align-items-center">
                      <div className="image-avatar me-3">
                        <img src={imageSrc(form.avatar_url) || DEFAULT_AVATAR} alt="Avatar" />
                      </div>
                      <button type="button" className="btn btn-primary me-3" onClick={() => avatarInputRef.current?.click()} disabled={uploadingAvatar}>
                        {uploadingAvatar ? "Uploading…" : "Change avatar"}
                      </button>
                      <i className="fi fi-rr-trash cursor-pointer" role="button" onClick={() => update("avatar_url", "")} aria-label="Remove avatar" title="Remove" />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="box-avatar-profile d-flex align-items-center">
                      <div className="image-avatar-2 w-50 me-3 rounded-2 overflow-hidden">
                        <img src={imageSrc(form.company_logo_url) || DEFAULT_LOGO} alt="Company logo" />
                      </div>
                      <button type="button" className="btn btn-primary me-3" onClick={() => logoInputRef.current?.click()} disabled={uploadingLogo}>
                        {uploadingLogo ? "Uploading…" : "Update"}
                      </button>
                      <i className="fi fi-rr-trash cursor-pointer" role="button" onClick={() => update("company_logo_url", "")} aria-label="Remove company logo" title="Remove" />
                    </div>
                    <p className="text-sm-medium neutral-500 mt-2">Recommended dimensions are typically 400 x 400 pixels.</p>
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
                        value={form.full_name}
                        onChange={(e) => update("full_name", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="text-sm-medium neutral-500 mb-10">Email *</label>
                      <input
                        className="form-control"
                        type="email"
                        placeholder="info@bestcarrentaldubai.ae"
                        value={form.business_email}
                        onChange={(e) => update("business_email", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="text-sm-medium neutral-500 mb-10">Company name *</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Best Car Rental Dubai"
                        value={form.company_name}
                        onChange={(e) => update("company_name", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="text-sm-medium neutral-500 mb-10">Personal website</label>
                      <input
                        className="form-control"
                        type="url"
                        placeholder="https://bestcarrentaldubai.ae/"
                        value={form.website_url}
                        onChange={(e) => update("website_url", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label className="text-sm-medium neutral-500 mb-10">Bio *</label>
                      <textarea
                        className="form-control"
                        placeholder="Write Complete Detials about your Company"
                        rows={6}
                        value={form.bio}
                        onChange={(e) => update("bio", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="box-button-save mt-15">
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? "Saving…" : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="card shadow-none flex-fill mb-3">
            <div className="card-header">
              <p className="neutral-1000 text-md-bold fs-5 py-1">Contact Information</p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="text-sm-medium neutral-500 mb-10">Country *</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Country"
                        value={form.country}
                        onChange={(e) => update("country", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="text-sm-medium neutral-500 mb-10">City *</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="City"
                        value={form.city}
                        onChange={(e) => update("city", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="text-sm-medium neutral-500 mb-10">Complete Address *</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Plot 25 street 4 - Al Quoz - Al Quoz Industrial Area 4 - Dubai"
                        value={form.address}
                        onChange={(e) => update("address", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label className="text-sm-medium neutral-500 mb-10">Contact number *</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="+971545514155"
                        value={form.contact_number}
                        onChange={(e) => update("contact_number", e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="box-button-save mt-15">
                  <button type="submit" className="btn btn-primary" disabled={saving}>
                    {saving ? "Saving…" : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <div className="card shadow-none flex-fill">
                <div className="card-header">
                  <p className="neutral-1000 text-md-bold fs-5 py-1">Social Network</p>
                </div>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                      <div className="col-lg-12">
                        <label className="lbl-checkbox text-sm-medium neutral-500">Facebook *</label>
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="url"
                            placeholder="https://www.facebook.com/"
                            value={form.facebook_url}
                            onChange={(e) => update("facebook_url", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <label className="lbl-checkbox text-sm-medium neutral-500">YouTube *</label>
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="url"
                            placeholder="https://youtube.com/"
                            value={form.youtube_url}
                            onChange={(e) => update("youtube_url", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <label className="lbl-checkbox text-sm-medium neutral-500">Instagram *</label>
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="url"
                            placeholder="https://www.instagram.com/"
                            value={form.instagram_url}
                            onChange={(e) => update("instagram_url", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="box-button-save mt-15">
                      <button type="submit" className="btn btn-primary" disabled={saving}>
                        {saving ? "Saving…" : "Save Changes"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card shadow-none flex-fill">
                <div className="card-header">
                  <p className="neutral-1000 text-md-bold fs-5 py-1">Change Password</p>
                </div>
                <div className="card-body">
                  {passwordMessage && (
                    <div className={`alert ${passwordMessage.type === "success" ? "alert-success" : "alert-danger"} mb-3`} role="alert">
                      {passwordMessage.text}
                    </div>
                  )}
                  <form onSubmit={handlePasswordSubmit}>
                    <div className="row mb-3">
                      <div className="col-lg-12">
                        <label className="lbl-checkbox text-sm-medium neutral-500">Old Password *</label>
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="password"
                            placeholder="*************"
                            value={passwordForm.currentPassword}
                            onChange={(e) => setPasswordForm((p) => ({ ...p, currentPassword: e.target.value }))}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <label className="lbl-checkbox text-sm-medium neutral-500">New Password *</label>
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="password"
                            placeholder="*************"
                            value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm((p) => ({ ...p, newPassword: e.target.value }))}
                            required
                            minLength={6}
                          />
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <label className="lbl-checkbox text-sm-medium neutral-500">Confirm new password *</label>
                        <div className="form-group">
                          <input
                            className="form-control"
                            type="password"
                            placeholder="*************"
                            value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm((p) => ({ ...p, confirmPassword: e.target.value }))}
                            required
                            minLength={6}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="box-button-save mt-15">
                      <button type="submit" className="btn btn-primary" disabled={changingPassword}>
                        {changingPassword ? "Updating…" : "Save Changes"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
