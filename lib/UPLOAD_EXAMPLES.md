# Image Upload – Frontend Examples

## Vendor avatar / logo (settings page)

Already implemented in `app/user/settings/page.tsx`:

- Use `<input type="file" accept="image/png,image/jpeg,image/webp" />`.
- On change, build `FormData`, append the file under key `"avatar"` or `"logo"`.
- POST to `POST /api/vendor/upload` with `credentials: "include"`.
- Response: `{ path: "/uploads/vendors/avatars/uuid.ext" }` (or logos). Use `path` as `img` src and when saving profile (API stores path without leading slash).

```ts
const formData = new FormData();
formData.append("avatar", file); // or "logo"
const res = await fetch("/api/vendor/upload", {
  method: "POST",
  credentials: "include",
  body: formData,
});
const data = await res.json();
if (res.ok && data.path) {
  setForm((prev) => ({ ...prev, avatar_url: data.path }));
}
```

---

## Car listing images

- Use `<input type="file" multiple accept="image/png,image/jpeg,image/webp" />`.
- Send one file per request (or loop and call API for each).
- FormData: `"image"` (file), `"carId"` (string, required). `carId` = existing car id or temporary id for new listing (alphanumeric, hyphen, underscore only).
- POST to `POST /api/cars/upload`.
- Response: `{ path: "/uploads/cars/{vendorId}/{carId}/uuid.ext" }`. Store `path` in your car listing (e.g. store without leading slash in DB).

```tsx
async function uploadCarImage(file: File, carId: string) {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("carId", carId);
  const res = await fetch("/api/cars/upload", {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error ?? "Upload failed");
  return data.path; // e.g. "/uploads/cars/user-uuid/car-uuid/abc.webp"
}

// Example: multiple files
const input = <input type="file" multiple accept="image/png,image/jpeg,image/webp" />;
// On change:
const files = Array.from(e.target.files ?? []);
for (const file of files) {
  const path = await uploadCarImage(file, carId);
  setImages((prev) => [...prev, path]);
}
```

Do not use base64 or `FileReader.readAsDataURL`.
