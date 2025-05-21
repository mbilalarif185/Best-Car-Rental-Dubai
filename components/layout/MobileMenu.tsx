'use client'
import Link from 'next/link'
import { useState } from 'react'
import Image from "next/image"
import PerfectScrollbar from 'react-perfect-scrollbar'

export default function MobileMenu({ isMobileMenu, handleMobileMenu }: any) {
	const [isAccordion, setIsAccordion] = useState(0)

	const handleAccordion = (key: any) => {
		setIsAccordion(prevState => prevState === key ? null : key)
	}
	return (
		<>
			<div className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar button-bg-2 ${isMobileMenu ? 'sidebar-visible' : ''}`}>
				<PerfectScrollbar className="mobile-header-wrapper-inner">
					<div className="mobile-header-logo">
						<Link className="d-flex" href="/"><img className="light-mode" alt="Luxury Car Rental Dubai" src="/assets/imgs/template/best-car-rental-dubai.webp" />
						<img className="dark-mode" alt="Best Car Rental Dubai" src="/assets/imgs/template/Best-Car-Rental Dubai-logo.webp" /></Link>
						<div className="burger-icon burger-icon-white" onClick={handleMobileMenu} />
					</div>
					<div className="mobile-header-content-area">
						<div className="perfect-scroll">
							<div className="mobile-menu-wrap mobile-header-border">
								<nav>
									<ul className="mobile-menu font-heading">
										{/* <li className={`has-children ${isAccordion === 1 ? "active" : ""}`}>
											<span className="menu-expand" onClick={() => handleAccordion(1)}>
												<i className="arrow-small-down"></i>
											</span>
											<Link href="#">Home Pages</Link>
											<ul className="sub-menu" style={{ display: `${isAccordion == 1 ? "block" : "none"}` }}> */}
												{/* <li><Link href="/">Home page v1</Link></li>
												<li><Link href="/index-2">Home page v2</Link></li>
												<li><Link href="/index-3">Home page v3</Link></li>
											</ul>
										</li>
										<li className={`has-children ${isAccordion === 2 ? "active" : ""}`}>
											<span className="menu-expand" onClick={() => handleAccordion(2)}>
												<i className="arrow-small-down"></i>
											</span>
											<Link href="#">Vehicles</Link>
											<ul className="sub-menu" style={{ display: `${isAccordion == 2 ? "block" : "none"}` }}>
												<li><Link href="/cars-list-1">Cars List v1</Link></li>
												<li><Link href="/cars-list-2">Cars List v2</Link></li>
												<li><Link href="/cars-list-3">Cars List v3</Link></li>
												<li><Link href="/cars-list-4">Cars List v4</Link></li>
												<li><Link href="/cars-details-1">Car Details v1</Link></li>
												<li><Link href="/cars-details-2">Car Details v2</Link></li>
												<li><Link href="/cars-details-3">Car Details v3</Link></li>
												<li><Link href="/cars-details-4">Car Details v4</Link></li>
											</ul>
										</li>
										<li className={`has-children ${isAccordion === 3 ? "active" : ""}`}>
											<span className="menu-expand" onClick={() => handleAccordion(3)}>
												<i className="arrow-small-down"></i>
											</span>
											<Link href="#">Dealers</Link>
											<ul className="sub-menu" style={{ display: `${isAccordion == 3 ? "block" : "none"}` }}>
												<li><Link href="/dealer-listing">Dealers Listing</Link></li>
												<li><Link href="/dealer-details">Dealer Details</Link></li>
											</ul>
										</li>
										<li className={`has-children ${isAccordion === 4 ? "active" : ""}`}>
											<span className="menu-expand" onClick={() => handleAccordion(4)}>
												<i className="arrow-small-down"></i>
											</span>
											<Link href="#">Shop</Link>
											<ul className="sub-menu" style={{ display: `${isAccordion == 4 ? "block" : "none"}` }}>
												<li><Link href="/shop-list">Shop Grid</Link></li>
												<li><Link href="/shop-details">Product Details</Link></li>
											</ul>
										</li>
										<li className={`has-children ${isAccordion === 5 ? "active" : ""}`}>
											<span className="menu-expand" onClick={() => handleAccordion(5)}>
												<i className="arrow-small-down"></i>
											</span>
											<Link href="#">Pages</Link>
											<ul className="sub-menu" style={{ display: `${isAccordion == 5 ? "block" : "none"}` }}>
												<li><Link href="/about-us">About Us</Link></li>
												<li><Link href="/services">Our Services</Link></li>
												<li><Link href="/pricing">Pricing</Link></li>
												<li><Link href="/calculator">Loan Calculator</Link></li>
												<li><Link href="/faqs">FAQs</Link></li>
												<li><Link href="/term">Term</Link></li>
												<li><Link href="/contact">Contact</Link></li>
												<li><Link href="/login">Login</Link></li>
												<li><Link href="/register">Register</Link></li>
												<li><Link href="/404">Error 404</Link></li>
											</ul>
										</li>
										<li className={`has-children ${isAccordion === 6 ? "active" : ""}`}>
											<span className="menu-expand" onClick={() => handleAccordion(6)}>
												<i className="arrow-small-down"></i>
											</span>
											<Link href="#">News</Link>
											<ul className="sub-menu" style={{ display: `${isAccordion == 6 ? "block" : "none"}` }}>
												<li><Link href="/blog-grid">News Grid</Link></li>
												<li><Link href="/blog-list">News List</Link></li>
												<li><Link href="/blog-details">News Details</Link></li>
											</ul>
										</li>
										<li><Link href="/contact">Contact</Link></li> */}
										<li className="color-white">
											<Link  href="/">Home</Link>
											
										</li>
										<li>
											<Link  href="/about-us">About Us
											</Link>
										</li>
										<li className={`has-children ${isAccordion === 6 ? "active" : ""}`}>
											<span className="menu-expand" onClick={() => handleAccordion(6)}>
												<i className="arrow-small-down"></i>
											</span>
											<Link href="/luxury-fleet">Our Fleet
											</Link>
											<ul className="sub-menu" style={{ display: `${isAccordion == 6 ? "block" : "none"}` }}>
											<li><Link href="/luxury-fleet/suv">SUV</Link></li>
												<li><Link href="/luxury-fleet/sedan">Sedan</Link></li>
												<li><Link href="/luxury-fleet/sport">Sport</Link></li>
												<li><Link href="/luxury-fleet/coupe">Coupe</Link></li>
												<li><Link href="/luxury-fleet/convertible">Convertible</Link></li>
												<li><Link href="/luxury-fleet/Hatchback">Hatchback</Link></li>
											</ul>
										</li>
										{/* <li className={`has-children ${isAccordion === 7 ? "active" : ""}`} >
											<span className="menu-expand" onClick={() => handleAccordion(7)}>
												<i className="arrow-small-down"></i>
											</span>
											<Link  href="/luxury-brands">Brands</Link>
											<div className="mega-menu"
											>

												<div className="mega-menu-inner mega-menu-inner-small px-4 py-3">
												<div className="row row-cols-2 row-cols-md-3">
													
													{[
														{
														"name": "BMW ",
														"image": "/assets/imgs/brands/BMW Rental Dubai.webp",
														"slug": "bmw-for-rent-in_dubai"
														},
														{
														"name": "Audi ",
														"image": "/assets/imgs/brands/Audi for Rent in Dubai.webp",
														"slug":"rent-audi-in-dubai"
														},{
															"name": "Lamborghini ",
															"image": "/assets/imgs/brands/Rent Lamborghini in Dubai.webp",
															"slug":"rent-lamborghini-in-dubai"
															
															},
														{
															"name": "McLaren",
															"image": "/assets/imgs/brands/MacLaren-car-rental.webp",
															"slug":"mcLaren-for-rent-in-dubai"
															},
														{
															"name": "Mercedes ",
															"image": "/assets/imgs/brands/Rent Mercedes in Dubai.webp",
															"slug":"rent-mercedes-in-dubai"
															},
														{
															"name": "Nissan",
															"image": "/assets/imgs/brands/Nissan-car-rental-in-dubai.webp",
															"slug":"nissan-car-rental-in-dubai"
															},
															{
															"name": "Porsche",
															"image": "/assets/imgs/brands/porsche-car-rental-in-dubai.webp",
															"slug":"porsche-car-rental-in-dubai"
															},
															
															{
																"name": "Land Rover",
																"image": "/assets/imgs/brands/Land-rover-car-rental-in-dubai.webp",
																"slug":"land-rover-car-rental-in-dubai"
															},
															{
																"name": "Rolls Royce",
																"image": "/assets/imgs/brands/Rolls-Royce-car-rental-in-dubai.webp",
																"slug":"rolls-royce-car-rental-in-dubai"
																},

													].map((brand) => (
													<div className="col text-center mt-4 mb-4 sub-menu" style={{ display: `${isAccordion == 7 ? "block" : "none"}` }} key={brand.slug} >
														<Link href={`/luxury-brands/${brand.slug}`}>
														
														<Image 
															src={brand.image}
															alt={brand.name}
															width={350}
															height={100}
															priority={true}
														/>
														<span className="text-md ">{brand.name}</span>
													
														</Link>
													</div>
													))}
												</div>
												</div>
											</div>
										</li> */}
										<li className={`has-children ${isAccordion === 7 ? "active" : ""}`}>
  <span className="menu-expand" onClick={() => handleAccordion(7)}>
    <i className="arrow-small-down"></i>
  </span>
  <Link href="/luxury-brands">Brands</Link>

  {isAccordion === 7 && (
    <div className="mega-menu">
      <div className="mega-menu-inner mega-menu-inner-small px-4 py-3">
        <div className="row row-cols-2 row-cols-md-3">
          {[
            {
              name: "BMW",
              image: "/assets/imgs/brands/BMW Rental Dubai.webp",
              slug: "bmw-for-rent-in_dubai",
            },
            {
              name: "Audi",
              image: "/assets/imgs/brands/Audi for Rent in Dubai.webp",
              slug: "rent-audi-in-dubai",
            },
            {
              name: "Lamborghini",
              image: "/assets/imgs/brands/Rent Lamborghini in Dubai.webp",
              slug: "rent-lamborghini-in-dubai",
            },
            {
              name: "McLaren",
              image: "/assets/imgs/brands/MacLaren-car-rental.webp",
              slug: "mcLaren-for-rent-in-dubai",
            },
            {
              name: "Mercedes",
              image: "/assets/imgs/brands/Rent Mercedes in Dubai.webp",
              slug: "rent-mercedes-in-dubai",
            },
            {
              name: "Nissan",
              image: "/assets/imgs/brands/Nissan-car-rental-in-dubai.webp",
              slug: "nissan-car-rental-in-dubai",
            },
            {
              name: "Porsche",
              image: "/assets/imgs/brands/porsche-car-rental-in-dubai.webp",
              slug: "porsche-car-rental-in-dubai",
            },
            {
              name: "Land Rover",
              image: "/assets/imgs/brands/Land-rover-car-rental-in-dubai.webp",
              slug: "land-rover-car-rental-in-dubai",
            },
            {
              name: "Rolls Royce",
              image: "/assets/imgs/brands/Rolls-Royce-car-rental-in-dubai.webp",
              slug: "rolls-royce-car-rental-in-dubai",
            },
          ].map((brand) => (
            <div
              className="col text-center mt-4 mb-4 sub-menu"
              key={brand.slug}
            >
              <Link href={`/luxury-brands/${brand.slug}`} className="d-block">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  width={250}
                  height={100}
                  priority
                />
                <span className="text-md">{brand.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}
</li>

										<li>
											<Link  href="/services"> Services
											</Link>
										</li>
										<li>
											<Link  href="/blog-grid">Blog</Link>
											</li>
											<li>
											<Link  href="/contact">Contact Us</Link>
											</li>
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</PerfectScrollbar>
			</div>
			{isMobileMenu && <div className="body-overlay-1" onClick={handleMobileMenu} />			}
		</>
	)
}
