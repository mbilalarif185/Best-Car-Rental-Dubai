
import Layout from "@/components/layout/Layout"
import Contac from "@/components/sections/contact"
import { Metadata } from 'next'; 

export const metadata: Metadata = {
  title: "Contact Us - Luxury Car Rental Services Dubai ",
  description: "Contact Legendary Car Rental to book the best luxury cars in Dubai at best prices. our luxury car rental services are available 24/7 for your assistance. ",
  openGraph: {
	title: "Contact Us - Luxury Car Rental Services Dubai ",
	description: "Contact Legendary Car Rental to book the best luxury cars in Dubai at best prices. our luxury car rental services are available 24/7 for your assistance. ",
	url: "https://bestcarrentaldubai.ae/contact",
	type: "website",
	images: [
	  {
		url: "https://bestcarrentaldubai.ae/assets/imgs/cta/cta-10/img-1.webp",
		width: 800,
		height: 600,
		alt: "Luxury Car Rental Dubai"
	  }
	],
  },
  twitter: {
	card: "summary_large_image",
	title: "Contact Us - Luxury Car Rental Services Dubai ",
	description: "Contact Legendary Car Rental to book the best luxury cars in Dubai at best prices. our luxury car rental services are available 24/7 for your assistance.  ",
	images: ["/assets/imgs/cta/cta-10/img-1.webp"]
  }
};

export default function Contact() {

	return (
		<>

			<Layout footerStyle={1}>
			<Contac/>

			</Layout>
		</>
	)
}