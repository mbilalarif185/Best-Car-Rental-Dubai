import Layout from "@/components/layout/Layout";
import Header from "@/components/about_sections/header";
import Second from "@/components/about_sections/second";
import Third from "@/components/about_sections/third";
import Cta8 from "@/components/sections/cta8";
import Cta9 from "@/components/sections/cta9";
import Faq from "@/components/sections/faq";
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
        <Header />
        <Second />
        <Cta8 />
        <Third />
        <Cta9 />
        <Faq />
      </main>
    </Layout>
  );
}
