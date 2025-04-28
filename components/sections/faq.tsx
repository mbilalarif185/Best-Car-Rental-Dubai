'use client'
import Link from "next/link"
import { useState } from 'react'
export default function Faq() {
    const [isOpen, setOpen] = useState(false)
	const [isAccordion, setIsAccordion] = useState(1)

	const handleAccordion = (key: any) => {
		setIsAccordion(prevState => prevState === key ? null : key)
	}
	return (
		<><section className="section-box box-faqs background-body pt-0">
						<div className="box-faqs-inner">
							<div className="container">
								<div className="text-center">
									<span className="text-sm-bold bg-2 p-3 rounded-12">Our Support</span>
									<h3 className="mt-4 neutral-1000">Frequently Asked Questions</h3>
								</div>
								<div className="block-faqs">
									<div className="accordion" id="accordionFAQ">
										<div className="accordion-item wow fadeInUp border-bottom-0">
											<h5 className="accordion-header" id="headingOne" onClick={() => handleAccordion(1)}>
												<button className={`accordion-button text-heading-5 ${isAccordion === 1 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
													<h3>01</h3>
													<p>How do I make a reservation on your website</p>
												</button>
											</h5>
											<div className={`accordion-collapse collapse ${isAccordion == 1 ? 'show' : ''} `} id="collapseOne" aria-labelledby="headingOne" data-bs-parent="#accordionFAQ">
												<div className="accordion-body">Provide a step-by-step guide on how users can browse and book travel services on your platform. Include information on searching for destinations, selecting dates, choosing accommodation, and completing the booking process. Mention any special features or tools that can help users find the best deals.</div>
											</div>
										</div>
										<div className="accordion-item wow fadeInUp border-bottom-0">
											<h5 className="accordion-header" id="headingTwo" onClick={() => handleAccordion(2)}>
												<button className={`accordion-button text-heading-5 ${isAccordion === 2 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
													<h3>02</h3>
													<p>What documents do I need for my trip, and how do I obtain them?</p>
												</button>
											</h5>
											<div className={`accordion-collapse collapse ${isAccordion == 2 ? 'show' : ''} `} id="collapseTwo" aria-labelledby="headingTwo" data-bs-parent="#accordionFAQ">
												<div className="accordion-body">Provide a step-by-step guide on how users can browse and book travel services on your platform. Include information on searching for destinations, selecting dates, choosing accommodation, and completing the booking process. Mention any special features or tools that can help users find the best deals.</div>
											</div>
										</div>
										<div className="accordion-item wow fadeInUp border-bottom-0">
											<h5 className="accordion-header" id="headingThree" onClick={() => handleAccordion(3)}>
												<button className={`accordion-button text-heading-5 ${isAccordion === 3 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
													<h3>03</h3>
													<p>In the event that I need to modify or cancel my reservation, what are the policies in place?</p>
												</button>
											</h5>
											<div className={`accordion-collapse collapse ${isAccordion == 3 ? 'show' : ''} `} id="collapseThree" aria-labelledby="headingThree" data-bs-parent="#accordionFAQ">
												<div className="accordion-body">Provide a step-by-step guide on how users can browse and book travel services on your platform. Include information on searching for destinations, selecting dates, choosing accommodation, and completing the booking process. Mention any special features or tools that can help users find the best deals.</div>
											</div>
										</div>
										<div className="accordion-item wow fadeInUp border-bottom-0">
											<h5 className="accordion-header" id="headingFour" onClick={() => handleAccordion(4)}>
												<button className={`accordion-button text-heading-5 ${isAccordion === 4 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
													<h3>04</h3>
													<p>Can you specify the types of credit/debit cards, digital wallets, or other online payment methods accepted?</p>
												</button>
											</h5>
											<div className={`accordion-collapse collapse ${isAccordion == 4 ? 'show' : ''} `} id="collapseFour" aria-labelledby="headingFour" data-bs-parent="#accordionFAQ">
												<div className="accordion-body">Provide a step-by-step guide on how users can browse and book travel services on your platform. Include information on searching for destinations, selecting dates, choosing accommodation, and completing the booking process. Mention any special features or tools that can help users find the best deals.</div>
											</div>
										</div>
										<div className="accordion-item wow fadeInUp border-bottom-0">
											<h5 className="accordion-header" id="headingFive" onClick={() => handleAccordion(5)}>
												<button className={`accordion-button text-heading-5 ${isAccordion === 5 ? 'collapsed' : ''}`} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
													<h3>05</h3>
													<p>What are the working hours, and what can I expect in terms of response times?</p>
												</button>
											</h5>
											<div className={`accordion-collapse collapse ${isAccordion == 5 ? 'show' : ''} `} id="collapseFive" aria-labelledby="headingFive" data-bs-parent="#accordionFAQ">
												<div className="accordion-body">Provide a step-by-step guide on how users can browse and book travel services on your platform. Include information on searching for destinations, selecting dates, choosing accommodation, and completing the booking process. Mention any special features or tools that can help users find the best deals.</div>
											</div>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-12 wow fadeInUp mt-4">
										<div className="d-flex justify-content-center gap-2">
											<Link className="btn btn-primary mt-2" href="#">
												Contact Us
												<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</Link>
											<Link className="btn btn-primary bg-transparent mt-2 invert" href="#">
												Help Center
												<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
					</>
    );
};