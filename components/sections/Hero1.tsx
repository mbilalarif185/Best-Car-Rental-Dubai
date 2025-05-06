import Image from 'next/image';
import Link from 'next/link';
export default function Hero1() {
	return (
		<>

			<section className="box-section block-banner-home1 position-relative">
			
			<div className="absolute inset-0 z-0 bg" >
				<Image
					src="/assets/imgs/hero/hero-1/check.webp"
					alt="Luxury Car Rental Fleet in Dubai"
					decoding='async'
					fill
					priority
					style={{
					objectFit: 'cover',
					objectPosition: 'top center',
					}}
				/>
				</div>
				<div className="container position-relative z-1">
					<p className="text-primary text-md-bold wow fadeInUp">Welcom to Dubai's Best Car Rental</p>
					<h1 className="color-white mb-35 wow fadeInUp">Looking to Rent a Luxury Car in Dubai? <br className="d-none d-lg-block" />
					</h1>
					<p className="color-white text-md-bold mb-35 wow fadeInUp d-none d-lg-block">Explore an exclusive range of fleet at our luxury car rental in Dubai from SUVs to Sports and Convertibles.
					</p>
					<ul className="list-ticks-green mb-35">
						<li className="wow fadeInUp" data-wow-delay="0.1s">Exotic cars for rent</li>
						<li className="wow fadeInUp" data-wow-delay="0.2s">24/7 rental service</li>
						<li className="wow fadeInUp" data-wow-delay="0.4s">Affordable rates</li>
					</ul>
					<Link className="btn btn-primary mt-8 wow fadeInUp" href="/contact" aria-label="Book Now Luxury Fleet">
									Book Now
									<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" 
									aria-hidden="true"
    								focusable="false">
										<path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</Link>
				</div>
				
				
			</section> 

		</>
	)
}
