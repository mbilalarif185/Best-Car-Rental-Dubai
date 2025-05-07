
import Link from "next/link"

export default function Cta3() {
	return (
		<>

			<section className="background-body">
				<div className="box-cta-3 background-100 py-96 mx-auto rounded-3 position-relative overflow-hidden">
					<div className="container">
						<div className="row align-items-center">
							<div className="col-lg-5 pe-lg-5">
								<h3 className="btn btn-signin bg-white text-dark mb-4 wow fadeInDown">About Our Luxury Car Rental Dubai</h3>
								<h2 className="custom-heading mb-4 pe-lg-5 neutral-1000 wow fadeInUp ">Legendary Car Rental: The Premier Car Hire Service in Dubai - UAE
								</h2>
								<p className="text-lg-medium neutral-500 mb-4 wow fadeInUp">
								At Legendary Car Rental, we upgrade your travel experience with our exotic selection of luxury cars for rent in Dubai. Whether you're in Dubai for business, leisure, or a special occasion, our exclusive fleet of high-end vehicles promises a memorable experience. Legendary is the best luxury car rental company in Dubai, offering you luxury cars for rent at affordable prices. Dubai is all about glamor and luxury. 

									
								</p>
								<div className="row">
									<div className="col">
										<ul className="list-ticks-green">
											<li className="neutral-1000">Fastest Delivery Across Dubai<br/></li>
											<li className="neutral-1000">Highly Maintained Rental Cars</li>
											<li className="neutral-1000">From Sports to Family Car Rentals
											</li>
										</ul>
									</div>
								</div>
								<Link className="btn btn-primary mt-2 wow fadeInUp" href="/contact">
									Get Started Now
									<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
										<path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</Link>
							</div>
							<div className="col-lg-6 offset-lg-1 position-relative z-1 mt-lg-0 mt-4">
								<div className="box-image-payment-2">
									<div className="row align-items-center">
										<div className="col-sm-4 mb-30">
											<img className="bdrd8 w-100 wow fadeIn" data-wow-delay="0.1s" src="/assets/imgs/cta/cta-3/rent luxury car.webp" alt="luxury car rental dubai"
											loading="lazy"
											decoding="async" />
										</div>
										<div className="col-sm-4 mb-30">
											<img className="bdrd8 w-100 mb-15 wow fadeIn" data-wow-delay="0.2s" src="/assets/imgs/cta/cta-3/best cars in dubai.webp" alt="luxury car rental"
											loading="lazy"
											decoding="async" />
											<img className="bdrd8 w-100 wow fadeIn" data-wow-delay="0.3s" src="/assets/imgs/cta/cta-3/affordable cars for rent in dubai.webp" alt="car hire dubai"
											loading="lazy"
											decoding="async" />
										</div>
										<div className="col-sm-4 mb-30">
											<img className="bdrd8 w-100 mb-15 wow fadeIn" data-wow-delay="0.4s" src="/assets/imgs/cta/cta-3/luxury supercars for rent in dubai.webp" alt="vip car rental" 
											loading="lazy"
											decoding="async"/>
											<img className="bdrd8 w-100 wow fadeIn" data-wow-delay="0.5s" src="/assets/imgs/cta/cta-3/luxury cars for rent in dubai.webp" alt="exotic cars dubai"
											loading="lazy"
											decoding="async" />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="bg-overlay position-absolute bottom-0 end-0 h-75 background-brand-2 opacity-25 z-0 rounded-start-pill">
					</div>
				</div>
			</section>
		</>
	)
}
