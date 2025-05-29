// // components/fleet/HeroSection.tsx

import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <header className="page-header-2 pt-30 background-body">
      <div className="custom-container position-relative mx-auto">
        <div className="bg-overlay rounded-12 overflow-hidden">
          <Image
            src="/assets/imgs/page-header/banner6.webp"
            alt="Luxury Cars for Rent - Banner"
            title="Luxury Cars for Rent - Banner"
            width={1920}
            height={600}
            className="w-100 h-100 img-fluid img-banner"
            priority 
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

       
      </div>
    </header>
  );
}
