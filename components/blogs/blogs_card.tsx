import { swiperBlogs, latestBlogs } from '@/data/blogs/bloggrid'

import Image from "next/image"
import Link from "next/link"
export default function Blog_Card(){
    return(
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
            
    )

}