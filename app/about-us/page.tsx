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
  title: "About Us | Luxury Car Rental Dubai",
  description: "Learn about Legendary Car Rental Dubai, the top luxury car rental service in Dubai. Premium cars, top service, best prices.",
  openGraph: {
    title: "About Us | Legendary Car Rental Dubai",
    description: "Learn about Legendary Car Rental Dubai, the top luxury car rental service in Dubai. Premium cars, top service, best prices.",
    url: "https://legendary.ae/about-us",
    siteName: "Legendary Car Rental Dubai",
    images: [
      {
        url: "https://legendary.ae/assets/imgs/og-about-us.jpg", 
        width: 1200,
        height: 630,
        alt: "Luxury Car Rental Dubai"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "https://legendary.ae/about-us", // ✅ Fixed domain
  }
};

export default function AboutUs() {
  return (
    <Layout footerStyle={1}>
      <main>
        <Header
        title="About Us"
        subtitle="Get the latest news, updates and tips"
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
