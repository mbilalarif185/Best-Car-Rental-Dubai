import Link from "next/link";

export default function App() {
  return (
    <>
      <div className="page-header pt-30 background-body">
        <div className="custom-container position-relative mx-auto">
          {/* Hero Banner Image */}
          <div className="bg-overlay rounded-12 overflow-hidden">
            <img 
              className="w-100 h-100 img-banner" 
              src="/assets/imgs/page-header/banner1.png" 
              alt="Luxury Car Rental Services Banner" 
              title="Luxury Car Rental Services" 
              width="1920" 
              height="600" 
              loading="eager" 
            />
          </div>

          {/* Hero Content */}
          <div className="container position-absolute z-1 top-50 start-50 translate-middle text-center">
            <h1 className="text-white">Our Services</h1>
            <p className="text-white text-xl-medium">Perfect service, top experts</p>
          </div>

          {/* Breadcrumbs */}
          <div className="background-body position-absolute z-1 top-100 start-50 translate-middle px-3 py-2 rounded-12 border d-flex gap-3 navigation-page">
            <Link href="/" title="Home" className="neutral-700 text-md-medium">Home</Link>
            <span>
              <img 
                src="/assets/imgs/template/icons/arrow-right.svg" 
                alt="Arrow Right Icon" 
                width="16" 
                height="16" 
                loading="lazy" 
              />
            </span>
            <Link href="/services" title="Services" className="neutral-1000 text-md-bold">Services</Link>
          </div>
        </div>
      </div>
    </>
  );
}
