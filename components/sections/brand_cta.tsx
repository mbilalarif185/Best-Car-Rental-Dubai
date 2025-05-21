import Link from "next/link"
import Image  from "next/image";
export default function Brand_Cta() {
	return (
		<>
<section className="section-cta-7 background-body py-96">
						<div className="box-cta-6">
							<div className="container">
								<div className="row align-items-center">
									<div className="col-lg-5">
										
										<h3 className="custom-heading mb-4 neutral-1000">Car Hire for Your <br />Luxury Travel Needs </h3>
										<p className="text-lg-medium neutral-500 mb-4">
                                        Dubai is a luxury destination with sky-scraping buildings, vast roads, glorious living style, 
										and scenic views. Moreover, <Link href="https://bestcarrentaldubai.ae/" className="custom-color">Best Car Rental Dubai</Link> offers you affordable rental plans for
										 business and private car rental needs. Our luxury brands feature high-end Sports Cars, 
										 SUVs, Sedans, and Coupes to suit your preferences. Moreover, our luxury car hire Dubai 
										 ensures high maintenance of cars, an easy booking process, and free delivery. 
										 Whether you are a Dubai national or a tourist, we know how to serve you with 
										 the best.


										</p>
										<div className="row mt-4">
											<div className="col-md-6">
												<ul className="list-ticks-green list-ticks-green-2">
													<li className="neutral-1000 pe-0"><Link href="https://bestcarrentaldubai.ae/cars/rent-audi-rs-q8-in-dubai" className="custom-color">Rent Audi RS Q8 in Dubai</Link></li>
													<li className="neutral-1000 pe-0"><Link href="https://bestcarrentaldubai.ae/cars/rent-bmw-430i-in-dubai" className="custom-color">Hire BMW 430i in Dubai</Link></li>
													<li className="neutral-1000 pe-0"><Link href="https://bestcarrentaldubai.ae/cars/rent-lamborghini-huracan-evo-spyder-in-dubai" className="custom-color">Lamborghini Huracan Evo Spyder</Link></li>
													<li className="neutral-1000 pe-0"><Link href="https://bestcarrentaldubai.ae/cars/rent-mclaren-720s-in-dubai" className="custom-color">Rent McLaren 720s in Dubai</Link></li>
													
												</ul>
												</div>
												<div className="col-md-6">
													<ul className="list-ticks-green list-ticks-green-2">
													<li className="neutral-1000 pe-0"><Link href="https://bestcarrentaldubai.ae/cars/rent-rolls-royce-cullinan-in-dubai" className="custom-color">Rolls Royce Cullinan for rent in Dubai</Link></li>
													<li className="neutral-1000 pe-0"><Link href="https://bestcarrentaldubai.ae/cars/rent-range-rover-svr-in-dubai" className="custom-color">Rent Range Rover SVR in Dubai</Link></li>
													<li className="neutral-1000 pe-0"><Link href="https://bestcarrentaldubai.ae/cars/rent-mercedes-g63-in-dubai" className="custom-color">Mercedes G63 for rent in Dubai</Link></li>
													<li className="neutral-1000 pe-0"><Link href="https://bestcarrentaldubai.ae/cars/rent-nissan-patrol-platinum-in-dubai" className="custom-color">Nissan Patrol Platinum for rent in Dubai</Link></li>
												
												</ul>
												</div>
											
										</div>
										<Link className="btn btn-primary mt-2" href="/luxury-fleet">
											Explore Our Fleet
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
													 height={269} 
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