import Image from "next/image";
import Link from "next/link"
import Marquee from 'react-fast-marquee'

export default function Brand1() {
	return (
		<>

			<div className="background-100 pb-70">
				<div className="container">
					<div className="box-search-category">
						<h3 className="heading-3 mb-0 neutral-1000 wow fadeInUp">Our Top Luxury Car Rental Brands </h3>
						<div className="d-flex align-items-center justify-content-between">
							<p className="text-lg-medium neutral-500 wow fadeInUp">Rent Luxury Car Now
								</p>
							<Link href="/luxury-fleet" className="text-sm-bold neutral-1000 wow fadeInUp">
								Show All Brands
								<svg className="ms-1" xmlns="http://www.w3.org/2000/svg" width={15} height={10} viewBox="0 0 15 10" fill="none">
									<path fillRule="evenodd" clipRule="evenodd" d="M0.718262 4.99965C0.718262 4.86705 0.77094 4.73987 0.864708 4.6461C0.958476 4.55233 1.08565 4.49965 1.21826 4.49965H13.0113L9.86426 1.35366C9.77038 1.25977 9.71763 1.13243 9.71763 0.999655C9.71763 0.866879 9.77038 0.739542 9.86426 0.645655C9.95815 0.551768 10.0855 0.499023 10.2183 0.499023C10.351 0.499023 10.4784 0.551768 10.5723 0.645655L14.5723 4.64565C14.6188 4.6921 14.6558 4.74728 14.681 4.80802C14.7062 4.86877 14.7192 4.93389 14.7192 4.99965C14.7192 5.06542 14.7062 5.13054 14.681 5.19129C14.6558 5.25203 14.6188 5.30721 14.5723 5.35365L10.5723 9.35365C10.4784 9.44754 10.351 9.50029 10.2183 9.50029C10.0855 9.50029 9.95815 9.44754 9.86426 9.35365C9.77038 9.25977 9.71763 9.13243 9.71763 8.99965C9.71763 8.86688 9.77038 8.73954 9.86426 8.64565L13.0113 5.49965H1.21826C1.08565 5.49965 0.958476 5.44698 0.864708 5.35321C0.77094 5.25944 0.718262 5.13226 0.718262 4.99965Z" fill="#101010" />
								</svg>
							</Link>
						</div>
						{/* <Marquee direction='left' pauseOnHover={true} className="carouselTicker carouselTicker-left box-list-brand-car justify-content-center  wow fadeIn">
							<ul className="carouselTicker__list">
								<li className="carouselTicker__item">
									<Link href="/luxury-fleet" className="item-brand">
										<img className="light-mode" src="/assets/imgs/page/homepage2/Rent Lamborghini in Dubai.webp"
										alt="Rent Lamborghini in Dubai"
										title="Lamborghini Car Rental Dubai"
										loading="lazy"
										decoding="async" />
										<img className="dark-mode" src="/assets/imgs/page/homepage2/Rent Lamborghini in Dubai.webp" alt="Lamborghini for Rent in Dubai"
										loading="lazy"
										decoding="async" />
									</Link>
								</li>
								<li className="carouselTicker__item">
									<Link href="/luxury-fleet" className="item-brand">
										<img className="light-mode" src="/assets/imgs/page/homepage2/Bentley for rent in Dubai.webp" alt="Rent Bentley in Dubai" />
										<img className="dark-mode" src="/assets/imgs/page/homepage2/Bentley for rent in Dubai.webp" alt="Bentley for Rent in Dubai" />
									</Link>
								</li>
								<li className="carouselTicker__item">
									<Link href="/luxury-fleet" className="item-brand">
										<img className="light-mode" src="/assets/imgs/page/homepage2/Audi for Rent in Dubai.webp" alt="Rent Audi in Dubai" />
										<img className="dark-mode" src="/assets/imgs/page/homepage2/Audi for Rent in Dubai.webp" alt="Audi Car Rental Dubai" />
									</Link>
								</li>
								<li className="carouselTicker__item">
									<Link href="/luxury-fleet" className="item-brand">
										<img className="light-mode" src="/assets/imgs/page/homepage2/BMW Rental Dubai.webp" alt="Rent BMW in Dubai" />
										<img className="dark-mode" src="/assets/imgs/page/homepage2/BMW Rental Dubai.webp" alt="BMW for Rent in Dubai" />
									</Link>
								</li>
								<li className="carouselTicker__item">
									<Link href="/luxury-fleet" className="item-brand">
										<img className="light-mode" src="/assets/imgs/page/homepage2/Rent Ferrari in Dubai.webp" alt="Rent Ferrari in Dubai" />
										<img className="dark-mode" src="/assets/imgs/page/homepage2/Rent Ferrari in Dubai.webp" alt="Ferrari Car Rental Dubai" />
									</Link>
								</li>
								<li className="carouselTicker__item">
									<Link href="/luxury-fleet" className="item-brand">
										<img className="light-mode" src="/assets/imgs/page/homepage2/Rent Mercedes in Dubai.webp" alt="Mercedes Car Rental Dubai" />
										<img className="dark-mode" src="/assets/imgs/page/homepage2/Rent Mercedes in Dubai.webp" alt="Rent Mercedes in Dubai" />
									</Link>
								</li>
								<li className="carouselTicker__item">
									<Link href="/luxury-fleet" className="item-brand">
										<img className="light-mode" src="/assets/imgs/page/homepage2/Nissan-car-rental-in-dubai.webp" alt="Nissan Car Rental Dubai" />
										<img className="dark-mode" src="/assets/imgs/page/homepage2/Nissan-car-rental-in-dubai.webp" alt="Nissan for Rent in Dubai" />
									</Link>
								</li>
								<li className="carouselTicker__item">
									<Link href="/luxury-fleet" className="item-brand">
										<img className="light-mode" src="/assets/imgs/page/homepage2/Land-rover-car-rental-in-dubai.webp" alt="Rent Luxury Land Rover in Dubai" />
										<img className="dark-mode" src="/assets/imgs/page/homepage2/Land-rover-car-rental-in-dubai.webp" alt="Land Rover for Rent in Dubai" />
									</Link>
								</li>
								<li className="carouselTicker__item">
									<Link href="/luxury-fleet" className="item-brand">
										<img className="light-mode" src="/assets/imgs/page/homepage2/MacLaren-car-rental.webp" alt="MacLaren Car Rental DUbai" />
										<img className="dark-mode" src="/assets/imgs/page/homepage2/MacLaren-car-rental.webp" alt="Rent MacLaren in Dubai" />
									</Link>
								</li>
								<li className="carouselTicker__item">
									<Link href="/luxury-fleet" className="item-brand">
										<img className="light-mode" src="/assets/imgs/page/homepage2/Rolls-Royce-car-rental-in-dubai.webp" alt="Rolls Royce Car Rental in Dubai" />
										<img className="dark-mode" src="/assets/imgs/page/homepage2/Rolls-Royce-car-rental-in-dubai.webp" alt="Rent ROlls Royce in Dubai" />
									</Link>
								</li>
								<li className="carouselTicker__item">
									<Link href="/luxury-fleet" className="item-brand">
										<img className="light-mode" src="/assets/imgs/page/homepage2/porsche-car-rental-in-dubai.webp" alt="Porsche for Rent in Dubai" />
										<img className="dark-mode" src="/assets/imgs/page/homepage2/porsche-car-rental-in-dubai.webp" alt="Rent Porsche in Dubai" />
									</Link>
								</li>
								<li className="carouselTicker__item">
									<Link href="/luxury-fleet" className="item-brand">
										<img className="light-mode" src="/assets/imgs/page/homepage2/CADILLAC-car-rental-in-dubai.webp" alt="Cadillac Rental Dubai" />
										<img className="dark-mode" src="/assets/imgs/page/homepage2/CADILLAC-car-rental-in-dubai.webp" alt="Rent CADILLAC in Dubai" />
									</Link>
								</li>
							</ul>
					</Marquee> */}
					<Marquee direction='left' pauseOnHover={true} className="carouselTicker carouselTicker-left box-list-brand-car justify-content-center  wow fadeIn">
  <ul className="carouselTicker__list">
    <li className="carouselTicker__item">
      <Link href="/luxury-fleet" className="item-brand">
        <img className="light-mode" src="/assets/imgs/page/homepage2/Rent Lamborghini in Dubai.webp" alt="Rent Lamborghini in Dubai" title="Lamborghini Car Rental Dubai" loading="lazy" decoding="async" />
        <img className="dark-mode" src="/assets/imgs/page/homepage2/Rent Lamborghini in Dubai.webp" alt="Lamborghini for Rent in Dubai" title="Lamborghini Rental Dubai" loading="lazy" decoding="async" />
      </Link>
    </li>
    <li className="carouselTicker__item">
      <Link href="/luxury-fleet" className="item-brand">
        <img className="light-mode" src="/assets/imgs/page/homepage2/Bentley for rent in Dubai.webp" alt="Rent Bentley in Dubai" title="Bentley Car Rental Dubai" loading="lazy" decoding="async" />
        <img className="dark-mode" src="/assets/imgs/page/homepage2/Bentley for rent in Dubai.webp" alt="Bentley for Rent in Dubai" title="Bentley Rental Dubai" loading="lazy" decoding="async" />
      </Link>
    </li>
    <li className="carouselTicker__item">
      <Link href="/luxury-fleet" className="item-brand">
        <img className="light-mode" src="/assets/imgs/page/homepage2/Audi for Rent in Dubai.webp" alt="Rent Audi in Dubai" title="Audi Car Rental Dubai" loading="lazy" decoding="async" />
        <img className="dark-mode" src="/assets/imgs/page/homepage2/Audi for Rent in Dubai.webp" alt="Audi Car Rental Dubai" title="Rent Audi in Dubai" loading="lazy" decoding="async" />
      </Link>
    </li>
    <li className="carouselTicker__item">
      <Link href="/luxury-fleet" className="item-brand">
        <img className="light-mode" src="/assets/imgs/page/homepage2/BMW Rental Dubai.webp" alt="Rent BMW in Dubai" title="BMW Car Rental Dubai" loading="lazy" decoding="async" />
        <img className="dark-mode" src="/assets/imgs/page/homepage2/BMW Rental Dubai.webp" alt="BMW for Rent in Dubai" title="BMW Rental Dubai" loading="lazy" decoding="async" />
      </Link>
    </li>
    <li className="carouselTicker__item">
      <Link href="/luxury-fleet" className="item-brand">
        <img className="light-mode" src="/assets/imgs/page/homepage2/Rent Ferrari in Dubai.webp" alt="Rent Ferrari in Dubai" title="Ferrari Car Rental Dubai" loading="lazy" decoding="async" />
        <img className="dark-mode" src="/assets/imgs/page/homepage2/Rent Ferrari in Dubai.webp" alt="Ferrari Car Rental Dubai" title="Rent Ferrari in Dubai" loading="lazy" decoding="async" />
      </Link>
    </li>
    <li className="carouselTicker__item">
      <Link href="/luxury-fleet" className="item-brand">
        <img className="light-mode" src="/assets/imgs/page/homepage2/Rent Mercedes in Dubai.webp" alt="Mercedes Car Rental Dubai" title="Rent Mercedes in Dubai" loading="lazy" decoding="async" />
        <img className="dark-mode" src="/assets/imgs/page/homepage2/Rent Mercedes in Dubai.webp" alt="Rent Mercedes in Dubai" title="Mercedes for Rent in Dubai" loading="lazy" decoding="async" />
      </Link>
    </li>
    <li className="carouselTicker__item">
      <Link href="/luxury-fleet" className="item-brand">
        <img className="light-mode" src="/assets/imgs/page/homepage2/Nissan-car-rental-in-dubai.webp" alt="Nissan Car Rental Dubai" title="Rent Nissan in Dubai" loading="lazy" decoding="async" />
        <img className="dark-mode" src="/assets/imgs/page/homepage2/Nissan-car-rental-in-dubai.webp" alt="Nissan for Rent in Dubai" title="Nissan Rental Dubai" loading="lazy" decoding="async" />
      </Link>
    </li>
    <li className="carouselTicker__item">
      <Link href="/luxury-fleet" className="item-brand">
        <img className="light-mode" src="/assets/imgs/page/homepage2/Land-rover-car-rental-in-dubai.webp" alt="Rent Luxury Land Rover in Dubai" title="Land Rover Rental Dubai" loading="lazy" decoding="async" />
        <img className="dark-mode" src="/assets/imgs/page/homepage2/Land-rover-car-rental-in-dubai.webp" alt="Land Rover for Rent in Dubai" title="Rent Land Rover in Dubai" loading="lazy" decoding="async" />
      </Link>
    </li>
    <li className="carouselTicker__item">
      <Link href="/luxury-fleet" className="item-brand">
        <img className="light-mode" src="/assets/imgs/page/homepage2/MacLaren-car-rental.webp" alt="MacLaren Car Rental Dubai" title="Rent MacLaren in Dubai" loading="lazy" decoding="async" />
        <img className="dark-mode" src="/assets/imgs/page/homepage2/MacLaren-car-rental.webp" alt="Rent MacLaren in Dubai" title="MacLaren for Rent in Dubai" loading="lazy" decoding="async" />
      </Link>
    </li>
    <li className="carouselTicker__item">
      <Link href="/luxury-fleet" className="item-brand">
        <img className="light-mode" src="/assets/imgs/page/homepage2/Rolls-Royce-car-rental-in-dubai.webp" alt="Rolls Royce Car Rental in Dubai" title="Rent Rolls Royce in Dubai" loading="lazy" decoding="async" />
        <img className="dark-mode" src="/assets/imgs/page/homepage2/Rolls-Royce-car-rental-in-dubai.webp" alt="Rent Rolls Royce in Dubai" title="Rolls Royce Rental Dubai" loading="lazy" decoding="async" />
      </Link>
    </li>
    <li className="carouselTicker__item">
      <Link href="/luxury-fleet" className="item-brand">
        <img className="light-mode" src="/assets/imgs/page/homepage2/porsche-car-rental-in-dubai.webp" alt="Porsche for Rent in Dubai" title="Rent Porsche in Dubai" loading="lazy" decoding="async" />
        <img className="dark-mode" src="/assets/imgs/page/homepage2/porsche-car-rental-in-dubai.webp" alt="Rent Porsche in Dubai" title="Porsche Car Rental Dubai" loading="lazy" decoding="async" />
      </Link>
    </li>
    <li className="carouselTicker__item">
      <Link href="/luxury-fleet" className="item-brand">
        <img className="light-mode" src="/assets/imgs/page/homepage2/CADILLAC-car-rental-in-dubai.webp" alt="Cadillac Rental Dubai" title="Rent Cadillac in Dubai" loading="lazy" decoding="async" />
        <img className="dark-mode" src="/assets/imgs/page/homepage2/CADILLAC-car-rental-in-dubai.webp" alt="Rent CADILLAC in Dubai" title="Cadillac for Rent in Dubai" loading="lazy" decoding="async" />
      </Link>
    </li>
  </ul>
</Marquee>

					
					
				</div>
			</div>
		</div >
		</>
	)
}
