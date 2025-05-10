
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
                        src="/assets/imgs/cta/cta-10/img-1.png"
                        alt="Luxury Car Rental Dubai "
                        
                        width={6000}  
                        height={400}
                      />
                    </SwiperSlide>
                    <SwiperSlide className="swiper-slide">
                      <Image
                        className="rounded-12"
                        src="/assets/imgs/cta/cta-10/img-1.png"
                        alt="Luxury Car Rental Dubai "
                        width={600}
                        height={400}
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
              <h4 className="mb-4 neutral-1000">Plan Your Trip with Us</h4>
              <p className="text-lg-medium neutral-500 mb-4">Let us help you make your next journey smooth and enjoyable—get started today.</p>
              <div className="row">
                <div className="col">
                  <ul className="list-ticks-green list-ticks-green-2">
                    <li className="neutral-1000 pe-0">Detailed vehicle descriptions and images</li>
                    <li className="neutral-1000 pe-0">Filter options by vehicle type, size, and features</li>
                    <li className="neutral-1000 pe-0">Availability information in real-time</li>
                  </ul>
                </div>
              </div>
              <Link className="btn btn-primary mt-2" href="#">
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

