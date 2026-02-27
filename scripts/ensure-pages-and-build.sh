#!/bin/bash
# Run this on the server from project root: /home/bestcarrentaldubai
# Usage: bash scripts/ensure-pages-and-build.sh

set -e
cd "$(dirname "$0")/.."
ROOT="$(pwd)"
echo "Project root: $ROOT"

# 1. Ensure pages directory and files exist (so next build outputs .next/server/pages/_error.js)
mkdir -p "$ROOT/pages"

if [ ! -f "$ROOT/pages/_app.js" ]; then
  echo "Creating pages/_app.js ..."
  cat > "$ROOT/pages/_app.js" << 'INNER_EOF'
export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
INNER_EOF
fi

if [ ! -f "$ROOT/pages/_error.js" ]; then
  echo "Creating pages/_error.js ..."
  cat > "$ROOT/pages/_error.js" << 'INNER_EOF'
function Error({ statusCode }) {
  return (
    <div style={{ padding: 20, fontFamily: 'system-ui' }}>
      <h1>{statusCode ? `Error ${statusCode}` : 'An error occurred'}</h1>
      <p>{statusCode ? 'Something went wrong on the server.' : 'Something went wrong on the client.'}</p>
    </div>
  );
}
Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};
export default Error;
INNER_EOF
fi

# 2. Clean and build
echo "Removing .next ..."
rm -rf "$ROOT/.next"
echo "Running npm run build ..."
npm run build

# 3. Verify built files exist
if [ -f "$ROOT/.next/server/pages/_error.js" ]; then
  echo "OK: .next/server/pages/_error.js exists."
else
  echo "WARNING: .next/server/pages/_error.js was NOT created. Check build output above."
  exit 1
fi

if [ -f "$ROOT/.next/server/pages/_app.js" ]; then
  echo "OK: .next/server/pages/_app.js exists."
fi

echo "Done. Restart the app: pm2 restart next-app"
