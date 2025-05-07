'use client'
import Link from "next/link"
import { useState } from 'react'
import dynamic from 'next/dynamic';
import Image from 'next/image'
const ModalVideo = dynamic(() => import('react-modal-video'), { ssr: false });

export default function CarReview1() {
  const [video, setVideo] = useState<{ isOpen: boolean, id: string | null }>({
    isOpen: false,
    id: null
  });

  const openVideo = (id: string) => {
    setVideo({ isOpen: true, id });
  };

  return (
    <>
      <section className="section-box box-picked background-body">
        <div className="container">
          <div className="row align-items-end">
            <div className="col-md-9 mb-30 wow fadeInUp">
              <h2 className="custom-heading neutral-1000 mb-4">
                Experience Luxury with Style in Dubai
              </h2>
              <p className="text-lg-medium neutral-500">
                Give a go to the exhilarating rides and unbeatable riding experience with our luxury car rental in Dubai,UAE.
                Choose from Lamborghini to Rolls Royce and Mercedes.
                We make luxury cars for hire accessible for you!
              </p>
            </div>
            <div className="col-md-3 mb-30 wow fadeInUp">
              <div className="d-flex justify-content-center justify-content-md-end">
                <Link className="btn btn-primary" href="/luxury-fleet">
                  View More
                  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="box-videos-small mt-0">
            <div className="bg-video background-2" />
            <div className="row">
              <div className="col-lg-7">
                <div className="card-grid-video wow fadeIn">
                  <div className="card-image">
                    <button type="button" className="btn btn-play popup-youtube" 
					onClick={() => openVideo('d-RxQcCZRoc')}
					aria-label="Play video: BEST BMW M4 COMPETITION"
					/>
                    <Image 
					 className="mr-10"
					 src="/assets/imgs/car-review/car-review-1/Mercedes G63 for rent in dubai.webp"
					 alt="Rent Mercedes in Dubai" 
					 title="Mercedes for Rent in Dubai"
					width={696}
					height={613}
					loading="lazy" 
					/>
                  </div>
                  <div className="card-info">
					<Link href="/cars/rent-mercedes-g63-in-dubai">
                    <h4 className="text-white">Rent Mercedes G63</h4>
					</Link>
                    <p className="text-md-medium text-white">18 August 2024</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-5">
                <div className="list-videos-small">
                  <div className="item-video-small wow fadeIn" data-wow-delay="0.1s">
                    <div className="item-image">
                      <a className="btn-play-sm popup-youtube" onClick={() => openVideo('llH-eibY8xo')}></a>
                      <Image className="mr-10"
					   src="/assets/imgs/car-review/car-review-1/BMW-M4-Convertible-in-dubai-for-rent.webp" 
					   alt="bmw rental dubai"
					   title="Bmw For Rent in Dubai"
					   width={188}
					   height={188}
					   loading="lazy" />
                    </div>
                    <div className="item-info">
                      <Link className="heading-6" href="/cars/rent-bmw-m4-in-dubai">BEST BMW M4 COMPETITION</Link>
                      <p className="text-md-medium neutral-500">18 August 2024</p>
                    </div>
                  </div>

                  <div className="item-video-small wow fadeIn" data-wow-delay="0.2s">
                    <div className="item-image">
                      <a className="btn-play-sm popup-youtube" onClick={() => openVideo('j0PUy4qKMpE')}></a>
                      <Image className="mr-10" 
					  src="/assets/imgs/car-review/car-review-1/Rent-McLaren-in-Dubai.webp" 
					  alt="luxury car hire dubai"
					  title="McLaren 720s - Luxury Car Rental Dubai"
					  width={188}
					  height={188}
					  loading="lazy" />
                    </div>
                    <div className="item-info">
                      <Link className="heading-6" href="/cars/rent-mclaren-720s-in-dubai">McLaren 720s Now Available In Dubai</Link>
                      <p className="text-md-medium neutral-500">18 August 2024</p>
                    </div>
                  </div>

                  <div className="item-video-small wow fadeIn" data-wow-delay="0.3s">
                    <div className="item-image">
                      <a className="btn-play-sm popup-youtube" onClick={() => openVideo('-xHvqaGIhwA')}></a>
                      <Image 
					  className="mr-10" 
					  src="/assets/imgs/car-review/car-review-1/Lamborghini-urus-for-rent-in-dubai.webp" 
					  alt="rent lamborghini dubai"
					  title="Lamborghini Urus For Rent in Dubai"
					  width={188}
					  height={188}
					  loading="lazy" />
                    </div>
                    <div className="item-info">
                      <Link className="heading-6" href="/cars/rent-lamborghini-urus-in-dubai">Rent Lamborghini in Dubai</Link>
                      <p className="text-md-medium neutral-500">18 August 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {video.id && (
  <ModalVideo
    channel="youtube"
    isOpen={video.isOpen}
    videoId={video.id}
    onClose={() => setVideo({ isOpen: false, id: null })}
    allowFullScreen={true}
    ratio="16:9"
    animationSpeed={300}
    classNames={{
      modalVideo: 'modal-video',
      modalVideoBody: 'modal-video-body',
      modalVideoInner: 'modal-video-inner',
      modalVideoIframeWrap: 'modal-video-movie-wrap',
      modalVideoClose: 'modal-video-close',
	 modalVideoEffect: 'modal-video-effect',       
     modalVideoCloseBtn: 'modal-video-close-btn'
    }}
    aria={{
      openMessage: 'You just opened the modal video',
      dismissBtnMessage: 'Close the modal by clicking here'
    }}
  />
)}

    </>
  );
}
