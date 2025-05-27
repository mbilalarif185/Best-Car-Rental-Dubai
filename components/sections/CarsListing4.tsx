import Link from "next/link";
import { Car } from "@/types/type";
import categories from '@/util/categories.json';
import brands from '@/util/brands.json'; 
const BASE_URL = "https://bestcarrentaldubai.ae";

interface CarsListing4Props {
  cars: Car[];
  categorySlug?: string;
  brandSlug?: string;
}

const CarsListing4: React.FC<CarsListing4Props> = ({ cars, categorySlug, brandSlug }) => {
 
  const categoryInfo = categorySlug
    ? categories.find(cat => cat.slug.trim().toLowerCase() === categorySlug.trim().toLowerCase())
    : null;

  // Resolve brand info if present
  const brandInfo = brandSlug
    ? brands.find(brand => brand.slug.trim().toLowerCase() === brandSlug.trim().toLowerCase())
    : null;

  // Decide heading/description based on priority: brand > category
  const heading = brandInfo?.name || categoryInfo?.heading || "Featured Listings";
  const description = brandInfo
    ? `Explore our selection of ${brandInfo.name.trim()} vehicles for rent in Dubai`
    : categoryInfo?.description || "Find the perfect ride for any occasion";

  return (
    <section className="section-box box-flights background-body">
      <div className="container">
        <div className="row align-items-end text-center">
          <div className="col-md-12 ">
            <h3 className="neutral-1000 mb-4">{heading}</h3>
            <p className="text-lg-medium neutral-500 mb-4">{description}</p>
          </div>
        </div>
        <div className="row pt-30">
          {cars.map((car, index) => (
            <div className="col-lg-4 col-md-6 wow fadeIn" key={car.slug} data-wow-delay={`0.${index + 1}s`}>
              <div className="card-journey-small background-card hover-up">
                <div className="card-image">
                  <Link aria-label={`Rent ${car.name}`} href={`/cars/${car.slug}`}>
                    <img src={`${BASE_URL}${car.image}`} alt={`Rent ${car.name} in ${car.location}`} title={`${car.name} For Rent in Dubai - Luxury Car Rental Dubai`} loading="lazy" decoding="async" />
                  </Link>
                </div>
                <div className="card-info p-4 pt-30">
                  <div className="card-rating">
                    <div className="card-left" />
                    <div className="card-right">
                      <span className="rating text-xs-medium py-1 rounded-pill">
                        {car.rating} <span className="text-xs-medium neutral-500">({car.reviews} reviews)</span>
                      </span>
                    </div>
                  </div>
                  <div className="card-title">
                    <Link className="text-lg-bold neutral-1000 text-nowrap" aria-label={`Rent ${car.name}`} href={`/cars/${car.slug}`}>
                      {car.name}
                    </Link>
                  </div>
                  <div className="card-program">
                    <div className="card-location">
                      <p className="text-location text-sm-medium neutral-500">{car.location}</p>
                    </div>
                    <div className="card-facitlities">
                      <p className="card-miles text-md-medium">{car.doors} Doors</p>
                      <p className="card-gear text-md-medium">{car.gear}</p>
                      <p className="card-fuel text-md-medium">{car.fuel}</p>
                      <p className="card-seat text-md-medium">{car.seats} Seats</p>
                    </div>
                    <div className="endtime">
                      <div className="card-price">
                        <h6 className="text-lg-bold neutral-1000"> AED {car.price}</h6>
                      </div>
                      <div className="card-button">
                        <Link className="btn btn-gray" aria-label={`Rent ${car.name}`} href={`/cars/${car.slug}`}>Book Now</Link>
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
};

export default CarsListing4;

