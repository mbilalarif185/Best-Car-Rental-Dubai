'use client';

import { Car } from "@/types/type";

import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { swiperGroup3 } from '@/util/swiperOptions';
import 'swiper/css';

interface CarsListingProps {
  cars: Car[];
}


export default function CarsListing1({ cars }: CarsListingProps) {
  return (
    <section className="section-box box-flights background-body" aria-labelledby="luxury-cars-heading">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-md-9 wow fadeInUp">
            <h2 id="luxury-cars-heading" className="title-svg neutral-1000 mb-5">
              Book from Largest Fleet of Luxury Cars for Rent
            </h2>
            <p className="text-lg-medium text-bold neutral-500">
              Our luxury car rental in Dubai has an excellent car fleet with affordable rental rates that never miss to amuse you. So, for the next ride on the wealthy streets of Dubai, make sure to rent cars from Best Car Rental.
            </p>
          </div>
          <div className="col-md-3 position-relative mb-30 wow fadeInUp">
            <div className="box-button-slider box-button-slider-team justify-content-end">
              <div className="swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-2" aria-label="Previous car">
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                   <path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                 </svg>
              </div>
              <div className="swiper-button-next swiper-button-next-style-1 swiper-button-next-2" aria-label="Next car">
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                   <path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                 </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="block-flights wow fadeInUp">
          <div className="box-swiper mt-50">
            <Swiper {...swiperGroup3} className="swiper-container swiper-group-3 swiper-group-journey">
              {cars.map((car, index) => (
                <SwiperSlide key={index}>
                  <article
                    className="card-journey-small background-card hover-up"
                    itemScope
                    itemType="https://schema.org/Product"
                  >
                    <meta itemProp="name" content={car.name} />
                    <div className="card-image">
                      <div
                        className="card-image-bg"
                        style={{ backgroundImage: `url(${car.image})` }}
                        aria-hidden="true"
                      />
                      <Link href={`/cars/${car.slug}`}>
                        <img
                          src={car.image}
                          alt={`${car.name} - Rent Luxury Car in Dubai`}
                          title={`Rent ${car.name} in Dubai`}
                          width={400}
                          height={250}
                          className="img-fluid"
                          loading="lazy"
                          decoding="async"
                          itemProp="image"
                        />
                      </Link>
                    </div>

                    <div className="card-info">
                      <div className="card-rating">
                        <div className="card-left" />
                        <div className="card-right">
                          <span className="rating" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                            <span itemProp="ratingValue">{car.rating}</span>
                            <span className="text-sm-medium neutral-500"> ({car.reviews} reviews)</span>
                            <meta itemProp="reviewCount" content={car.reviews.toString()} />
                          </span>
                        </div>
                      </div>

                      <h3 className="card-title">
                        <Link className="heading-6 neutral-1000" href={`/cars/${car.slug}`} itemProp="url">
                          <span itemProp="name">{car.name}</span>
                        </Link>
                      </h3>

                      <div className="card-program">
                      <div className="card-location">
                        <p className="text-location text-md-medium neutral-500" itemProp="brand">{car.location}</p>
                      </div>
                        <div className="card-facitlities">
                          <p className="card-miles text-md-medium">{car.doors} Doors</p>
                          <p className="card-gear text-md-medium">{car.gear}</p>
                          <p className="card-fuel text-md-medium">{car.fuel}</p>
                          <p className="card-seat text-md-medium">{car.seats} Seats</p>
                        </div>

                        <div className="endtime">
                          <div className="card-price" itemProp="offers" itemScope itemType="https://schema.org/Offer">
                          
                            <h6 className="heading-6 neutral-1000">
                              <span itemProp="priceCurrency" content="AED">AED</span>{" "}
                              <span itemProp="price">{car.price}</span>
                              <span className="text-lg-medium neutral-1000">/ day</span>
                            </h6>
                          </div>
                          <div className="card-button">
                            <Link className="btn btn-gray" href={`/cars/${car.slug}`} aria-label={`Book ${car.name} in Dubai`}>
                              Book Now
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
