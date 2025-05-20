
'use client';

import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image"; // 👈 import Image
import { swiperGroup1 } from '@/util/swiperOptions';

export default function Cta10() {
  return (
    <section className="section-cta-7 py-96 background-body">
      <div className="box-cta-6">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="box-swiper">
                <Swiper {...swiperGroup1} className="swiper-container swiper-group-1">
                  <div className="swiper-wrapper">
                    <SwiperSlide className="swiper-slide">
                      <Image
                        className="rounded-12"
                        src="/assets/imgs/cta/cta-10/book-luxury-car-in-dubai.webp"
                        alt="Luxury Car Rental Dubai "
                        
                        width={600}  
                        height={550}
                      />
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <Image
                        className="rounded-12"
                        src="/assets/imgs/cta/cta-10/book-luxury-car-for-event-in-dubai.webp"
                        alt="Luxury Car Rental Dubai "
                        width={600}
                        height={550}
                      />
                    </SwiperSlide>
                  </div>

                  <div className="position-absolute end-0 bottom-0 p-40">
                    <div className="box-button-slider box-button-slider-team justify-content-end">
                      <div className="swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-2" tabIndex={0} role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-9c1b729b91027a37b">
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                          <path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="swiper-button-next swiper-button-next-style-1 swiper-button-next-2" tabIndex={0} role="button" aria-label="Next slide" aria-controls="swiper-wrapper-9c1b729b91027a37b">
                        <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                          <path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Swiper>
              </div>
            </div>

            <div className="col-lg-6 ps-lg-5 mt-lg-0 mt-4">
              <h3 className="mb-4 neutral-1000">Rent a Car in Dubai and Plan Your Trip with the US</h3>
              <p className="text-lg-medium neutral-500 mb-4">
                End your search for luxury cars and rent them now from the Best Car Rental in Dubai. 
                We care about your requirements, desires, and, of course, the pocket.
                 Thus, our <Link className="custom-color" href="https://bestcarrentaldubai.ae:">luxury car rental </Link>offers you high-end cars from Lamborghini to Ferrari, Audi, Rolls Royce,
                  Porsche, and many others. Our highly maintained <Link className="custom-color" href="luxury-fleet">fleet of cars</Link> and latest models with a
                   seamless booking process make us the best car rental company.

                </p>
              <div className="row">
                <div className="col">
                  <ul className="list-ticks-green list-ticks-green-2">
                    <li className="neutral-1000 pe-0">Extra safety and cost-effectiveness with seamless booking</li>
                    <li className="neutral-1000 pe-0">Variety of cars for rent, from SUVs to Sports</li>
                    <li className="neutral-1000 pe-0">24/7 customer support with free delivery</li>
                    <li className="neutral-1000 pe-0">Affordable car rental rates and expert drivers</li>
                  </ul>
                </div>
              </div>
              <Link className="btn btn-primary mt-2" href="/contact">
                Get Started Now
                <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-overlay position-absolute bottom-0 end-0 h-75 background-brand-2 opacity-25 z-0 rounded-start-pill" />
      </div>
    </section>
  );
};

