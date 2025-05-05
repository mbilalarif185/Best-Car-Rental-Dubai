import { getCategoryData } from "@/lib/categoryUtils";
import { getFeaturedCars } from "@/lib/getFeaturedCars";
import { getspecial } from "@/lib/getspecial";

import Layout from "@/components/layout/Layout"
import Banners from "@/components/sections/Banners"
import Blog1 from "@/components/sections/Blog1"
import Brand1 from "@/components/sections/Brand1"
import CarReview1 from "@/components/sections/CarReview1"
import CarsListing1 from "@/components/sections/CarsListing1"
import CarsListing2 from "@/components/sections/CarsListing2"
import Categories1 from "@/components/sections/Categories1"
import Cta1 from "@/components/sections/Cta1"
import Cta2 from "@/components/sections/Cta2"
import Cta3 from "@/components/sections/Cta3"
import Hero1 from "@/components/sections/Hero1"
import Search1 from "@/components/sections/Search1"
import Services1 from "@/components/sections/Services1"
import Testimonials from "@/components/sections/Testimonials"
import WhyUs1 from "@/components/sections/WhyUs1"

export default async function Home() {
	const categories = await getCategoryData();
  const featuredCars = await getFeaturedCars();
  const specialCars = await getspecial();
	return (
		<>

			<Layout headerStyle={1} footerStyle={1}>
				<Hero1 />
				<Search1 />
				<Brand1 />
				<CarsListing1 cars={featuredCars} />
				<Cta3 />
				<Categories1 categories={categories}/>
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
		</>
	)
}