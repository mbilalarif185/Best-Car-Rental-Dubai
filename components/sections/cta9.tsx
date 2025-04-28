'use client'
import Link from "next/link"
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
                                                        <img className="rounded-12" src="/assets/imgs/cta/cta-9/img-1.png" alt="Carento" />
                                                        <a className="btn btn-play popup-youtube position-absolute top-50 start-50 translate-middle" onClick={() => setOpen(true)} />
                                                        <img className="position-absolute top-100 start-100 translate-middle rounded-12 d-none d-md-block" src="/assets/imgs/cta/cta-9/img-2.png" alt="Carento" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 ps-lg-5">
                                                    <Link className="btn btn-signin bg-2 text-dark mb-4" href="#">Our Commitment</Link>
                                                    <h4 className="mb-4 neutral-1000">Carento offers clear pricing and 24/7 great support.</h4>
                                                    <p className="text-lg-medium neutral-500 mb-4">We are committed to offering transparent pricing with no hidden fees, comprehensive insurance options for peace of mind, and 24/7 customer support to assist you whenever you need it. At Carento, your satisfaction is our top priority.</p>
                                                    <div className="row">
                                                        <div className="col">
                                                            <ul className="list-ticks-green list-ticks-green-2">
                                                                <li className="neutral-1000 pe-0">Explore a wide range of flexible rental options to suit your needs</li>
                                                                <li className="neutral-1000 pe-0">Comprehensive insurance coverage for complete peace of mind</li>
                                                                <li className="neutral-1000 pe-0">24/7 customer support for assistance anytime, anywhere</li>
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
                                </>
    );
};