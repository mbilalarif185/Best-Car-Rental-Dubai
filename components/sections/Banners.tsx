
import Link from "next/link"
import Image from "next/image"

export default function Banners() {
	return (
		<>

			<section className="section-box background-body">
				<div className="container">
					<div className="row">
						<div className="col-lg-6">
							<div className="box-banner-1 background-6 px-5 pt-40 position-relative rounded-12 overflow-hidden">
								<div className="banner-images wow fadeIn">
									<Image className="position-absolute bottom-0 end-0" 
									 src="/assets/imgs/banners/banners-1/Rent a Luxury Car.webp"
									 alt="luxury car rental dubai"
									title="luxury cars for rent in dubai"
									width={394}
									height={240} 
									 />
								</div>
								<div className="banner-info">
									<div className="banner-title wow fadeInDown">
										<h3 className="custom-heading5">Looking for Chauffeur Service or Other Options?</h3>
									</div>
									<p className="banner-text text-md-regular py-3 wow fadeInUp">
										Enjoy flexibility and savings with our affordable <br />car rental services.  
										Choose from a high-end <br/>fleet of cars to rent. 

									</p>
									<div className="banner-button pb-70 pt-3">
										<Link className="btn btn-primary background-brand-2 wow fadeInUp" href="/contact">
											Get Started Now
											<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</Link>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-6">
							<div className="box-banner-1 background-5 px-5 pt-40 position-relative rounded-12 mt-lg-0 mt-4 overflow-hidden">
								<div className="banner-images wow fadeIn">
									<Image className="position-absolute bottom-0 end-0" src="/assets/imgs/banners/banners-1/luxury supercars for rent.webp"
									 alt="luxury car rental dubai"
									 title="luxury cars for rent in dubai"
									 width={434}
									 height={310}
									 loading="lazy"
									  />
								</div>
								<div className="banner-info">
									<div className="banner-title wow fadeInDown">
									<h3 className="custom-heading5">Looking for a Luxury Car Hire<br/> in Dubai?</h3>
									</div>
									<p className="banner-text text-md-regular py-3 wow fadeInUp">
										Experience comfort and prestige with our top-tier   
									<br />luxury car rentals.
										Perfect for business,<br/> travel, or family.
									</p>
									<div className="banner-button pb-70 pt-3">
										<Link className="btn btn-primary bg-white wow fadeInUp " href="/luxury-fleet">
											Get Started Now
											<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
											</svg>
										</Link>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
