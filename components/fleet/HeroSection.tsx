// // components/fleet/HeroSection.tsx

import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <header className="page-header-2 pt-30 background-body">
      <div className="custom-container position-relative mx-auto">
        <div className="bg-overlay rounded-12 overflow-hidden">
          <Image
            src="/assets/imgs/page-header/banner6.png"
            alt="Luxury Cars for Rent - Banner"
            title="Luxury Cars for Rent - Banner"
            width={1920}
            height={600}
            className="w-100 h-100 img-fluid img-banner"
            priority // equivalent to loading="eager" but optimized
          />
        </div>
        
        <div className="container position-absolute z-1 top-50 start-50 pb-70 translate-middle text-center">
          <span className="text-sm-bold bg-2 px-4 py-3 rounded-12">
            Find cars for sale and for rent near you
          </span>
          <h1 className="text-white mt-4">Find Perfect Luxury Car in Dubai</h1>
          <p className="text-white text-lg-medium">
            Search and find your best luxury cars  easily
          </p>
        </div>

        {/* <nav
          aria-label="breadcrumb"
          className="background-body position-absolute z-1 top-100 start-50 translate-middle px-3 py-2 rounded-12 border d-flex gap-3 d-none d-md-flex"
        >
          <Link href="/" title="Home" className="neutral-700 text-md-medium">
            Home
          </Link>
          <span>
            <Image
              src="/assets/imgs/template/icons/arrow-right.svg"
              alt="Arrow Icon"
              width={16}
              height={16}
              decoding="async"
            />
          </span>
          <Link href="/cars" title="Cars Listing" className="neutral-1000 text-md-bold">
            Cars
          </Link>
        </nav> */}
      </div>
    </header>
  );
}
