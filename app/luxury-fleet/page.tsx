
import dynamic from "next/dynamic";
import HeroSection from '@/components/fleet/HeroSection'
import Search1 from "@/components/sections/Search1"
import Layout from "@/components/layout/Layout";
const FleetHeading = dynamic(()=>import("@/components/fleet/FleetHeading")) 
const CarsGrid=dynamic(()=>import("@/components/fleet/CarsGrid"))
const Brand_dynamic = dynamic(() => import("@/components/sections/Brand_dynamic"));

export const metadata = {
  title: "Luxury Cars for Rent - Dubai Fleet",
  description: "Explore our fleet of luxury cars for rent in Dubai. Our car rental company offers you exotic cars from SUVs to Sports and Convertibles. Choose and Hire Now!",
  openGraph: {
    title: "Luxury Cars for Rent - Dubai Fleet",
    description: "Luxury Cars for Rent - Dubai Fleet",
    url: "https://bestcarrentaldubai.ae/luxury-fleet",
    images: [
      {
        url: "https://bestcarrentaldubai.ae/assets/imgs/Legendary Cars/Lamborghini-Urus-in-dubai.webp",
        width: 1200,
        height: 630,
        alt: "Luxury Cars in Dubai",
      },
    ],
    type: 'website',
  },
};

export default function CarsList1() {
  
  return (
    <Layout footerStyle={1}>
      <main>
        <HeroSection/>
        <Search1 />
        <FleetHeading/>
        <CarsGrid/>
        <Brand_dynamic/>
      </main>
    </Layout>
  );
}
