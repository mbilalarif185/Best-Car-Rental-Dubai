import Layout from "@/components/layout/Layout";

import Header from '@/components/about_sections/header';

import dynamic from "next/dynamic";
const CtaBanner=dynamic(()=>import('@/components/sections/Ctabanner'))
const Cardinfo= dynamic(()=>import('@/components/service/Cardinfo'),{

});
const Cta10 = dynamic(() => import('@/components/sections/cta10'), { 
 
  loading: () => <div>Loading...</div> 
});

import { Metadata } from 'next'; 

export const metadata: Metadata = {
  title: "Luxury Car Rental Services in Dubai | Best Deals 2025",
  description: "Discover the best luxury car rental services in Dubai. Book today and save up to 15% on your next ride before April 2025!",
  openGraph: {
    title: "Luxury Car Rental Services in Dubai | Best Deals 2025",
    description: "Discover the best luxury car rental services in Dubai. Book today and save up to 15% on your next ride before April 2025!",
    url: "https://bestcarrentaldubai.ae/services",
    type: "website",
    images: [
      {
        url: "/assets/imgs/cta/cta-10/img-1.webp",
        width: 800,
        height: 600,
        alt: "Luxury Car Rental Dubai"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luxury Car Rental Services in Dubai | Best Deals 2025",
    description: "Book luxury cars in Dubai easily and save big! Top deals for 2025 trips.",
    images: ["/assets/imgs/cta/cta-10/img-1.png"]
  }
};

export default function Services() {
  return (
    <Layout footerStyle={1}>
      <div>
        <Header
				   title="Our Services"
				   subtitle="We Provide Luxury Services to Our Customers "
				   currentPage="Services"
				   backgroundImage="/assets/imgs/page-header/banner1.webp"
				/>
       
        <Cardinfo />
        <CtaBanner />
        <Cta10 />
      </div>
    </Layout>
  );
}
