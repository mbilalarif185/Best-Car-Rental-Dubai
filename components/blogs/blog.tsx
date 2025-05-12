'use client'
import { swiperBlogs, latestBlogs } from '@/data/blogs/bloggrid'
import Link from "next/link"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import { useRef } from "react"
import Image from "next/image"

export default function Blogs() {
  const prevRef = useRef<HTMLDivElement | null>(null)
  const nextRef = useRef<HTMLDivElement | null>(null)

  return (
<section className="box-section background-body pt-80">
        <div className="container">

        
          <div className="text-center mb-40">
            <div className="background-body px-3 py-2 rounded-12 border d-inline-flex gap-3">
              <Link href="/" className="neutral-700 text-md-medium">Home</Link>
              <span>
                <Image src="/assets/imgs/template/icons/arrow-right.svg" width={16} height={16} alt="Arrow Icon" />
              </span>
              <Link href="#" className="neutral-1000 text-md-bold">Blog</Link>
            </div>
            <h3 className="my-3 neutral-1000">Inside &amp; Trending</h3>
          </div>

          {/* Swiper */}
          <div className="box-swiper position-relative">
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              loop
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
            //   onBeforeInit={(swiper) => {
            //     // attach refs
            //     if (typeof swiper.params.navigation !== 'boolean') {
            //       swiper.params.navigation.prevEl = prevRef.current
            //       swiper.params.navigation.nextEl = nextRef.current
            //     }
            //   }}
			onBeforeInit={(swiper) => {
				if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
				  swiper.params.navigation.prevEl = prevRef.current
				  swiper.params.navigation.nextEl = nextRef.current
				}
			  }}
			  
			  
              className="swiper-container swiper-group-1"
            >
              {swiperBlogs.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className={`item-banner-slide-review d-flex align-items-center rounded-12 ${item.bannerClass}`}>
                    <div className="ps-md-5 ps-2 position-relative z-1">
                      <span className="text-primary text-md-bold">{item.category}</span>
                      <h3 className="mt-20 mb-20 color-white">{item.title}</h3>
                      <div className="card-meta-user">
                        <div className="box-author-small">
                          <Image src={item.authorAvatar} width={40} height={40} alt={item.author} className="rounded-circle" />
                          <p className="text-sm-bold">{item.author}</p>
                        </div>
                        <div className="date-post">
                          <p className="text-sm-medium">{item.date}</p>
                        </div>
                      </div>
                      <p className="text-lg-medium color-white mt-3">{item.description}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Swiper Buttons */}
            <div className="position-absolute end-0 bottom-0 p-40 z-2">
              <div className="box-button-slider box-button-slider-team justify-content-end">
                <div ref={prevRef} className="swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-2">
				<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
				<path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			  	</div>
                <div ref={nextRef} className="swiper-button-next swiper-button-next-style-1 swiper-button-next-2">
				<svg width="16" height="16" viewBox="0 0 20 20" fill="none">
    <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
				</div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 pt-55 pb-60">
            <span className="text-md-bold neutral-1000">CATEGORY:</span>
            {['Industry News', 'Rental Advice', 'Road Trips', 'Car Review', 'Travel Tips', 'Customer Stories'].map((category) => (
              <Link key={category} href="#" className="btn btn-white px-3 py-2">{category}</Link>
            ))}
          </div>

          {/* Latest News */}
          <h3 className="text-center mb-65 neutral-1000">Latest News</h3>
          <div className="row">
            {latestBlogs.map((blog) => (
              <div key={blog.id} className="col-lg-4 col-md-6 col-12">
                <div className="card-news background-card hover-up mb-4">
                  <div className="card-image">
                    <Image src={blog.image} alt={blog.title} width={600} height={400} className="w-100 rounded-12" />
                  </div>
                  <div className="card-info">
                    <label className="bg-2 rounded-12 position-absolute top-0 end-0 translate-middle-y px-3 py-2 me-4 text-sm-bold">{blog.category}</label>
                    <div className="card-meta">
                      <span className="post-date neutral-1000">{blog.date}</span>
                      <span className="post-time neutral-1000">{blog.readTime}</span>
                      <span className="post-comment neutral-1000">{blog.comments}</span>
                    </div>
                    <div className="card-title">
                      <Link href={blog.slug} className="text-xl-bold neutral-1000">{blog.title}</Link>
                    </div>
                    <div className="card-program">
                      <div className="endtime">
                        <div className="card-author">
                          <Image src={blog.authorAvatar} alt={blog.author} width={40} height={40} className="rounded-circle border border-primary" />
                          <p className="text-sm-bold neutral-1000">{blog.author}</p>
                        </div>
                        <div className="card-button">
                          <Link href={blog.slug} className="btn btn-gray">Keep Reading</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center">
            <nav aria-label="Page navigation">
              <ul className="pagination">
                <li className="page-item">
                  <Link className="page-link" href="#" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </Link>
                </li>
                <li className="page-item"><Link className="page-link" href="#">1</Link></li>
                <li className="page-item"><Link className="page-link" href="#">2</Link></li>
                <li className="page-item"><Link className="page-link" href="#">3</Link></li>
                <li className="page-item">
                  <Link className="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
		  <div className="section-box box-subscriber background-body pt-85">
							<div className="container">
								<div className="block-subscriber">
									<div className="subscriber-left">
										<span className="btn btn-primary">Get instant discounts</span>
										<h4 className="mt-15 mb-30 neutral-1000">Sign up to unlock secret deals instantly!</h4>
										<form className="form-subscriber" action="#">
											<input className="form-control" type="text" placeholder="Your Email" />
											<input className="btn btn-submit" type="submit" defaultValue="Subscribe" />
										</form>
										<p className="text-sm-medium neutral-500 mt-15">No ads. No trails. No commitments</p>
									</div>
									<div className="subscriber-right" />
								</div>
 							</div>
 						</div>
        
		</div>
      </section>
  )
}