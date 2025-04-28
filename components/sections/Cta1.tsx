'use client'
import Link from "next/link"
import { useState, useEffect } from 'react'
import ModalVideo from 'react-modal-video'

export default function Cta1() {
	const [isOpen, setOpen] = useState(false)

	// Inject VideoObject schema for SEO
	useEffect(() => {
		const scriptId = "video-object-schema"
		if (document.getElementById(scriptId)) return
		const script = document.createElement('script')
		script.type = 'application/ld+json'
		script.innerHTML = JSON.stringify({
			"@context": "https://schema.org",
			"@type": "VideoObject",
			"name": "Luxury Car Rental Services",
			"description": "Watch how Legendary Car Rental offers Dubai's top-rated car rental services, 24/7 support, and luxury vehicles.",
			"thumbnailUrl": "/assets/imgs/Legendary Cars/Mercedes-G63-for-rent.webp",
			"uploadDate": "2024-12-01",
			"contentUrl": "https://youtu.be/sl6Jtrx3FFQ?si=6CmFQwgj_sXMLpa-",
			"embedUrl": "  https://youtu.be/sl6Jtrx3FFQ?si=6CmFQwgj_sXMLpa-"
		})
		document.head.appendChild(script)
	}, [])

	return (
		<>
			<section className="box-cta-1 background-100 py-96">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6 pe-lg-5 wow fadeInUp">
							<div className="card-video">
								<div className="card-image">
									<button
										className="btn btn-play popup-youtube"
										onClick={() => setOpen(true)}
										aria-label="Play Legendary Car Rental Dubai Video"
									/>

									<img src="/assets/imgs/Legendary Cars/Mercedes-G63-for-rent.webp" alt="Luxury Car Rental Dubai"
									title=""
									loading="lazy"
									decoding="async" />
								</div>
							</div>
						</div>
						<div className="col-lg-6 mt-lg-0 mt-4">
							<span className="btn btn-signin bg-white text-dark mb-4 wow fadeInUp">Luxury Car Rental Dubai</span>
							<h4 className="mb-4 neutral-1000 wow fadeInUp">Receive a Competitive Offer Sell Your Car to Us Today.</h4>
							<p className="text-lg-medium neutral-500 mb-4 wow fadeInUp">
								We are committed to delivering exceptional service, competitive pricing, and a diverse selection of options for our customers.
							</p>
							<div className="row">
								<div className="col-md-6">
									<ul className="list-ticks-green">
										<li className="neutral-1000 wow fadeInUp" data-wow-delay="0.1s">Expert Certified Mechanics</li>
										<li className="neutral-1000 wow fadeInUp" data-wow-delay="0.2s">Get Reasonable Price</li>
										<li className="neutral-1000 wow fadeInUp" data-wow-delay="0.3s">Genuine Spares Parts</li>
									</ul>
								</div>
								<div className="col-md-6">
									<ul className="list-ticks-green wow fadeInUp">
										<li className="neutral-1000 wow fadeInUp" data-wow-delay="0.1s">First Class Services</li>
										<li className="neutral-1000 wow fadeInUp" data-wow-delay="0.2s">24/7 road assistance</li>
										<li className="neutral-1000 wow fadeInUp" data-wow-delay="0.3s">Free Pick-Up &amp; Drop-Offs</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<ModalVideo
				channel='youtube'
				isOpen={isOpen}
				videoId="sl6Jtrx3FFQ"
				onClose={() => setOpen(false)}
			/>
		</>
	)
}
