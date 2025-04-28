
import Link from "next/link"

export default function Cta3() {
	return (
		<>

			<section className="background-body">
				<div className="box-cta-3 background-100 py-96 mx-auto rounded-3 position-relative overflow-hidden">
					<div className="container">
						<div className="row align-items-center">
							<div className="col-lg-5 pe-lg-5">
								<span className="btn btn-signin bg-white text-dark mb-4 wow fadeInDown">About Our Luxury Car Rental Dubai</span>
								<h4 className="mb-4 pe-lg-5 neutral-1000 wow fadeInUp">Affordable Luxury Car Rental Dubai</h4>
								<p className="text-lg-medium neutral-500 mb-4 wow fadeInUp">
								We recognize that when you rent a luxury vehicle at our luxury car rental service in Dubai, 
								you are renting an experience, not just a ride. We have been providing the best luxury car rentals in Dubai since 2016,
								 leading the way for those in Dubai who want to enjoy the elegance,
								 power, and luxury that our new luxury cars offer.
									
								</p>
								<div className="row">
									<div className="col">
										<ul className="list-ticks-green">
											<li className="neutral-1000">Economical Rates<br/></li>
											<li className="neutral-1000">Round-the-clock Pickup & Return</li>
											<li className="neutral-1000">Various Drop Off Locations</li>
										</ul>
									</div>
								</div>
								<Link className="btn btn-primary mt-2 wow fadeInUp" href="#">
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
											<img className="bdrd8 w-100 wow fadeIn" data-wow-delay="0.1s" src="/assets/imgs/cta/cta-3/img-1.png" alt="Carento" />
										</div>
										<div className="col-sm-4 mb-30">
											<img className="bdrd8 w-100 mb-15 wow fadeIn" data-wow-delay="0.2s" src="/assets/imgs/cta/cta-3/img-2.png" alt="Carento" />
											<img className="bdrd8 w-100 wow fadeIn" data-wow-delay="0.3s" src="/assets/imgs/cta/cta-3/img-3.png" alt="Carento" />
										</div>
										<div className="col-sm-4 mb-30">
											<img className="bdrd8 w-100 mb-15 wow fadeIn" data-wow-delay="0.4s" src="/assets/imgs/cta/cta-3/img-4.png" alt="Carento" />
											<img className="bdrd8 w-100 wow fadeIn" data-wow-delay="0.5s" src="/assets/imgs/cta/cta-3/img-5.png" alt="Carento" />
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
