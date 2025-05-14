
import Link from "next/link"
import Image from "next/image"

type Category = {
  name: string
  image: string
  bannerimage:string
  count: number
  slug:string
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
            <h2 className="custom-h2 neutral-1000 wow fadeInUp mb-4">
              Select from the Categories to Rent a Luxury Car in Dubai
            </h2>
            <p className="text-xl-medium neutral-500 wow fadeInUp">
              Our luxury cars for rent offer you comfort, style, and prestige.
              From sleek sports cars for rent to appealing SUVs, we have something that will discern your preferences.
              Our vast fleet of luxury cars for hire will surely make your visit to Dubai memorable.
            </p>
          </div>
          <div className="col-md-4">
            <div className="d-flex justify-content-md-end mt-md-0 mt-4">
              <Link className="btn btn-primary wow fadeInUp" href="/luxury-fleet">
                Book Now
                <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
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
                    <Link href={`/luxury-fleet/${cat.slug}`} className="card-title">
                     <img src={cat.bannerimage} 
                      alt={`Rent a ${cat.name} in Dubai`}
                      loading="lazy"
                      decoding="async" />
                    </Link>
                  </div>
                  <div className="card-info">
                    <Link className="card-title" href={`/luxury-fleet/${cat.slug}`}>{cat.name}</Link>
                    <div className="card-meta">
                      <div className="meta-links">
                        <Link href={`/luxury-fleet/${cat.slug}`}>{cat.count} Vehicles</Link>
                      </div>
                      <div className="card-button">
                        <Link href={`/luxury-fleet/${cat.slug}`}>
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
