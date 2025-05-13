import Link from "next/link"
import Image  from "next/image";
export default function Cta8() {
	return (
		<>
<section className="section-cta-7 background-body py-96">
						<div className="box-cta-6">
							<div className="container">
								<div className="row align-items-center">
									<div className="col-lg-5">
										<Link className="btn btn-signin bg-2 text-dark mb-4" href="/luxury-fleet">Our Vision</Link>
										<h3 className="custom-heading mb-4 neutral-1000">To Become Dubai’s Top  <br />Luxury Car Rental </h3>
										<p className="text-lg-medium neutral-500 mb-4">
                                        Our vision is to become a leading car rental company in Dubai, 
										UAE, with a focus on providing excellence, quality, and innovation. 
										We aim to make car rental services easily accessible to everyone in Dubai and beyond. 
										Our team is striving to bring a change in the car rental landscape with more accessible options, 
										ensuring reliability and trust. 

										</p>
										<div className="row mt-4">
											<div className="col-md-6">
												<ul className="list-ticks-green list-ticks-green-2">
													<li className="neutral-1000 pe-0">To make car rental easy and safe.</li>
													<li className="neutral-1000 pe-0">Exceed customer’s expectations for car rental</li>
													
												</ul>
												</div>
												<div className="col-md-6">
													<ul className="list-ticks-green list-ticks-green-2">
													<li className="neutral-1000 pe-0">Focus on growth to provide ideal rental service</li>
													<li className="neutral-1000 pe-0">Focus on growth to provide ideal rental service</li>
												</ul>
												</div>
											
										</div>
										<Link className="btn btn-primary mt-2" href="/contact">
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
													<Image className="bdrd8 w-100" src="/assets/imgs/cta/cta-8/cta1.webp" 
													 alt="Luxury Cars for Rent in Dubai"
													 width={267}
													 height={239} 
													 loading="lazy"/>
												</div>
												<div className="mt-auto">
													<Image className="bdrd8 w-100"
													 src="/assets/imgs/cta/cta-8/rent-a-car-for-event-in-dubai.webp" 
													 alt="Luxury Car Rental Dubai"
													 width={251}
													 height={243}
													 loading="lazy" />
												</div>
											</div>
											<div className="d-flex gap-4">
												<div className="position-relative">
													<Image className="bdrd8 w-100"
													 src="/assets/imgs/cta/cta-8/rent-car-in-dubai.webp" 
													 alt="rent luxury cars in dubai"
													 width={212}
													 height={234}
													 loading="lazy" />
												</div>
												<div className="position-relative">
													<Image className="bdrd8 w-100" 
													src="/assets/imgs/cta/cta-8/rent-a-car-in-dubai.webp" 
													alt="cars for rent in dubai" 
													width={300}
													height={234}
													loading="lazy"/>
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