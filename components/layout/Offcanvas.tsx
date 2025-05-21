import Link from 'next/link'

export default function Offcanvas({ isOffcanvas, handleOffcanvas }: any) {
	return (
		<>
			<div className={`sidebar-canvas-wrapper perfect-scrollbar button-bg-2 ${isOffcanvas ? "sidebar-canvas-visible" : ""}`}>
				<div className="sidebar-canvas-container">
					<div className="sidebar-canvas-head">
						<div className="sidebar-canvas-logo">
							<Link className="d-flex" href="/">
								<img className="light-mode" alt="Best Car Rental Dubai" src="/assets/imgs/template/best-car-rental-dubai.webp" />
								<img className="dark-mode" alt="Luxury Cars for Rent in Dubai" src="/assets/imgs/template/Best-Car-Rental Dubai-logo.webp" />
							</Link>
						</div>
						<div className="sidebar-canvas-lang">
							{/* <div className="d-inline-block box-dropdown-cart align-middle mr-15">
								<span className="text-14-medium icon-list icon-account icon-lang"><span className="text-14-medium arrow-down text-dark">EN</span></span>
								<div className="dropdown-account">
									<ul>
										<li><Link className="text-sm-medium" href="#">English</Link></li>
										<li><Link className="text-sm-medium" href="#">French</Link></li>
										<li><Link className="text-sm-medium" href="#">Chinese</Link></li>
									</ul>
								</div>
							</div>
							<div className="d-inline-block box-dropdown-cart align-middle mr-15">
								<span className="text-14-medium icon-list icon-cart"><span className="text-14-medium arrow-down text-dark">USD</span></span>
								<div className="dropdown-cart">
									<ul>
										<li><Link className="text-sm-medium" href="#">USD</Link></li>
										<li><Link className="text-sm-medium" href="#">EUR</Link></li>
										<li><Link className="text-sm-medium" href="#">SGP</Link></li>
									</ul>
								</div>
							</div> */}
							<a className="close-canvas" onClick={handleOffcanvas}> <img alt="Rent Luxury Car in Dubai" src="/assets/imgs/template/icons/close.png" /></a>
						</div>
					</div>
					<div className="sidebar-canvas-content">
						{/* <div className="box-author-profile">
							<div className="card-author">
								<div className="card-image"><img src="/assets/imgs/page/homepage1/author2.png" alt="Carento" /></div>
								<div className="card-info">
									<p className="text-md-bold neutral-1000">Howdy, Steven</p>
									<p className="text-xs neutral-1000">25 September 2024</p>
								</div>
							</div>
							<Link className="btn btn-black" href="#">Logout</Link>
						</div>
						<div className="sidebar-banner">
							<div className="position-relative">
								<p className="text-xl-bold neutral-1000 mb-4">Viewed products</p>
								<div className="d-flex align-items-center mb-3">
									<div className="me-3 border rounded-3 overflow-hidden mw-65">
										<Link href="/shop-details">
											<img src="/assets/imgs/shop/shop-details/other-item1.png" alt="Carento" />
										</Link>
									</div>
									<div className="position-relative">
										<Link href="#" className="text-md-bold neutral-1000">R1 Concepts® – eLINE Series Plain Brake
											Rotors</Link>
										<p className="text-md-bold text-success">$20.00</p>
									</div>
								</div>
								<div className="d-flex align-items-center mb-3">
									<div className="me-3 border rounded-3 overflow-hidden mw-65">
										<Link href="/shop-details">
											<img src="/assets/imgs/shop/shop-details/other-item2.png" alt="Carento" />
										</Link>
									</div>
									<div className="position-relative">
										<Link href="#" className="text-md-bold neutral-1000">PIRELLI TIRES® – P4 FOUR SEASONS PLUS</Link>
										<p className="text-md-bold text-success">$160.00</p>
									</div>
								</div>
								<div className="d-flex align-items-center mb-3">
									<div className="me-3 border rounded-3 overflow-hidden mw-65">
										<Link href="/shop-details">
											<img src="/assets/imgs/shop/shop-details/other-item3.png" alt="Carento" />
										</Link>
									</div>
									<div className="position-relative">
										<Link href="#" className="text-md-bold neutral-1000">Mobil 1 Extended Performance Full
											Synthetic Motor Oil</Link>
										<p className="text-md-bold text-success">$33.00</p>
									</div>
								</div>
								<div className="d-flex align-items-center mb-3">
									<div className="me-3 border rounded-3 overflow-hidden mw-65">
										<Link href="/shop-details">
											<img src="/assets/imgs/shop/shop-details/other-item4.png" alt="Carento" />
										</Link>
									</div>
									<div className="position-relative">
										<Link href="#" className="text-md-bold neutral-1000">HRE FlowForm® – FT01 Tarma Honda 2024</Link>
										<p className="text-md-bold text-success">$250.00</p>
									</div>
								</div>
								<div className="d-flex align-items-center mb-3">
									<div className="me-3 border rounded-3 overflow-hidden mw-65">
										<Link href="/shop-details">
											<img src="/assets/imgs/shop/shop-details/other-item5.png" alt="Carento" />
										</Link>
									</div>
									<div className="position-relative">
										<Link href="#" className="text-md-bold neutral-1000">Mobil Delvac 1300 Super Heavy Duty
											Synthetic</Link>
										<p className="text-md-bold text-success">$44.00</p>
									</div>
								</div>
							</div>
						</div> */}
						<div className="box-contactus">
							<h6 className="title-contactus neutral-1000 mb-20">Contact Us</h6>
							<div className="contact-info">
								<p className="address-2 text-md-medium neutral-1000">Plot 25, street 4, Al Quoz Industrial Area, <br /> Dubai, UAE
								</p>
								<p className="hour-work-2 text-md-medium neutral-1000">Hours: 9:30 - 21:00, Mon - Sun</p>
								<p className="email-2 text-md-medium neutral-1000 "><a href="mailto:info@legendarycarrental.ae" >info@legendarycarrental.ae</a></p>
							</div>
							<div className="box-need-help">
									<p className="need-help text-md-medium mb-5 text-black">Need help? Call us</p>
									<br /><Link className="heading-6 phone-support ml-30" href="/tel:+971 54 551 4155">+971 54 551 4155</Link>
								</div>
						</div>
					</div>
				</div>
			</div>
			{isOffcanvas && (
				<div className="body-overlay-1" onClick={handleOffcanvas} />
			)}

		</>
	)
}
