import Layout from "@/components/layout/Layout"
import Header from '@/components/about_sections/header';
import dynamic from "next/dynamic";
const Brand =dynamic(()=>import("@/components/brands/brands"))
const Brand_Cta = dynamic(() => import("@/components/sections/brand_cta"));
const Third = dynamic(() => import("@/components/about_sections/third"));


export const metadata = {
	title: "Luxury Car Brands in Dubai | Luxury Car Rentals",
	description: "Explore luxury car brands available for rent in Dubai. Find top brands like Rolls Royce, Bentley, Lamborghini, Ferrari, and more.",
	keywords: ["luxury car brands", "car rental Dubai", "Rolls Royce Dubai", "Lamborghini rental", "Ferrari Dubai"],
	openGraph: {
	  title: "Luxury Car Brands in Dubai",
	  description: "Rent luxury cars from top brands in Dubai at competitive rates.",
	  url: "https://bestcarrentaldubai.ae/luxury-brands",
	  images: [
		{
		  url: "https://bestcarrentaldubai.ae/assets/imgs/brands/Rent Lamborghini in Dubai.webp",
		  width: 1200,
		  height: 630,
		  alt: "Luxury Car Rental Brands"
		}
	  ],
	},
  };
  
export default function Luxury_Brands() {

	return (
		<>

			<Layout footerStyle={1}>
			<Header
				   title="Brands – Luxury Car Hire Dubai"
				   subtitle="Explore luxury car rental brands in Dubai at the best prices to make your trip memorable. "
				   currentPage="Brands"
				   backgroundImage="/assets/imgs/page-header/banner7.webp"
				/>
				<div>
				<Brand/>
				<Brand_Cta/>
				<Third/>
				
				</div>

			</Layout>
		</>
	)
}