
import Link from "next/link"

type Category = {
  name: string
  image: string
  count: number
  delay?: string
}

type Props = {
  categories: Category[]
}

export default function Categories1({ categories }: Props) {
  return (
    <section className="section-box background-body py-96">
      <div className="container">
        <div className="row align-items-end mb-40">
          <div className="col-md-8">
            <h3 className="neutral-1000 wow fadeInUp">Explore Our Luxury Car Rental Categories </h3>
            <p className="text-xl-medium neutral-500 wow fadeInUp">Book Your Luxury Car Now</p>
          </div>
          <div className="col-md-4">
            <div className="d-flex justify-content-md-end mt-md-0 mt-4">
              <Link className="btn btn-primary wow fadeInUp" href="/cars-list-1">
                Book Now
                <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="box-list-populars">
          <div className="row">
            {categories.map((cat, index) => (
              <div className="col-lg-4 col-sm-6" key={cat.name}>
                <div
                  className="card-popular background-card hover-up wow fadeIn"
                  data-wow-delay={cat.delay || `${0.1 * ((index % 4) + 1)}s`}
                >
                  <div className="card-image">
                    <Link className="card-title" href="/cars-list-1">
                      <img src={cat.image} alt={cat.name} />
                    </Link>
                  </div>
                  <div className="card-info">
                    <Link className="card-title" href="/cars-list-1">{cat.name}</Link>
                    <div className="card-meta">
                      <div className="meta-links">
                        <Link href="/cars-list-1">{cat.count} Vehicles</Link>
                      </div>
                      <div className="card-button">
                        <Link href="/cars-list-1">
                          <svg width={10} height={10} viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.00011 9.08347L9.08347 5.00011L5.00011 0.916748M9.08347 5.00011L0.916748 5.00011" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
