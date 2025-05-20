import Link from "next/link";

export default function Cardinfo() {
  return (
    <section className="section-box background-body py-96">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-lg-6">
            <h2 className="neutral-1000">
              Comprehensive <span className="text-primary">Services by</span> Our Best Car Rental Dubai
            </h2>
          </div>
          <div className="col-lg-6">
            <p className="text-lg-medium neutral-500">
            The Best Car Rental Dubai offers you a comprehensive set of services, 
            from sleek luxury car rentals to chauffeur services and airport transfers.
             Whether you need to make an impression at any event with the latest model of a luxury sports car,
              we have something for you. Besides, we offer daily to monthly rental options to ensure your stay in Dubai is comfortable.
               Sedans for business trips to SUVs for desert adventures, we deal with your requirements carefully.
                So, rent a car in Dubai and enjoy your trip.
  
            </p>
          </div>
        </div>

        <div className="row mt-50">
          {services.map((service, index) => (
            <div key={index} className="col-lg-4 col-md-6">
              <div className="card-news background-card hover-up mb-24">
                <div className="card-image">
                  <img src={service.image} alt={service.title} />
                </div>
                <div className="card-info">
                  <div className="card-title mb-3">
                    <Link href={service.link} className="text-xl-bold neutral-1000">
                      {service.title}
                    </Link>
                    <p className="text-md-medium neutral-500 mt-2">{service.description}</p>
                  </div>
                  <div className="card-program">
                    <div className="endtime">
                      <div className="card-button">
                        <Link href={service.link} className="btn btn-primary2">
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    title: "Car Rental for Business",
    description: "Our luxury car rental in Dubai offers you high-end cars for rent, from luxury and sports to supercars, SUVs, Sedans, Coupes, and Hatchbacks.",
    image: "/assets/imgs/services/services-list-1/img-1.png",
    link: "/luxury-fleet",
  },
  {
    title: "Events and Wedding Car Rental",
    description: "Make a demanding entrance with event and wedding car hire services in Dubai. Choose from Rolls Royce, BMW, & others to rent a car in Dubai.",
    image: "/assets/imgs/services/services-list-1/img-2.png",
    link: "/luxury-brands",
  },
  {
    title: "Short-term Car Rental",
    description: "Rent a car for a day, hour, or even a week at the best car rental prices in Dubai. We offer flexibility and convenience for short trips or meetings.",
    image: "/assets/imgs/services/services-list-1/img-3.png",
    link: "/luxury-fleet",
  },
  {
    title: "Long-term Car Rental",
    description: "Our long-term solutions offer you monthly car rentals in Dubai, which are best for individual and business purposes. Enjoy cost-effective monthly rates.",
    image: "/assets/imgs/services/services-list-1/img-4.png",
    link: "/luxury-fleet",
  },
  {
    title: "Luxury Car Rental Dubai Airport",
    description: "Best Car Rental Dubai offers you the convenience of luxury car hire airport transfer, allowing you to have safe and secure rides to your destination.",
    image: "/assets/imgs/services/services-list-1/img-5.png",
    link: "/luxury-fleet",
  },
  {
    title: "Chauffeur Service Dubai",
    description: "Dependable and luxury chauffeur service in Dubai offering luxury cars with drivers for any event. Ensure your safety and make a lasting impression.",
    image: "/assets/imgs/services/services-list-1/img-5.png",
    link: "/luxury-brands",
  },
];
