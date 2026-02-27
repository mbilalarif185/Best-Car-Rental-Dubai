/**
 * Minimal Pages Router _error.js so Next.js can resolve it when falling back
 * to the pages error handler (e.g. in production). This app uses App Router;
 * this file only exists to satisfy require('.next/server/pages/_error.js').
 */
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
