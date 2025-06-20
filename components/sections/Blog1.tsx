'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link"
import { swiperGroup3 } from '@/util/swiperOptions'
import { latestBlogs } from "@/data/blogs/bloggrid";

export default function Blog1() {
	return (
		<>

			<section className="section-box box-news background-body">
				<div className="container">
					<div className="row align-items-end">
						<div className="col-md-9 mb-30 wow fadeInUp">
							<h2 className="title-svg neutral-1000 mb-15 custom-heading">Latest Insights and Events for Renting a Car in Dubai</h2>
							<p className="text-lg-medium text-bold neutral-500">
								Explore the latest updates about luxury cars in Dubai and coming events. 
								Whether you are looking for an option for self-drive car rental, monthly rental, or chauffeur service,
								 we offer insights about everything. 

							</p>
						</div>
						<div className="col-md-3 position-relative mb-30 wow fadeInUp">
							<div className="box-button-slider box-button-slider-team justify-content-end">
								<div className="swiper-button-prev swiper-button-prev-style-1 swiper-button-prev-2" tabIndex={0} role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-f147def6ba09c37a">
									<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
										<path d="M7.99992 3.33325L3.33325 7.99992M3.33325 7.99992L7.99992 12.6666M3.33325 7.99992H12.6666" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</div>
								<div className="swiper-button-next swiper-button-next-style-1 swiper-button-next-2" tabIndex={0} role="button" aria-label="Next slide" aria-controls="swiper-wrapper-f147def6ba09c37a">
									<svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
										<path d="M7.99992 12.6666L12.6666 7.99992L7.99992 3.33325M12.6666 7.99992L3.33325 7.99992" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
									</svg>
								</div>
							</div>
						</div>
					</div>
					
					  <div className="box-list-news wow fadeInUp mt-5">
						<div className="box-swiper">
							<Swiper {...swiperGroup3} className="swiper-container swiper-group-3">
							<div className="swiper-wrapper">
								{latestBlogs.map((blog) => (
								<SwiperSlide className="swiper-slide pt-2" key={blog.id}>
									<div className="card-news background-card hover-up">
									<div className="card-image">
										<Link href="/blog-grid">
										<img src={blog.image} alt={blog.title} />
										</Link>
									</div>
									<div className="card-info">
										<Link
										className="bg-2 rounded-12 position-absolute top-0 end-0 translate-middle-y px-3 py-2 me-4 text-sm-bold"
										href="/blog-grid"
										>
										{blog.category}
										</Link>
										<div className="card-meta">
										<span className="post-date neutral-1000">{blog.date}</span>
										<span className="post-time neutral-1000">{blog.readTime}</span>
										<span className="post-comment neutral-1000">{blog.comments}</span>
										</div>
										<div className="card-title">
										<Link className="text-xl-bold neutral-1000" href="/blog-grid">
											{blog.title}
										</Link>
										</div>
										<div className="card-program">
										<div className="endtime">
											<div className="card-author">
											<img src={blog.authorAvatar} alt={blog.author} className="rounded-circle"/>
											<p className="text-sm-bold neutral-1000">{blog.author}</p>
											</div>
											<div className="card-button">
											<Link className="btn btn-gray" href="/blog-grid">
												Keep Reading
											</Link>
											</div>
										</div>
										</div>
									</div>
									</div>
								</SwiperSlide>
								))}
							</div>
							</Swiper>
						</div>
   					 </div>
				</div>
			</section>
		</>
	)
}
