'use client'
import { swiperGroup4 } from '@/util/swiperOptions'
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image"

export default function Services1() {
	return (
		<>

			<section className="section-box box-properties-area pt-96 pb-50 background-body">
				<div className="container">
					<div className="row align-items-end mb-40">
						<div className="col-md-8">
							<h2 className=" custom-heading neutral-1000 mb-4">Luxury Car Rental Services in UAE
							</h2>
							<p className="text-lg-medium neutral-500">At Legendary Car Rental, we offer a diverse range of services to meet your unique travel requirements.
								 Whether you need chauffeur service in Dubai or want an exclusive fleet of cars for rent at a wedding, Legendary ensures everything is within your reach. </p>
						</div>
						<div className="col-md-4 mt-md-0 mt-4">
							<div className="d-flex justify-content-md-end justify-content-center">
								<Link className="btn btn-primary" href="/services">
									View More
									<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
										<path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</Link>
							</div>
						</div>
					</div>
					<div className="box-list-featured">
						<div className="box-swiper mt-0">
							<Swiper {...swiperGroup4} className="swiper-container swiper-group-4 swiper-group-journey">
								<div className="swiper-wrapper">
									<SwiperSlide>
										<div className="card-spot background-card wow fadeInDown">
											<div className="card-image">
												<Image
												src="/assets/imgs/services/services-1/Cars for Rent in Airport.webp"
													alt="Rent Lamborghini Dubai"
													title="Lamborghini for rent in Dubai"
													width={270}
													height={338}
													className="rounded-3"
	  											/>
												
											
											</div>
											<Link  href="/services">
											<div className="card-info background-card">
												<div className="card-left">
													<div className="card-title text-lg-bold neutral-1000">Luxury Car Rental Dubai Airport
													</div>
													
												</div>
												<div className="card-right">
													<div className="card-button">
														
															<svg width={10} height={10} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
																<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
															</svg>
														
													</div>
												</div>
											</div>
											</Link>
										</div>
									</SwiperSlide>
									<SwiperSlide>
										<div className="card-spot background-card wow fadeInDown">
											<div className="card-image">
												<Image className="rounded-3" src="/assets/imgs/services/services-1/Luxury chauffeur Services.webp" 
												alt="range rover rental dubai"
												title="Range Rover for rent in dubai"
												width={270}
												height={338}
												/>
											</div>
											<Link href="/services">
											<div className="card-info background-card">
												<div className="card-left">
													<div className="card-title text-lg-bold neutral-1000">Chauffeur Service Dubai
													</div>
													
												</div>
												<div className="card-right">
													<div className="card-button">
														
															<svg width={10} height={10} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
																<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
															</svg>
														
													</div>
												</div>
											</div>
											</Link>
										</div>
									</SwiperSlide>
									<SwiperSlide>
										<div className="card-spot background-card wow fadeInDown">
											<div className="card-image">
												<Image className="rounded-3" src="/assets/imgs/services/services-1/Luxury Cars for Business.webp" 
												alt="luxury car rental dubai"
												title="luxury cars for rent in dubai"
												width={270}
												height={338}/>
											</div>
											<Link href="/services">
											<div className="card-info background-card">
												<div className="card-left">
													<div className="card-title text-lg-bold neutral-1000">Car Rental for Business
													</div>
													
												</div>
												<div className="card-right">
													<div className="card-button">
														
															<svg width={10} height={10} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
																<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
															</svg>
														
													</div>
												</div>
											</div>
											</Link>
										</div>
									</SwiperSlide>
									<SwiperSlide>
										<div className="card-spot background-card wow fadeInDown">
											<div className="card-image">
												<Image className="rounded-3" src="/assets/imgs/services/services-1/Wedding Car Rental in Dubai.webp"  
												alt="Rolls Royce rental dubai"
												title="rolls royce wraith for rent in dubai"
												width={270}
												height={338} />
											</div>
											<Link  href="/services">
											<div className="card-info background-card">
												<div className="card-left">
													<div className="card-title text-lg-bold neutral-1000">Events & Wedding Car Rental</div>
													
												</div>
												<div className="card-right">
													<div className="card-button">
														
															<svg width={10} height={10} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
																<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
															</svg>
														
													</div>
												</div>
											</div>
											</Link>
										</div>
									</SwiperSlide>
									<SwiperSlide>
										<div className="card-spot background-card wow fadeInDown">
											<div className="card-image">
												<Image className="rounded-3" src="/assets/imgs/services/services-1/luxury short term car rental.webp"  
												alt="bmw rental dubai dubai"
												title="BMW Cars for rent in dubai"
												width={270}
												height={338} />
											</div>
											<Link  href="/services">
											<div className="card-info background-card">
												<div className="card-left">
													<div className="card-title text-lg-bold neutral-1000">Short Term Car Rental
													</div>

												</div>
												<div className="card-right">
													<div className="card-button">
														
															<svg width={10} height={10} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
																<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
															</svg>
														
													</div>
												</div>
											</div>
											</Link>
										</div>
									</SwiperSlide>
									<SwiperSlide>
										<div className="card-spot background-card wow fadeInDown">
											<div className="card-image">
												<Image className="rounded-3" src="/assets/imgs/services/services-1/Long Term Rental in Dubai.webp"  
												alt="rent a car dubai"
												title="rent a car in dubai"
												width={270}
												height={338} />
											</div>
											<Link href="/services">
											<div className="card-info background-card">
												<div className="card-left">
													<div className="card-title text-lg-bold neutral-1000">Long-term Car Rental
													</div>
													
												</div>
												<div className="card-right">
													<div className="card-button">
													
															<svg width={10} height={10} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
																<path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
															</svg>
														
													</div>
												</div>
											</div>
											</Link>
										</div>
									</SwiperSlide>
								</div>
							</Swiper>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
