
import { getCategoryData } from "@/lib/categoryUtils";
import { getFeaturedCars } from "@/lib/getFeaturedCars";
import { getspecial } from "@/lib/getspecial";
import dynamic from "next/dynamic";
import Layout from "@/components/layout/Layout";
import Hero1 from "@/components/sections/Hero1";
import Script from "next/script";

import Search1 from "@/components/sections/Search1";
const Brand1 = dynamic(() => import("@/components/sections/Brand1"));
const CarsListing1 = dynamic(() => import("@/components/sections/CarsListing1"));
const Cta3 = dynamic(() => import("@/components/sections/Cta3"));
const Categories1 = dynamic(() => import("@/components/sections/Categories1"));
const WhyUs1 = dynamic(() => import("@/components/sections/WhyUs1"));
const Cta2 = dynamic(() => import("@/components/sections/Cta2"));
const CarsListing2 = dynamic(() => import("@/components/sections/CarsListing2"));
const Cta1 = dynamic(() => import("@/components/sections/Cta1"));
const Services1 = dynamic(() => import("@/components/sections/Services1"));
const Banners = dynamic(() => import("@/components/sections/Banners"));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"));
const CarReview1 = dynamic(() => import("@/components/sections/CarReview1"));
const Check = dynamic(() => import("@/components/sections/check"));
const Blog1 = dynamic(() => import("@/components/sections/Blog1"));

export const metadata = {
  title: "Best Luxury Car Rental in Dubai | Rent Sports, SUVs & Exotic Cars",
  description:
    "Rent luxury cars in Dubai including Lamborghini, Rolls Royce, Ferrari, and more. Affordable rates, 24/7 support, and fast booking.",
 verification: {
  
    google: "eIB_T-TdBSukKqmpqtNjHrscPQx2ukT5Gpn5Vyr7T0c"
  },
    keywords:
   "luxury car rental dubai,luxury car hire dubai,rent lamborghini dubai,luxury car rental,rent ferrari dubai,luxury supercars,rent a car dubai,rent a car in dubai,luxury car rental abu dhabi,luxury car rental uae,luxury car rental near me", 
 robots: "index, follow",
  alternates: {
    canonical: "https://bestcarrentaldubai.ae/",
  },
  openGraph: {
    title: "Luxury Car Rental Dubai - Rent Sports and Exotic Cars",
    description: "Explore our luxury car rental Dubai and rent exotic cars from high-end brands including Rolls Royce, Audi, Porsche, and others at lowest prices. Hire Now!",
    url: "https://bestcarrentaldubai.ae/",
    siteName: "Legendary Car Rental Dubai",
    images: [
      {
        url: "https://bestcarrentaldubai.ae/assets/imgs/hero/hero-1/check.webp",
        width: 1200,
        height: 630,
        alt: "Luxury Car Rental Dubai",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Luxury Car Rental in Dubai",
    description: "Explore our premium fleet of sports, luxury, and exotic cars in Dubai.",
    images: ["https://bestcarrentaldubai.ae/assets/imgs/hero/hero-1/check.webp"],
  },
};

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "CarRental",
  "name": "Legendary Car Rental Dubai",
  "url": "https://bestcarrentaldubai.ae/",
  "logo": "https://bestcarrentaldubai.ae/logo.png",
  "image": "https://bestcarrentaldubai.ae/assets/imgs/hero/hero-1/check.webp",
  "description":
    "Explore our luxury car rental Dubai and rent exotic cars from high-end brands including Rolls Royce, Audi, Porsche, and others at lowest prices. Hire Now!",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Dubai",
    "addressCountry": "UAE",
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+971 54 551 4155",
    "contactType": "Customer Service",
  },
  "areaServed": "AE",
  "sameAs": [
    "https://www.instagram.com/legendary_carrental/?igsh=MWd4aGdsbHduYmIzNQ%3D%3D#",
    "https://www.facebook.com/Legendarycarrental",
  ],
};

export default async function Home() {
  const categories = await getCategoryData();
  const featuredCars = await getFeaturedCars();
  const specialCars = await getspecial();

  return (
    <Layout headerStyle={1} footerStyle={1}>
     
      
      <Script
        id="ld-json-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />

      
      <Hero1 />
      <Search1 />
      <Brand1 />
      <CarsListing1 cars={featuredCars} />
      <Cta3 />
      <Categories1 categories={categories} />
      <WhyUs1 />
      <Cta2 />
      <CarsListing2 cars={specialCars} />
      <Cta1 />
	    <Services1 />
      <Banners />
      <Testimonials />
      <CarReview1 />
      <Check/>
      <Blog1 />
      
      
    </Layout>
  );
}
