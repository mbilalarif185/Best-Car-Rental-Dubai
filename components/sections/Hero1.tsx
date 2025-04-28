import Image from 'next/image';

export default function Hero1() {
	return (
		<>

			<section className="box-section block-banner-home1 position-relative">
			
			<div className="absolute inset-0 z-0 bg" >
				<Image
					src="/assets/imgs/hero/hero-1/check.png"
					alt="Luxury Car Rental Fleet in Dubai"
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
					<h1 className="color-white mb-35 wow fadeInUp">Searching for a Luxurious Vehicle <br className="d-none d-lg-block" />Discover Our Luxury Car Rental</h1>
					<ul className="list-ticks-green">
						<li className="wow fadeInUp" data-wow-delay="0.1s">High quality at a low cost.</li>
						<li className="wow fadeInUp" data-wow-delay="0.2s">Premium services</li>
						<li className="wow fadeInUp" data-wow-delay="0.4s">24/7 roadside support.</li>
					</ul>
				</div>
				
				
			</section> 

		</>
	)
}
