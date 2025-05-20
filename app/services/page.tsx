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
  title: "Rent a Car Dubai Services - Legendary Car Rental ",
  description: "Want luxury rides? Get our exclusive rent a Car Dubai Services for daily, weekly, or monthly. Book now for achauffeur services, weddings, airport transfer, & events. ",
  openGraph: {
    title: "Rent a Car Dubai Services - Legendary Car Rental ",
    description: "Want luxury rides? Get our exclusive rent a Car Dubai Services for daily, weekly, or monthly. Book now for achauffeur services, weddings, airport transfer, & events. ",
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
    title: "Rent a Car Dubai Services - Legendary Car Rental ",
    description: "Want luxury rides? Get our exclusive rent a Car Dubai Services for daily, weekly, or monthly. Book now for achauffeur services, weddings, airport transfer, & events. ",
    images: ["/assets/imgs/cta/cta-10/img-1.png"]
  }
};

export default function Services() {
  return (
    <Layout footerStyle={1}>
      <div>
        <Header
				   title="Services – Rent a Car Dubai"
				   subtitle="Luxury car rental services in Dubai at the most affordable prices. Rent a car in Dubai and enjoy a smooth and thrilling journey."
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
