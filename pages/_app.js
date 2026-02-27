/**
 * Minimal Pages Router _app.js so Next.js can resolve it when using the
 * pages error handler. This app uses App Router; this file only exists
 * to satisfy Next.js runtime when it loads .next/server/pages/_error.js.
 */
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
