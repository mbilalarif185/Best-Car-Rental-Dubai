'use client'
import Link from "next/link"
import { useState, useEffect } from 'react'
import ModalVideo from 'react-modal-video'

export default function Cta1() {
	const [isOpen, setOpen] = useState(false)

	useEffect(() => {
		const scriptId = "video-object-schema"
		if (document.getElementById(scriptId)) return
		const script = document.createElement('script')
		script.type = 'application/ld+json'
		script.id = scriptId
		script.innerHTML = JSON.stringify({
			"@context": "https://schema.org",
			"@type": "VideoObject",
			"name": "Luxury Car Rental Services",
			"description": "Watch how Best Car Rental offers Dubai's top-rated car rental services, 24/7 support, and luxury vehicles.",
			"thumbnailUrl": "https://bestcarrentaldubai.ae/assets/imgs/Best Cars/Mercedes-G63-for-rent.webp",
			"uploadDate": "2024-12-01",
			"contentUrl": "https://youtu.be/sl6Jtrx3FFQ?si=6CmFQwgj_sXMLpa-",
			"embedUrl":   "https://youtu.be/sl6Jtrx3FFQ?si=6CmFQwgj_sXMLpa-"
		})
		document.head.appendChild(script)
	}, [])

	return (
		<>
			<section className="box-cta-1 background-100 py-96">
				<div className="container">
					<div className="row align-items-center">
						<div className="col-lg-6 pe-lg-5 wow fadeInUp mt-12 ">
							<div className="card-video ">
								<div className="card-image ">
									<button
										className="btn btn-play popup-youtube"
										onClick={() => setOpen(true)}
										aria-label="Play Best Car Rental Dubai Video"
									/>

									<img src="/assets/imgs/Best Cars/Mercedes-G63-for-rent.webp" alt="Luxury Car Rental Dubai"
									title="rent a car dubai"
									loading="lazy"
									decoding="async" />
								</div>
							</div>
						</div>
						<div className="col-lg-6 mt-lg-0 mt-4">
							<span className="btn btn-signin bg-white text-dark mb-4 wow fadeInUp">Luxury Car Rental Dubai</span>
							<h3 className="mb-4 neutral-1000 wow fadeInUp">Skip the Search for “ Luxury Car Rental Near Me” & Choose Best</h3>
							<p className="text-lg-medium neutral-500 mb-4 wow fadeInUp">
								Give your hunt for luxury car rental in Dubai an end, because Best offers you versatile options. 
								As Dubai is a city of luxury and sophistication, you need something that complements your pride. 
								Transportation matters whether you go to a wedding or want to make a grand appearance. 
								Looking into these factors, Best Car Rental ensures you find the right option. 
								Here are some significant reasons that make us distinctive from our competitors:

							</p>
							<div className="row">
								<div className="col-md-6">
									<ul className="list-ticks-green wow fadeInUp">
										<li className="neutral-1000 wow fadeInUp" >Maintained Luxury Rental Cars</li>
										<li className="neutral-1000 wow fadeInUp" >100+ Cars for Rent Across Dubai</li>
										<li className="neutral-1000 wow fadeInUp" >Flexible Car Rental Plans</li>
									</ul>
								</div>
								<div className="col-md-6">
									<ul className="list-ticks-green wow fadeInUp">
										<li className="neutral-1000 wow fadeInUp" >Competitive Rental Prices									</li>
										<li className="neutral-1000 wow fadeInUp" >First-Class Customer Service
										</li>
										<li className="neutral-1000 wow fadeInUp">Free Pick-Up &amp; Drop-Off </li>
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
