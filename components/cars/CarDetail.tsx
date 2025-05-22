'use client'
import MyDatePicker from '@/components/elements/MyDatePicker'
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useState } from 'react'
import { Car } from '@/types/detail_type'

type CarDetailProps = {
  car: Car
}

export default function CarDetail({ car }: CarDetailProps) {
	const [isAccordion, setIsAccordion] = useState(null)

	const handleAccordion = (key: any) => {
		setIsAccordion(prevState => prevState === key ? null : key)
	}
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        contact: '',
        pickupDate: '',
        dropoffDate: '',
        pickupLocation: '',
        dropoffLocation: ''
      });
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
      };
    
      const handleDateChange = (name: string, date: Date | null): void => {
        setFormData(prev => ({
          ...prev,
          [name]: date ? date.toISOString().split('T')[0] : '', // Format date to 'YYYY-MM-DD'
        }));
      };
      
      
      const [message, setMessage] = useState('');
		const [status, setStatus] = useState<'success' | 'error' | ''>('');
		const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			const res = await fetch('/api/sendBookingEmail', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
			});

			const result = await res.json();

			if (res.ok) {
			 setStatus('success');
      		setMessage('Your booking request has been submitted.');
			} else {
			 setStatus('error');
     		 setMessage('Failed to send booking. Please try again.');
			}
		} catch (error) {
			 setStatus('error');
    			setMessage('Something went wrong. Try again later.');
		}
		};


      
	return (
		<>

				<div>
					<section className="box-section box-breadcrumb background-body">
						<div className="container">
							<ul className="breadcrumbs">
								<li>
									<Link href="/">Home</Link>
									<span className="arrow-right">
										<svg width={7} height={12} viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M1 11L6 6L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</span>
								</li>
								<li>
									<Link href="/luxury-fleet">Cars</Link>
									<span className="arrow-right">
										<svg width={7} height={12} viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
											<path d="M1 11L6 6L1 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
										</svg>
									</span>
								</li>
								<li><span className="text-breadcrumb">{car.name}</span></li>
							</ul>
						</div>
					</section>
					<section className="box-section box-content-tour-detail background-body">
						<div className="container">
							<div className="tour-header">
								<div className="tour-rate">
									<div className="rate-element">
										<span className="rating">{car.rating} <span className="text-sm-medium neutral-500">({car.reviews} reviews)</span></span>
									</div>
								</div>
								<div className="row">
									<div className="col-lg-12">
										<div className="tour-title-main">
											<h1 className="neutral-1000 custom-h1">{car.title || car.name}</h1>
										</div>
									</div>
								</div>
								
							</div>
							<div className="box-section box-banner-property-detail background-body">
								<div className="position-relative">
									<div className="block-banner-property-detail container-banner-activities">
										<div className="row g-3">
											<div className="col-lg-7">
												<div className="position-relative rounded-12 overflow-hidden">
													<img src={car.image} 
                                                     alt={`${car.name} For Rent in Dubai`}
                                                     title={`Rent ${car.name} in Dubai`}
                                                     loading="lazy"
                                                     decoding="async" />
													
												</div>
											</div>
											<div className="col-lg-5">
												<div className="d-flex gap-3">
													<div className="d-flex gap-3 flex-column w-100">
														<div className="rounded-12 overflow-hidden w-100 luxuryimage">
                                                            <img className="w-100 h-100 object-fit-cover" src={car.image2}
                                                             alt={`${car.name} For Rent in Dubai`}
                                                             title={`Rent ${car.name} in Dubai`}
                                                             loading="lazy"
                                                             decoding="async"
                                                              />
                                                            </div>
														<div className="rounded-12 overflow-hidden w-100  luxuryimage"
                                                        ><img className="w-100 h-100 object-fit-cover" src={car.image3 || car.image2}
                                                         alt={`${car.name} For Rent in Dubai`}
                                                         title={`Rent ${car.name} in Dubai`}
                                                         loading="lazy"
                                                         decoding="async"
                                                        />
                                                        </div>
													</div>
													<div className="d-flex gap-3 flex-column w-100 ">
														<div className="rounded-12 overflow-hidden w-100 luxuryimage ">
                                                            <img className="w-100 h-100 object-fit-cover" src={car.image4|| car.image}
                                                         alt={`${car.name} For Rent in Dubai`}
                                                         title={`Rent ${car.name} in Dubai`}
                                                         loading="lazy"
                                                         decoding="async" /></div>
														<div className="rounded-12 overflow-hidden w-100 luxuryimage"
                                                        ><img className="w-100 h-100 object-fit-cover" src={car.image5|| car.image
                                                            
                                                        }
                                                         alt={`${car.name} For Rent in Dubai`}
                                                         title={`Rent ${car.name} in Dubai`}
                                                         loading="lazy"
                                                         decoding="async"
                                                          /></div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className="row mt-30">
								<div className="col-lg-8 mb-4">
									<div className="box-feature-car">
										<div className="list-feature-car">
											<div className="item-feature-car w-md-25">
												<div className="item-feature-car-inner">
													<div className="feature-image"><img src="/assets/imgs/page/car/km.svg" 
                                                     alt={`${car.name} For Rent in Dubai`}
                                                     title={`Rent ${car.name} in Dubai`}
                                                     loading="lazy"
                                                     decoding="async"
                                                      /></div>
													<div className="feature-info">
														<p className="text-md-medium neutral-1000">{car.brand.split(" ").slice(0, 2).join(" ")}</p>
													</div>
												</div>
											</div>
											<div className="item-feature-car w-md-25">
												<div className="item-feature-car-inner">
													<div className="feature-image"><img src="/assets/imgs/page/car/diesel.svg"
                                                     alt={`${car.name} For Rent in Dubai`}
                                                     title={`Rent ${car.name} in Dubai`}
                                                     loading="lazy"
                                                     decoding="async"
                                                     /></div>
													<div className="feature-info">
														<p className="text-md-medium neutral-1000">{car.fuel}</p>
													</div>
												</div>
											</div>
											<div className="item-feature-car w-md-25">
												<div className="item-feature-car-inner">
													<div className="feature-image"><img src="/assets/imgs/page/car/auto.svg" 
                                                     alt={`${car.name} For Rent in Dubai`}
                                                     title={`Rent ${car.name} in Dubai`}
                                                     loading="lazy"
                                                     decoding="async"
                                                      /></div>
													<div className="feature-info">
														<p className="text-md-medium neutral-1000">{car.gear}</p>
													</div>
												</div>
											</div>
											<div className="item-feature-car w-md-25">
												<div className="item-feature-car-inner">
													<div className="feature-image"><img src="/assets/imgs/page/car/seat.svg" 
                                                     alt={`${car.name} For Rent in Dubai`}
                                                     title={`Rent ${car.name} in Dubai`}
                                                     loading="lazy"
                                                     decoding="async"
                                                      /></div>
													<div className="feature-info">
														<p className="text-md-medium neutral-1000">{car.seats} Seats</p>
													</div>
												</div>
											</div>
											<div className="item-feature-car w-md-25">
												<div className="item-feature-car-inner">
													<div className="feature-image"><img src="/assets/imgs/page/car/bag.svg" 
                                                     alt={`${car.name} For Rent in Dubai`}
                                                     title={`Rent ${car.name} in Dubai`}
                                                     loading="lazy"
                                                     decoding="async" /></div>
													<div className="feature-info">
														<p className="text-md-medium neutral-1000">3 Large bags</p>
													</div>
												</div>
											</div>
											<div className="item-feature-car w-md-25">
												<div className="item-feature-car-inner">
													<div className="feature-image"><img src="/assets/imgs/page/car/suv.svg" 
                                                     alt={`${car.name} For Rent in Dubai`}
                                                     title={`Rent ${car.name} in Dubai`}
                                                     loading="lazy"
                                                     decoding="async" /></div>
													<div className="feature-info">
														<p className="text-md-medium neutral-1000">{car.type}</p>
													</div>
												</div>
											</div>
											<div className="item-feature-car w-md-25">
												<div className="item-feature-car-inner">
													<div className="feature-image"><img src="/assets/imgs/page/car/door.svg" 
                                                     alt={`${car.name} For Rent in Dubai`}
                                                     title={`Rent ${car.name} in Dubai`}
                                                     loading="lazy"
                                                     decoding="async" /></div>
													<div className="feature-info">
														<p className="card-miles text-md-medium">{car.doors} Doors</p>
													</div>
												</div>
											</div>
											<div className="item-feature-car w-md-25">
												<div className="item-feature-car-inner">
													<div className="feature-image"><img src="/assets/imgs/page/car/lit.svg" 
                                                     alt={`${car.name} For Rent in Dubai`}
                                                     title={`Rent ${car.name} in Dubai`}
                                                     loading="lazy"
                                                     decoding="async"
                                                      /></div>
													<div className="feature-info">
														<p className="text-md-medium neutral-1000">2.5L</p>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="box-collapse-expand">
										<div className="group-collapse-expand">
											<button className={isAccordion == 1 ? "btn btn-collapse collapsed" : "btn btn-collapse"} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOverview" aria-expanded="false" aria-controls="collapseOverview" onClick={() => handleAccordion(1)}>
												{car.Sk ? (
														<h2 className='custom-heading5' dangerouslySetInnerHTML={{ __html: car.Sk }} />
													):(
														<h2 className='custom-heading5'>{car.name} Rental Dubai</h2>
													)}
												
												<svg width={12} height={7} viewBox="0 0 12 7" xmlns="http://www.w3.org/2000/svg">
													<path d="M1 1L6 6L11 1" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
												</svg>
											</button>
											<div className={isAccordion == 1 ? "collapse" : "collapse show"} id="collapseOverview">
												<div className="card card-body" >
													{car.description ? (
													<p dangerouslySetInnerHTML={{ __html: car.description }} />
													) : (
													<p>Best Car Rental Dubai Provides luxury cars on reasonable price. You can explore our <Link href="/luxury-fleet" className='custom-color'>luxury fleet</Link> </p>
													)}
													<ul className='mb-4' >
													{car.features2?.map((feature, index) => {
														const [title, desc] = feature.split(":");
														return (
														<li key={index}>
															<strong>{title}:</strong>{desc}
														</li>
														);
													})}
													</ul>
													{car.title2 ? (
														<h3 className='custom-heading5 mb-2' dangerouslySetInnerHTML={{ __html: car.title2 }} />
													):(
														<h3 className='custom-heading5 mb-2'>Well Defined Technology of {car.name}</h3>
													)}
													{car.description2 ? (
													<p dangerouslySetInnerHTML={{ __html: car.description2 }} />
													) : (
													<p>Best Car Rental Dubai Provides luxury cars on reasonable price. You can explore our <Link href="/luxury-fleet" className='custom-color'>luxury fleet</Link> </p>
													)}
													<ul className='mb-4 custom-ol' >
													{car.features3?.map((feature, index) => {
														const [title, desc] = feature.split(":");
														return (
														<li key={index}>
															<strong>{title}:{desc}</strong>
														</li>
														);
													})}
													</ul>
													<div className="card card-body">
												<ul className="list-checked-green">
													{car.features1?.map((feature, index) => (
													<li key={index}>{feature}</li>
													))}
												</ul>
												</div>
												{car.title3 ? (
														<h4 className='custom-heading5 mb-2' dangerouslySetInnerHTML={{ __html: car.title3 }} />
													):(
														<h4 className='custom-heading5 mb-2'>Rent a {car.name} in Dubai</h4>
													)}
													{car.description3 ? (
													<p dangerouslySetInnerHTML={{ __html: car.description3 }} />
													) : (
													<p>You can rent a luxury car from us we provide different services. Explore  <Link href="/services" className='custom-color'>Our Luxury Services</Link> </p>
													)}
													{car.title4 && (
														<h4 className='custom-heading5 mb-2' dangerouslySetInnerHTML={{ __html: car.title4 }} />
													)}
													{car.description4 && (
													<p dangerouslySetInnerHTML={{ __html: car.description4 }} />
													)}
													{/* {car.title5 ? (
														<h4 className='custom-heading5 mb-2' dangerouslySetInnerHTML={{ __html: car.title5 }} />
													):(
														<h4></h4>	
													)} */}
													{car.title5 && (
														<h4 className="custom-heading5 mb-2" dangerouslySetInnerHTML={{ __html: car.title5 }} />
													)}

													{car.description5 && (
													<p dangerouslySetInnerHTML={{ __html: car.description5 }} />
													)}
													{car.title6 && (
														<h4 className="custom-heading5 mb-2" dangerouslySetInnerHTML={{ __html: car.title6 }} />
													)}

													{car.description6 && (
													<p dangerouslySetInnerHTML={{ __html: car.description6 }} />
													)}
													{car.title7 && (
														<h4 className="custom-heading5 mb-2" dangerouslySetInnerHTML={{ __html: car.title7 }} />
													)}

													{car.description7 && (
													<p dangerouslySetInnerHTML={{ __html: car.description7 }} />
													)}
													{car.title8 && (
														<h4 className="custom-heading5 mb-2" dangerouslySetInnerHTML={{ __html: car.title8 }} />
													)}

													{car.description8 && (
													<p dangerouslySetInnerHTML={{ __html: car.description8 }} />
													)}
												</div>
											</div>

										</div>
										
										<div className="group-collapse-expand">
										<button
											className={`btn btn-collapse ${isAccordion === 2 ? "" : "collapsed"}`}
											type="button"
											data-bs-toggle="collapse"
											data-bs-target="#collapseItinerary"
											aria-expanded={isAccordion === 2 ? "true" : "false"}
											aria-controls="collapseItinerary"
											onClick={() => handleAccordion(2)}
										>
											{car.titlef ? (
											<h3 className="custom-heading5 mb-2" dangerouslySetInnerHTML={{ __html: car.titlef }} />
											) : (
											<h3 className="custom-heading5 mb-2">Included in the price</h3>
											)}
											<svg width={12} height={7} viewBox="0 0 12 7" xmlns="http://www.w3.org/2000/svg">
											<path d="M1 1L6 6L11 1" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
											</svg>
										</button>

										<div className={isAccordion === 2 ? "collapse show" : "collapse"} id="collapseItinerary">
											<div className="card card-body">
											<ul className="list-checked-green">
												{car.features?.map((feature, index) => (
												<li key={index}>{feature}</li>
												))}
											</ul>
											</div>
										</div>
										</div>

										<div className="group-collapse-expand">
											<button
												className={`btn btn-collapse ${isAccordion === 3 ? "" : "collapsed"}`}
												type="button"
												data-bs-toggle="collapse"
												data-bs-target="#collapseQuestion"
												aria-expanded={isAccordion === 3 ? "true" : "false"}
												aria-controls="collapseQuestion"
												onClick={() => handleAccordion(3)}
											>
												<h6>Question Answers</h6>
												<svg width={12} height={7} viewBox="0 0 12 7" xmlns="http://www.w3.org/2000/svg">
												<path d="M1 1L6 6L11 1" stroke="" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
												</svg>
											</button>

											<div className={isAccordion === 3 ? "collapse show" : "collapse"} id="collapseQuestion">
												
												{Array.isArray(car.faqs) && car.faqs.length > 0 && (
												<div className="card card-body">
													<div className="list-questions">
													{car.faqs.map((faq, index) => (
														<div className="item-question" key={index}>
														<div className="head-question">
															<p className="text-md-bold neutral-1000">{faq.question}</p>
														</div>
														<div className="content-question">
															<div className="text-sm-medium neutral-800" dangerouslySetInnerHTML={{ __html: faq.answer }} />

														</div>
														</div>
													))}
													</div>
												</div>
												)}



											</div>
										</div>
										
										
									</div>
								</div>
								<div className="col-lg-4">
									<div className="sidebar-banner">
										<div className="p-4 background-body border rounded-3">
											<p className="text-xl-bold neutral-1000 mb-4">Get Started</p>
											<p className="btn btn-book w-100 rounded-3  mb-3 p-2">
												Rental Price: {car.price} AED  
												<span className="text-lg-medium neutral-1000"> /day</span>
											</p>
											<Link href="https://wa.me/971545514155" className="btn btn-primary w-100 rounded-3  mb-3">
												Get Your Luxury Car Now
												<svg width={17} height={16} viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M8.5 15L15.5 8L8.5 1M15.5 8L1.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
												
											</Link>
											
										</div>
									</div>
									<div className="booking-form">
										<div className="head-booking-form">
											<p className="text-xl-bold neutral-1000">Rent This Vehicle</p>
										</div>
                                        
                                        <form onSubmit={handleSubmit}>
                                                <div className="content-booking-form">
                                                   
                                                    <div className="item-line-booking border-bottom-0">
                                                    <label htmlFor="name" className="text-md-bold neutral-1000">Name</label>
                                                    <div className="input-calendar">
                                                        <input
                                                        id="name"
                                                        name="name"
                                                        type="text"
                                                        placeholder="Enter Your Name"
                                                        className="form-control"
                                                        required
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        />
                                                    </div>
                                                    </div>

                                                    <div className="item-line-booking">
                                                    <label htmlFor="email" className="text-md-bold neutral-1000">Email</label>
                                                    <div className="input-calendar">
                                                        <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        placeholder="Enter Your Email"
                                                        className="form-control"
                                                        required
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        />
                                                    </div>
                                                    </div>

                                                    {/* Contact */}
                                                    <div className="item-line-booking">
                                                    <label htmlFor="contact" className="text-md-bold neutral-1000">Contact No</label>
                                                    <div className="input-calendar">
                                                        <input
                                                        id="contact"
                                                        name="contact"
                                                        type="tel"
                                                        placeholder="Enter Your Contact No"
                                                        className="form-control"
                                                        required
                                                        pattern="^[0-9+\s()\-]{7,15}$"
                                                        value={formData.contact}
                                                        onChange={handleChange}
                                                        />
                                                    </div>
                                                    </div>

                                                    {/* Pick-Up Date */}
                                                    <div className="item-line-booking border-bottom-0 pb-0">
                                                    <label htmlFor="pickup-date" className="text-md-bold neutral-1000">Pick-Up</label>
                                                    <div className="input-calendar">
                                                        <MyDatePicker id="pickup-date" value={formData.pickupDate} onChange={(date) => handleDateChange('pickupDate', date)} required />
                                                    </div>
                                                    </div>

                                                    {/* Drop-Off Date */}
                                                    <div className="item-line-booking">
                                                        <label htmlFor="dropoff-date" className="text-md-bold neutral-1000">Drop-Off</label>
                                                        <div className="input-calendar">
                                                            <MyDatePicker 
                                                            id="dropoff-date" 
                                                            value={formData.dropoffDate} 
                                                            onChange={(date: Date | null) => handleDateChange('dropoffDate', date)} 
                                                            required 
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* Pick-Up Location */}
                                                    <div className="item-line-booking border-bottom-0">
                                                    <label htmlFor="pickupLocation" className="text-md-bold neutral-1000">Pick-Up Location</label>
                                                    <div className="input-calendar box-calendar-date">
                                                        <select
                                                        id="pickupLocation"
                                                        name="pickupLocation"
                                                        className="form-control"
                                                        required
                                                        value={formData.pickupLocation}
                                                        onChange={handleChange}
                                                        >
                                                        <option value="">Select pick-up location</option>
                                                        <option value="dubai">Dubai</option>
                                                        <option value="bur-dubai">Bur Dubai</option>
                                                        <option value="deira">Deira</option>
                                                        <option value="jvc">JVC</option>
                                                        <option value="palm-jumeriah">Palm Jumeriah</option>
                                                        </select>
                                                    </div>
                                                    </div>

                                                    {/* Drop-Off Location */}
                                                    <div className="item-line-booking border-bottom-0">
                                                    <label htmlFor="dropoffLocation" className="text-md-bold neutral-1000">Drop-Off Location</label>
                                                    <div className="input-calendar box-calendar-date">
                                                        <select
                                                        id="dropoffLocation"
                                                        name="dropoffLocation"
                                                        className="form-control"
                                                        required
                                                        value={formData.dropoffLocation}
                                                        onChange={handleChange}
                                                        >
                                                        <option value="">Select drop-off location</option>
                                                        <option value="drop-dubai">Dubai</option>
                                                        <option value="drop-bur-dubai">Bur Dubai</option>
                                                        <option value="drop-deira">Deira</option>
                                                        <option value="drop-jvc">JVC</option>
                                                        <option value="drop-palm-jumeriah">Palm Jumeriah</option>
                                                        </select>
                                                    </div>
                                                    </div>

                                                    {/* Submit Button */}
                                                    <div className="box-button-book">
                                                    <button type="submit" className="btn btn-book">
                                                        Book Now
                                                    </button>
                                                    </div>
                                                </div>
												{message && (
											<div className={status === 'success' ? 'form-message-success' : 'form-message-error'}>
											
												{message}
											</div>
											)}
                                        </form>	

									</div>
                                    
									<div className="sidebar-left border-1 background-card">
										<h6 className="text-xl-bold neutral-1000">Listed by</h6>
										<div className="box-sidebar-content">
											<div className="box-agent-support border-bottom pb-3 mb-3">
												<div className="card-author">
													<div className="me-2"><img src="/assets/imgs/template/logo.png" alt="Best Car Rental Dubai" /></div>
													<div className="card-author-info">
														<p className="text-lg-bold neutral-1000">Legendary Car Rental Dubai</p>
														<p className="text-sm-medium neutral-500">Dubai - United Arab Emirates</p>
													</div>
												</div>
											</div>
											<div className="box-info-contact">

												<p className="text-md-medium mobile-phone neutral-1000"><span className="text-md-bold">Mobile:</span>
                                                {''}
                                                <a
                                                        href="tel:971545514155"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-md-medium whatsapp-link"
                                                    >
                                                        +971 54 551 4155
                                                    </a></p>
												<p className="text-md-medium email neutral-1000"><span className="text-md-bold">Email:</span> info@bestcarrentaldubai.ae</p>
												{/* <p className="text-md-medium whatsapp neutral-1000"><span className="text-md-bold">WhatsApp:</span> +971 54 551 4155</p> */}
												<p className="text-md-medium whatsapp neutral-1000">
                                                    <span className="text-md-bold">WhatsApp:</span>{' '}
                                                    <a
                                                        href="https://wa.me/971545514155"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-md-medium whatsapp-link"
                                                    >
                                                        +971 54 551 4155
                                                    </a>
                                                    </p>

											</div>
											<div className="box-link-bottom">
												<Link className="btn btn-primary py-3 w-100 rounded-3" href="/luxury-fleet">
													All items by this dealer
													<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
														<path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
													</svg>
												</Link>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						
					</section>
					
				</div>

			
		</>
	)
}