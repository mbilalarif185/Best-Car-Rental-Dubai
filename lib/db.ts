import { Pool } from "pg";

// When using DATABASE_URL, DB_PORT and other DB_* vars are ignored (port must be in the URL).
// Restart dev server after changing .env so new values are loaded.
const portFromEnv = process.env.DB_PORT?.trim();
const port = portFromEnv ? parseInt(portFromEnv, 10) : 5432;
const resolvedPort = Number.isFinite(port) ? port : 5432;

const poolConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : {
      database: process.env.DB_NAME ?? "BCR_CAR_HIRE",
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST ?? "localhost",
      port: resolvedPort,
    };

const pool = new Pool({
  ...poolConfig,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export default pool;
