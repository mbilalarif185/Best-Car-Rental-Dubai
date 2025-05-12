import Image from "next/image";
import Link from "next/link";
import Marquee from 'react-fast-marquee';
import brands from "@/util/brands.json";

  

  
export default function Brand_dynamic() {
  return (
    <>
      <div className="background-100 pt-55 pb-55">
        <div className="container">
          <div className="box-search-category">
            

			<Marquee direction="left" pauseOnHover={true} className="carouselTicker carouselTicker-left box-list-brand-car justify-content-center">
					<ul className="carouselTicker__list">
									{brands.map((brand) => (
										<li className="carouselTicker__item" key={brand.name}>
										<Link href={`/luxury-brands/${brand.slug}`} className="item-brand" aria-label={`View ${brand.name} Car Rental in Dubai`}>
											<Image 
											className="light-mode" 
											src={brand.image} 
											alt={`Rent ${brand.name} in Dubai`} 
											title={`${brand.name} Car Rental Dubai`} 
											width={300} 
											height={200} 
											decoding="async"
											/>
											<Image 
											className="dark-mode" 
											src={brand.image} 
											alt={`Rent ${brand.name} in Dubai`} 
											title={`${brand.name} Car Rental Dubai`} 
											width={300} 
											height={200} 
											decoding="async"
											/>
										</Link>
										</li>
									))}
								</ul>
			</Marquee>
          </div>
        </div>
      </div>
    </>
  );
}
