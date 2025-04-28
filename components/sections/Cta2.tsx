import CounterUp from '../elements/CounterUp'


export default function Cta2() {
	return (
		<>

			<section className="box-cta-2 background-body overflow-hidden">
				<div className=" bg-shape top-50 start-50 translate-middle" >

					<img  src="/assets/imgs/cta/cta-2/Luxury Car Rental Dubai.webp" alt="Luxury Car Rental Dubai"
					loading='lazy'
					decoding='async' />
				</div>
				<div className="container position-relative z-1">
					<div className="row ">
						<div className="col-lg-5 pe-lg-5 ">
							<h3 className="text-white wow fadeInDown">Want to Book Luxury Car?</h3>
							<p className="text-lg-medium text-white wow fadeInUp">Match with up to 4 lenders to get the lowest
								rate available with no markups, no fees, and no obligations.</p>
						</div>
						
						<div className="col-lg-6 offset-lg-1">
							<div className="mb-30 background-card p-md-5 p-4 rounded-3 mt-lg-0 mt-30 wow fadeIn">
								<h5 className="neutral-1000 mb-2">Book Your Car</h5>
								<p className="text-sm-medium neutral-500 mb-25">
								Fill out the form below to reserve your luxury car rental.
								</p>
								<div className="form-contact">
								<div className="row">
									<div className="col-lg-6">
									<div className="form-group">
										<label className="text-sm-medium neutral-1000">Full Name</label>
										<input className="form-control" type="text" placeholder="Luxury Car Rental Dubai" />
									</div>
									</div>
									<div className="col-lg-6">
									<div className="form-group">
										<label className="text-sm-medium neutral-1000">Email Address</label>
										<input className="form-control" type="email" placeholder="info@legendarycarrental.ae" />
									</div>
									</div>
									<div className="col-lg-6">
									<div className="form-group">
										<label className="text-sm-medium neutral-1000">Pickup Date</label>
										<input className="form-control" type="date" />
									</div>
									</div>
									<div className="col-lg-6">
									<div className="form-group">
										<label className="text-sm-medium neutral-1000">Drop-off Date</label>
										<input className="form-control" type="date" />
									</div>
									</div>
									<div className="col-lg-6">
									<div className="form-group">
										<label className="text-sm-medium neutral-1000">Pickup Location</label>
										<input className="form-control" type="text" placeholder="Dubai " />
									</div>
									</div>
									<div className="col-lg-6">
									<div className="form-group">
										<label className="text-sm-medium neutral-1000">Car Model</label>
										<input className="form-control" type="text" placeholder="Lamborghini Huracan" />
									</div>
									</div>

									<div className="col-lg-12">
									<button className="btn btn-book" type="submit">
										Confirm Booking
										<svg
										width={17}
										height={16}
										viewBox="0 0 17 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										>
										<path
											d="M8.5 15L15.5 8L8.5 1M15.5 8L1.5 8"
											stroke="currentColor"
											strokeWidth="1.5"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
										</svg>
									</button>
									</div>
								</div>
								</div>
							</div>
						</div>

					</div>
					<div className="row align-items-center">
						<div className="border-top py-3 mt-3" />
						<div className="col-lg-7 mb-20 wow fadeIn">
							<div className="row">
								<div className="col-md-3 col-6 mb-md-0 mb-4 d-flex flex-column align-items-center align-items-md-start">
									<div className="d-flex justify-content-center justify-content-md-start">
										<h3 className="count text-white"><CounterUp count={100}/></h3>
										<h3 className="text-white">+</h3>
									</div>
									<div className="position-relative">
										<p className="text-lg-bold text-white">Fleet of </p>
										<p className="text-lg-bold text-white">Cars</p>
									</div>
								</div>
								<div className="col-md-3 col-6 mb-md-0 mb-4 d-flex flex-column align-items-center align-items-md-start">
									<div className="d-flex justify-content-center justify-content-md-start">
										<h3 className="count text-white"><CounterUp count={6} /></h3>
										<h3 className="text-white">+</h3>
									</div>
									<div className="position-relative">
										<p className="text-lg-bold text-white">Locations in </p>
										<p className="text-lg-bold text-white">Dubai</p>
									</div>
								</div>
								<div className="col-md-3 col-6 mb-md-0 mb-4 d-flex flex-column align-items-center align-items-md-start">
									<div className="d-flex justify-content-center justify-content-md-start">
										<h3 className="count text-white"><CounterUp count={20} /></h3>
										<h3 className="text-white">+</h3>
									</div>
									<div className="position-relative">
										<p className="text-lg-bold text-white">Years</p>
										<p className="text-lg-bold text-white">Experience</p>
									</div>
								</div>
								<div className="col-md-3 col-6 mb-md-0 mb-4 d-flex flex-column align-items-center align-items-md-start">
									<div className="d-flex justify-content-center justify-content-md-start">
										<h3 className="count text-white"><CounterUp count={168} /></h3>
										<h3 className="text-white">K</h3>
									</div>
									<div className="position-relative">
										<p className="text-lg-bold text-white">Happy</p>
										<p className="text-lg-bold text-white">Customers</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-lg-4 offset-lg-1 wow fadeIn">
							<div className="box-authors-partner background-body wow fadeInUp p-4">
								<div className="authors-partner-left">
									<img src="/assets/imgs/page/homepage5/author.png" alt="Luxury Car Rental Clients"
									loading='lazy'
									decoding='async' />
									<img src="/assets/imgs/page/homepage5/author2.png" alt="Luxury Car Rental Clients"
									loading='lazy'
									decoding='async' />
									<img src="/assets/imgs/page/homepage5/author3.png" alt="Clients of Luxury Car Rental"
									loading='lazy'
									decoding='async' />
									<span className="item-author">
										<svg width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
											<rect x="0.5" y="7.448" width={17} height="2.31818" fill="black" />
											<rect x="7.84082" y="17.1072" width={17} height="2.31818" transform="rotate(-90 7.84082 17.1072)" fill="black" />
										</svg>
									</span>
								</div>
								<div className="authors-partner-right">
									<p className="text-sm neutral-1000">1684 people used <strong>Legendary Car Rental Dubai
										 </strong>in the last
										<strong>24 hours</strong></p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
