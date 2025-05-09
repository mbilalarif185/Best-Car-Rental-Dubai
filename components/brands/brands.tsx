import Link from "next/link";
import Image from "next/image";
import brands from "@/util/brands.json";
import cars from "@/util/cars.json";

const Brand = () => {
  return (
    <section className="box-section background-body py-96 border-bottom">
      <div className="container">
        <div className="row align-items-end">
          <div className="col-md-8">
            <h4 className="neutral-1000">Our Top Brands</h4>
            <p className="text-lg-medium neutral-500">Turning dreams into reality with luxury vehicles.</p>
          </div>
          <div className="col-md-4">
            <div className="d-flex justify-content-end mt-md-0 mt-4">
              <Link className="btn btn-primary rounded-3" href="/contact">
                Book Now
                <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="row mt-60">
          {brands.map((brand, index) => {
            const vehicleCount = cars.filter(car => car.brand.trim().toLowerCase() === brand.name.trim().toLowerCase()).length;

            return (
              <div className="col-lg-4 col-sm-6" key={index}>
                <div className="card-contact card-dealer d-flex">
                  <div className="card-image me-3">
                    <div className="position-relative">
                      <Image
                        src={brand.image}
                        alt={brand.name}
                        width={140}
                        height={120}
                      />
                    </div>
                  </div>
                  <div className="card-info">
                    <div className="card-title">
                      <Link className="title heading-6" href={`/luxury-brands/${brand.slug}`}>
                        {brand.name}
                      </Link>
                      <p className="text-md-medium neutral-500">{brand.name} for Rent in Dubai</p>
                    </div>
                    <div className="card-method-contact2">
                      <Link className="email text-xs-bold" href={`/luxury-brands/${brand.slug}`}>
                        {vehicleCount} Vehicle{vehicleCount !== 1 ? "s" : ""}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

       
      </div>
    </section>
  );
};

export default Brand;
