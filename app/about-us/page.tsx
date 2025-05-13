import Layout from "@/components/layout/Layout";
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/about_sections/header'));
const Second = dynamic(() => import('@/components/about_sections/second'));
const Third = dynamic(() => import('@/components/about_sections/third'));
const Cta8 = dynamic(() => import('@/components/sections/cta8'));
const Cta9 = dynamic(() => import('@/components/sections/cta9'));
const Faq = dynamic(() => import('@/components/sections/faq'));
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Legendary - Best Car Rental in Dubai ",
  description: "Legendary is the best car rental in Dubai with its huge fleet of cars for rent at best prices. Rent now for a week, month, or day. Free Delivery & 24/7 service. ",
  openGraph: {
    title: "About Legendary - Best Car Rental in Dubai ",
    description: "Legendary is the best car rental in Dubai with its huge fleet of cars for rent at best prices. Rent now for a week, month, or day. Free Delivery & 24/7 service. ",
    url: "https://bestcarrentaldubai.ae/",
    siteName: "Legendary Car Rental Dubai",
    images: [
      {
        url: "https://bestcarrentaldubai.ae/assets/img/Legendary Cars/Lamborghini-STO-luxury-car-rental-dubai.webp", 
        width: 1200,
        height: 630,
        alt: "Luxury Car Rental Dubai"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://bestcarrentaldubai.ae/about-us", // ✅ Fixed domain
  }
};

export default function AboutUs() {
  return (
    <Layout footerStyle={1}>
      <main>
        <Header
        title="About Us"
        subtitle="Your Premium Car Rental Provider in Dubai"
        currentPage="About Us"
        backgroundImage="/assets/imgs/page-header/banner.webp" />
        <Second />
        <Cta8 />
        <Third />
        <Cta9 />
        <Faq />
      </main>
    </Layout>
  );
}
