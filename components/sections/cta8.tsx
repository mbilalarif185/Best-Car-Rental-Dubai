import Link from "next/link"

export default function Cta8() {
	return (
		<>
<section className="section-cta-7 background-body py-96">
						<div className="box-cta-6">
							<div className="container">
								<div className="row align-items-center">
									<div className="col-lg-5">
										<Link className="btn btn-signin bg-2 text-dark mb-4" href="#">Our Vision</Link>
										<h4 className="mb-4 neutral-1000">Dubai's Top Trusted <br />Luxury Car Rental </h4>
										<p className="text-lg-medium neutral-500 mb-4">
                                        To be the best luxury car rental company in Dubai, known for our fleet, service, and customer satisfaction. Our goal is to constantly raise the bar in luxury and exotic car rentals by adding to the fleet and improving our service.
                                        </p>
										<div className="row">
											<div className="col">
												<ul className="list-ticks-green list-ticks-green-2">
													<li className="neutral-1000 pe-0">We Put Our Customers first,always.</li>
													<li className="neutral-1000 pe-0">Quality is our foundation in everything we deliver.</li>
													<li className="neutral-1000 pe-0">Our vehicles leave our care in pristine condition, looking their best.</li>
												</ul>
											</div>
										</div>
										<Link className="btn btn-primary mt-2" href="#">
											Get Started Now
											<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</Link>
									</div>
									<div className="col-lg-6 offset-lg-1 position-relative z-1 mt-lg-0 mt-4">
										<div className="d-flex flex-column gap-4">
											<div className="d-flex gap-4">
												<div className="position-relative">
													<img className="bdrd8 w-100" src="/assets/imgs/cta/cta-8/cta1.webp" alt="Carento" />
												</div>
												<div className="mt-auto">
													<img className="bdrd8 w-100" src="/assets/imgs/cta/cta-8/img-2.png" alt="Carento" />
												</div>
											</div>
											<div className="d-flex gap-4">
												<div className="position-relative">
													<img className="bdrd8 w-100" src="/assets/imgs/cta/cta-8/img-3.png" alt="Carento" />
												</div>
												<div className="position-relative">
													<img className="bdrd8 w-100" src="/assets/imgs/cta/cta-8/img-4.png" alt="Carento" />
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="bg-overlay position-absolute bottom-0 end-0 h-75 background-brand-2 opacity-25 z-0 rounded-start-pill" />
						</div>
					</section>
        </>
    );
};