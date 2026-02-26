# Deploy to VPS (Git pull)

## Before you push

- `.env` is in `.gitignore` — it will **not** be pushed. Good.
- SMTP and DB credentials are no longer hardcoded; they are read from environment variables (see below).

## After pull on VPS

### 1. Create `.env` on the server

```bash
cp .env.example .env
# Edit .env with production values:
nano .env   # or vim .env
```

**Required:**

| Variable       | Description |
|----------------|-------------|
| `DB_HOST`      | PostgreSQL host (e.g. `localhost` or your DB server) |
| `DB_PORT`      | PostgreSQL port (e.g. `5432`) |
| `DB_NAME`      | Database name (e.g. `BCR_CAR_HIRE`) |
| `DB_USER`      | DB user |
| `DB_PASSWORD`  | DB password |
| `JWT_SECRET`   | **Must set on VPS.** Long random string (e.g. `openssl rand -base64 32`). Used for login session cookies. If missing, a default is used — **insecure in production.** |
| `SMTP_HOST`    | SMTP server (e.g. `bestcarrentaldubai.ae`) |
| `SMTP_USER`    | SMTP user (e.g. `info@bestcarrentaldubai.ae`) |
| `SMTP_PASS`    | SMTP password (for contact form, dealer contact, booking emails) |

Optional: `SMTP_PORT` (default 465), `SMTP_SECURE` (default true), `DATABASE_URL` (alternative to DB_*).

### 2. Install and build

```bash
npm install
# or: yarn install
npm run build
```

### 3. Run in production

```bash
NODE_ENV=production npm run start
```

Or use PM2/systemd with `NODE_ENV=production` set.

### 4. HTTPS

- Cookie `secure` is set when `NODE_ENV=production`, so the session cookie is sent only over HTTPS.
- Serve the app over HTTPS (reverse proxy with SSL) so login/session work correctly.

---

## JWT session and auth

- **Login / Register:** JWT is signed with `JWT_SECRET` and stored in cookie `bcr_session`.
- **Protected routes:** `/user/*` and `/agent/*` are protected by `middleware.ts`; unauthenticated users are redirected to `/login`.
- **APIs:** `getSession()` reads the cookie and verifies the JWT; used by dashboard, vendor profile, car upload, etc.

**On VPS:** Set `JWT_SECRET` in `.env` to a strong random value. Then login, session, and all protected pages/APIs will work.

## Email (contact, dealer form, booking)

- All email routes use `SMTP_*` from `.env`. Set `SMTP_PASS` (and other SMTP_* if different) on the VPS so contact form, dealer contact form, and car booking emails are sent.
