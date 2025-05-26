
// import Link from "next/link"

// import { Car } from "@/types/type"
// interface CarsListing2Props {
// 	cars: Car[];
//   }
  
//   export default function CarsListing2({ cars }: CarsListing2Props) {
// 	return (
// 	  <section className="section-box box-flights background-body">
// 		<div className="container">
// 		  <div className="row align-items-end mb-10">
// 			<div className="col-md-8">
// 			  <h3 className="neutral-1000 wow fadeInUp mb-4">Top Luxury Cars in Dubai for Rent - Sports to Convertibles </h3>
// 			  <p className="text-lg-medium neutral-500 wow fadeInUp">Whether it's a business meeting, a casual day out, a wedding, or a tour, 
// 				we have the perfect options. Every luxury car rental Dubai company claims to offer the best deals and discounts. 
// 				However, we bring the latest models, high maintenance, 
// 				luxury vehicles, and affordable rental prices to the table,
// 				 which no one can compete with.
// 			  </p>
// 			</div>
// 			<div className="col-md-4 mt-md-0 mt-4">
// 			  <div className="d-flex justify-content-end">
// 				<Link className="btn btn-primary wow fadeInUp" href="/luxury-fleet">
// 				  View More
// 				  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
// 					<path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
// 				  </svg>
// 				</Link>
// 			  </div>
// 			</div>
// 		  </div>
  
// 		  <div className="row pt-30">
// 			{cars.map((car, index) => (
// 			  <div className="col-lg-3 col-md-6 wow fadeIn" key={car.slug} data-wow-delay={`0.${index + 1}s`}>
// 				<div className="card-journey-small background-card hover-up">
// 				  <div className="card-image">
// 					<Link aria-label={`Rent ${car.name}`} href={`/cars/${car.slug}`}>
// 					  <img src={car.image} alt={`Rent ${car.name} in ${car.location}`}
// 					  title={`${car.name} For Rent in Dubai - Luxury Car Rental Dubai`}
// 					  loading="lazy"
// 					  decoding="async"/>
// 					</Link>
// 				  </div>
// 				  <div className="card-info p-4 pt-30">
// 					<div className="card-rating">
// 					  <div className="card-left" />
// 					  <div className="card-right">
// 						<span className="rating text-xs-medium py-1 rounded-pill">
// 						  {car.rating} <span className="text-xs-medium neutral-500">({car.reviews} reviews)</span>
// 						</span>
// 					  </div>
// 					</div>
// 					<div className="card-title">
// 					  <Link className="text-lg-bold neutral-1000 text-nowrap" aria-label={`Rent ${car.name}`} href={`/cars/${car.slug}`}>
// 						{car.name}
// 					  </Link>
// 					</div>
// 					<div className="card-program">
// 					  <div className="card-location">
// 						<p className="text-location text-sm-medium neutral-500">{car.location}</p>
// 					  </div>
// 					  <div className="card-facitlities">
// 						<p className="card-miles text-md-medium">{car.doors} Doors</p>
// 						<p className="card-gear text-md-medium">{car.gear}</p>
// 						<p className="card-fuel text-md-medium">{car.fuel}</p>
// 						<p className="card-seat text-md-medium">{car.seats} Seats</p>
// 					  </div>
// 					  <div className="endtime">
// 						<div className="card-price">
// 						  <h6 className="text-lg-bold neutral-1000"> AED {car.price}</h6>
// 						</div>
// 						<div className="card-button">
// 						  <Link className="btn btn-gray" aria-label={`Rent ${car.name}`} href={`/cars/${car.slug}`}>Book Now</Link>
// 						</div>
// 					  </div>
// 					</div>
// 				  </div>
// 				</div>
// 			  </div>
// 			))}
// 		  </div>
// 		</div>
// 	  </section>
// 	);
//   }
import Link from "next/link";
import { Car } from "@/types/type";

interface CarsListing2Props {
  cars: Car[];
}

export default function CarsListing2({ cars }: CarsListing2Props) {
  return (
    <section className="section-box box-flights background-body">
      <div className="container">
        <div className="row align-items-end mb-10">
          <div className="col-md-8">
            <h3 className="neutral-1000 wow fadeInUp mb-4">
              Top Luxury Cars in Dubai for Rent - Sports to Convertibles
            </h3>
            <p className="text-lg-medium neutral-500 wow fadeInUp">
              Whether it's a business meeting, a casual day out, a wedding, or a tour,
              we have the perfect options. Every luxury car rental Dubai company claims to offer the best deals and discounts.
              However, we bring the latest models, high maintenance,
              luxury vehicles, and affordable rental prices to the table,
              which no one can compete with.
            </p>
          </div>
          <div className="col-md-4 mt-md-0 mt-4">
            <div className="d-flex justify-content-end">
              <Link className="btn btn-primary wow fadeInUp" href="/luxury-fleet">
                View More
                <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="row pt-30">
          {cars.map((car, index) => (
            <div className="col-lg-3 col-md-6 wow fadeIn" key={car.slug} data-wow-delay={`0.${index + 1}s`}>
              <article
                className="card-journey-small background-card hover-up"
                itemScope
                itemType="https://schema.org/Product"
              >
                {/* Product meta */}
                <meta itemProp="name" content={car.name} />
                <meta itemProp="image" content={car.image} />
                <meta itemProp="url" content={`https://bestcarrentaldubai.ae/cars/${car.slug}`} />
                <meta itemProp="description" content={`Rent the ${car.name} in Dubai with ${car.seats} seats and ${car.doors} doors from Best Car Rental Dubai.`} />

                <div className="card-image">
                  <Link aria-label={`Rent ${car.name}`} href={`/cars/${car.slug}`}>
                    <img
                      src={car.image}
                      alt={`Rent ${car.name} in ${car.location}`}
                      title={`${car.name} For Rent in Dubai - Luxury Car Rental Dubai`}
                      loading="lazy"
                      decoding="async"
                    />
                  </Link>
                </div>

                <div className="card-info p-4 pt-30">
                  <div className="card-rating">
                    <div className="card-left" />
                    <div className="card-right">
                      <span
                        className="rating text-xs-medium py-1 rounded-pill"
                        itemProp="aggregateRating"
                        itemScope
                        itemType="https://schema.org/AggregateRating"
                      >
                        <meta itemProp="ratingValue" content={car.rating.toString()} />
                        <meta itemProp="reviewCount" content={car.reviews.toString()} />
                        {car.rating} <span className="text-xs-medium neutral-500">({car.reviews} reviews)</span>
                      </span>
                    </div>
                  </div>

                  <div className="card-title">
                    <Link
                      className="text-lg-bold neutral-1000 text-nowrap"
                      aria-label={`Rent ${car.name}`}
                      href={`/cars/${car.slug}`}
                    >
                      <span itemProp="name">{car.name}</span>
                    </Link>
                  </div>

                  <div className="card-program">
                    <div className="card-location">
                      <p className="text-location text-sm-medium neutral-500" itemProp="brand">{car.location}</p>
                    </div>

                    <div className="card-facitlities">
                      <p className="card-miles text-md-medium">{car.doors} Doors</p>
                      <p className="card-gear text-md-medium">{car.gear}</p>
                      <p className="card-fuel text-md-medium">{car.fuel}</p>
                      <p className="card-seat text-md-medium">{car.seats} Seats</p>
                    </div>

                    <div className="endtime">
                      <div
                        className="card-price"
                        itemProp="offers"
                        itemScope
                        itemType="https://schema.org/Offer"
                      >
                        <meta itemProp="priceCurrency" content="AED" />
                        <meta itemProp="price" content={car.price.toString()} />
                        <meta itemProp="availability" content="https://schema.org/InStock" />
                        <meta itemProp="priceValidUntil" content="2025-12-31" />

                        <div
                          itemProp="hasMerchantReturnPolicy"
                          itemScope
                          itemType="https://schema.org/MerchantReturnPolicy"
                        >
                          <meta itemProp="applicableCountry" content="AE" />
                          <meta itemProp="returnPolicyCategory" content="https://schema.org/NoReturns" />
                        </div>

                        <div
                          itemProp="shippingDetails"
                          itemScope
                          itemType="https://schema.org/OfferShippingDetails"
                        >
                          <meta itemProp="shippingDestination" content="AE" />
                          <meta itemProp="deliveryTime" content="Immediate" />
                        </div>

                        <h6 className="text-lg-bold neutral-1000">
                          AED {car.price}
                          {/* <span className="text-lg-medium neutral-1000"> / day</span> */}
                        </h6>
                      </div>

                      <div className="card-button">
                        <Link
                          className="btn btn-gray"
                          aria-label={`Rent ${car.name}`}
                          href={`/cars/${car.slug}`}
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

  