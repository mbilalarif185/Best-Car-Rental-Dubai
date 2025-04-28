import Link from "next/link";

export default function Cardinfo() {
  return (
    <section className="section-box background-body py-96">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-lg-7">
            <h3 className="neutral-1000">
              Comprehensive <span className="text-primary">Car Rental</span> Services to Meet All Your Needs
            </h3>
          </div>
          <div className="col-lg-5">
            <p className="text-lg-medium neutral-500">
              From daily rentals to long-term solutions, we offer a comprehensive range of vehicles and services to suit every need and budget.
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
    title: "Car Rental With Driver",
    description: "Flexible rental options available for both short-term and weekly needs, ideal for vacations or business trips.",
    image: "/assets/imgs/services/services-list-1/img-1.png",
    link: "/blog-details",
  },
  {
    title: "Long-Term Rentals",
    description: "Convenient and cost-effective solutions for those needing a vehicle for an extended period, with discounted rates.",
    image: "/assets/imgs/services/services-list-1/img-2.png",
    link: "/blog-details",
  },
  {
    title: "Luxury Car Rentals",
    description: "Drive in style with our selection of high-end vehicles, perfect for special occasions or executive travel.",
    image: "/assets/imgs/services/services-list-1/img-3.png",
    link: "/blog-details",
  },
  {
    title: "VIP Transfer Services",
    description: "Flexible rental options available for both short-term and weekly needs, ideal for vacations or business trips.",
    image: "/assets/imgs/services/services-list-1/img-4.png",
    link: "/blog-details",
  },
  {
    title: "Chauffeur Services",
    description: "Flexible rental options available for both short-term and weekly needs, ideal for vacations or business trips.",
    image: "/assets/imgs/services/services-list-1/img-5.png",
    link: "/blog-details",
  },
];
