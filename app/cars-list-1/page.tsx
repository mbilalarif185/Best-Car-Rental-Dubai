
import HeroSection from '@/components/fleet/HeroSection'
import FleetHeading from '@/components/fleet/FleetHeading'
import CarsGrid from '@/components/fleet/CarsGrid'
import Search1 from "@/components/sections/Search1"
import Layout from "@/components/layout/Layout";
export const metadata = {
  title: "Luxury Cars for Rent in Dubai | Fleet - YourBrand",
  description: "Explore our premium fleet of luxury cars available for rent in Dubai. Competitive rates. Exceptional service. Book now!",
  openGraph: {
    title: "Luxury Cars for Rent in Dubai | Fleet - YourBrand",
    description: "Explore our premium fleet of luxury cars available for rent in Dubai.",
    url: "https://yourdomain.com/fleet",
    images: [
      {
        url: "https://yourdomain.com/images/og-image.jpg",
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
        
      </main>
    </Layout>
  );
}
