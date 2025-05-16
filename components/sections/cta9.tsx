'use client'
import Link from "next/link"
import Image from "next/image"
import { useState } from 'react'

export default function Cta9() {
    const [isOpen, setOpen] = useState(false)
      

	return (
		<>
            <section className="section-cta-7 background-body py-96">
                                    <div className="box-cta-6">
                                        <div className="container">
                                            <div className="row align-items-center">
                                                <div className="col-lg-6">
                                                    <div className="card-image d-inline-block position-relative mb-100">
                                                        <Image className="rounded-12"
                                                         src="/assets/imgs/cta/cta-9/luxury supercars.webp"
                                                         alt=" luxury supercars"
                                                         width={424}
                                                         height={453} 
                                                         loading="lazy"/>
                                                        <Image className="position-absolute top-100 start-100 translate-middle rounded-12 d-none d-md-block" 
                                                        src="/assets/imgs/cta/cta-9/luxury car hire dubai.webp"
                                                        alt="luxury car hire dubai"
                                                        width={294}
                                                        height={251} 
                                                        loading="lazy"/>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 ps-lg-5">
                                                    <Link className="btn btn-signin bg-2 text-dark mb-4" href="luxury-fleet">Our Values</Link>
                                                    <h3 className="custom-heading mb-4 neutral-1000">Offering Car Rental Services With Integrity & Honesty</h3>
                                                    <p className="text-lg-medium neutral-500 mb-4">
                                                        At Best Car Rental, we are proud to provide a reliable and excellent car rental service in Dubai. 
                                                        Our core values focus on delivering excellence to our customers. 
                                                        We ensure the highest standards and give our customers more than what they expect. Honesty, Transparency, and Integrity are the main weapons.
                                                         That’s the reason why thousands of customers trust our car rental company in Dubai. 
                                                         Besides, the constant feedback from the customers helps us improve and offer better services with time.
                                                          Here’s what sets us apart:

                                                    </p>
                                                    <div className="row">
                                                        <div className="col">
                                                            <ul className="list-ticks-green list-ticks-green-2">
                                                                <li className="neutral-1000 pe-0">Highly maintained vehicles ensure safety</li>
                                                                <li className="neutral-1000 pe-0">Transparent and affordable pricing structure<br/></li>
                                                                
                                                                <li className="neutral-1000 pe-0">Timely response and delivery </li>
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
                                </>
    );
};