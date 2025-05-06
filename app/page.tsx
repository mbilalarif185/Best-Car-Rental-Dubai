
import { getCategoryData } from "@/lib/categoryUtils";
import { getFeaturedCars } from "@/lib/getFeaturedCars";
import { getspecial } from "@/lib/getspecial";

import Layout from "@/components/layout/Layout";
import Hero1 from "@/components/sections/Hero1";
import Search1 from "@/components/sections/Search1";
import Brand1 from "@/components/sections/Brand1";
import CarsListing1 from "@/components/sections/CarsListing1";
import Cta3 from "@/components/sections/Cta3";
import Categories1 from "@/components/sections/Categories1";
import WhyUs1 from "@/components/sections/WhyUs1";
import Cta2 from "@/components/sections/Cta2";
import CarsListing2 from "@/components/sections/CarsListing2";
import Cta1 from "@/components/sections/Cta1";
import Banners from "@/components/sections/Banners";
import dynamic from "next/dynamic";
const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), { ssr: false });
import CarReview1 from "@/components/sections/CarReview1";
// import Services1 from "@/components/sections/Services1"
import Blog1 from "@/components/sections/Blog1";

export const metadata = {
  title: "Best Luxury Car Rental in Dubai | Rent Sports, SUVs & Exotic Cars",
  description:
    "Rent luxury cars in Dubai including Lamborghini, Rolls Royce, Ferrari, and more. Affordable rates, 24/7 support, and fast booking.",
 keywords:
   "luxury car rental dubai,luxury car hire dubai,rent lamborghini dubai,luxury car rental,rent ferrari dubai,luxury supercars,rent a car dubai,rent a car in dubai,luxury car rental abu dhabi,luxury car rental uae,luxury car rental near me", 
 robots: "index, follow",
  alternates: {
    canonical: "https://bestcarrentaldubai.ae/",
  },
  openGraph: {
    title: "Best Luxury Car Rental in Dubai",
    description: "Explore our premium fleet of sports, luxury, and exotic cars in Dubai.",
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
    "Rent luxury and exotic cars in Dubai. Choose from Lamborghini, Rolls Royce, Ferrari, and more. Fast booking and 24/7 support.",
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
      
      <script
        type="application/ld+json"
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
	  {/* <Services1 /> */}
      <Banners />
      <Testimonials />
      <CarReview1 />
      <Blog1 />
    </Layout>
  );
}
