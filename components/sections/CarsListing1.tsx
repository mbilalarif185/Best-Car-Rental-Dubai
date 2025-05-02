
'use client';
import { Car } from "@/types/type"
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { swiperGroup3 } from '@/util/swiperOptions';
import 'swiper/css'; // Swiper styles

interface CarsListingProps {
  cars: Car[]; 
}

export default function CarsListing1({ cars }: CarsListingProps) {
  return (
    <section className="section-box box-flights background-body">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-md-9 wow fadeInUp">
            <h3 className="title-svg neutral-1000 mb-5">Most Searched Vehicles</h3>
            <p className="text-lg-medium text-bold neutral-500">
              The world's leading car brands
            </p>
          </div>
          <div className="col-md-3 position-relative mb-30 wow fadeInUp">
            <div className="box-button-slider box-button-slider-team justify-content-end">
              <div className="swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-2">
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                  <path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="swiper-button-next swiper-button-next-style-1 swiper-button-next-2">
                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                  <path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="block-flights wow fadeInUp">
          <div className="box-swiper mt-30">
            <Swiper {...swiperGroup3} className="swiper-container swiper-group-3 swiper-group-journey">
              {cars.map((car, index) => (
                <SwiperSlide key={index}>
                  <div className="card-journey-small background-card hover-up">
                    <div className="card-image">
                      <div className="card-image-bg" style={{ backgroundImage: `url(${car.image})` }}></div>
                      <Link href={`/cars/${car.slug}`}>
                        <img
                          src={car.image}
                          alt={`${car.name} For Rent in Dubai`}
                          title={`Rent ${car.name} in Dubai`}
                          loading="lazy"
                          decoding="async"
                        />
                      </Link>
                    </div>
                    <div className="card-info">
                      <div className="card-rating">
                        <div className="card-left" />
                        <div className="card-right">
                          <span className="rating">{car.rating} <span className="text-sm-medium neutral-500">({car.reviews} reviews)</span></span>
                        </div>
                      </div>
                      <div className="card-title">
                        <Link className="heading-6 neutral-1000" href="/cars-details-1">{car.name}</Link>
                      </div>
                      <div className="card-program">
                        <div className="card-location">
                          <p className="text-location text-md-medium neutral-500">{car.location}</p>
                        </div>
                        <div className="card-facitlities">
                          <p className="card-miles text-md-medium">{car.doors} Doors</p>
                          <p className="card-gear text-md-medium">{car.gear}</p>
                          <p className="card-fuel text-md-medium">{car.fuel}</p>
                          <p className="card-seat text-md-medium">{car.seats} Seats</p>
                        </div>
                        <div className="endtime">
                          <div className="card-price">
                            <p className="text-md-medium neutral-500 me-2">From</p>
                            <h6 className="heading-6 neutral-1000">AED {car.price}</h6>
                          </div>
                          <div className="card-button">
                            <Link className="btn btn-gray" href={`/cars/${car.slug}`}>Book Now</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
