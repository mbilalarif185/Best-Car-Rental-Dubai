
"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}
const FAQsSection: React.FC = () => {
  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: "Does any mileage limit apply while renting a car in Dubai?",
      answer:
        "Yes, all the luxury car rentals in Dubai apply a mileage limit of 250 km per day. However, if you have a more extended travel plan, you can ask us to increase the limit by paying extra charges. We can customize the plan, for example, by renting hours and mileage according to your requirements.",
    },
    {
      id: 2,
      question: "Can I park a luxury car for rent in Dubai anywhere?",
      answer:
       " You can park the vehicles from luxury car rental Dubai anywhere at the specific parking spots for rentals. In Dubai, parking spots are easily accessible for everyone, from the roadside to underground parking. However, as you are responsible for the car during rental hours, you will be paying the parking fine, if any.",
	},
    {
      id: 3,
      question:
        "How much is it to rent a luxury car in Dubai?",
      answer:
        "The average cost of luxury car rental in Dubai depends upon the brand, model, and rent duration. It can increase by adding extra customizations such as additional mileage. So, the prices range from AED300 to AED 10000 at Legendary Car Rental.",
	 },
    {
      id: 4,
      question:
        "How can I book a luxury car rental company in Dubai?",
      answer:
        "Legendary car rental in Dubai offers you a vast fleet of cars for rent. With thousands of satisfied customers, highly maintained vehicles, and affordable prices, it’s the best car rental in Dubai. So, to book a luxury car, reach out to us and make your booking online.",
	},
    {
      id: 5,
      question:
        "Is renting a luxury car in Dubai with a visit visa allowed?",
      answer:
        " You can book a luxury car rental in Dubai on a visit visa. However, you may need to go the extra mile for that: You must share a driving license, local or international.You might have to pay a security deposit. You must be over 21 and may purchase insurance to rent a luxury car in Dubai.",
   },
    {
      id: 6,
      question:
        "How to book a luxury car rental in Dubai with Legendary?",
      answer:
        "Legendary Car Rental offers you an easy online booking process. You need to explore our online platform and look for your favourite vehicle. After scrolling through different brands and finalizing the luxury car for rent in Dubai, you can go for a booking. To rent it, you can fill out the booking form or call us and contact us directly. We will let you know about the availability of the vehicle and book it for you if available. Once done, you must pay for the rent and get ready to enjoy a luxury ride. ",
	},
  ];

 const [isAccordion, setIsAccordion] = useState<number | null>(null);

  const handleAccordion = (id: number): void => {
    setIsAccordion((prev) => (prev === id ? null : id));
  };


  return (
    <section className="section-box box-faqs background-body pt-0">
      <div className="box-faqs-inner">
        <div className="container">
          <div className="text-center">
            <span className="text-sm-bold bg-2 p-3 rounded-12">Our Support</span>
            <h3 className="mt-4 neutral-1000">FAQs - Luxury Car Rental in Dubai</h3>
          </div>
          <div className="block-faqs">
            <div className="accordion" id="accordionFAQ">
              {faqItems.map((item) => (
                <div key={item.id} className="accordion-item wow fadeInUp border-bottom-0">
                  <h4
                    className="accordion-header"
                    id={`heading${item.id}`}
                    onClick={() => handleAccordion(item.id)}
                  >
                    <button
                      className={`accordion-button text-heading-5 ${isAccordion === item.id ? '' : 'collapsed'}`}
                      type="button"
                      aria-expanded={isAccordion === item.id}
                      aria-controls={`collapse${item.id}`}
                    >
                      <h3 className="custom-heading5">{`0${item.id}`}</h3>
                      <h4 >{item.question}</h4>
                    </button>
                  </h4>
                  <div
                    className={`accordion-collapse collapse ${isAccordion === item.id ? 'show' : ''}`}
                    id={`collapse${item.id}`}
                    aria-labelledby={`heading${item.id}`}
                    data-bs-parent="#accordionFAQ"
                  >
                    <div className="accordion-body">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="row">
            <div className="col-12 wow fadeInUp mt-4">
              <div className="d-flex justify-content-center gap-2">
                <Link className="btn btn-primary mt-2" href="/contact">
                  Contact Us
                  <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 15L15 8L8 1M15 8L1 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
                <Link className="btn btn-primary bg-transparent mt-2 invert" href="https://wa.me/971545514155"
				target='blank'
				rel="noopener noreferrer"
				>
                  Help Center
                  <svg width={16} height={16} viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 15L15 8L8 1M15 8L1 8"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQsSection;
