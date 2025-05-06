import Link from 'next/link'
import { Car } from '@/types/type';
interface CarCard1Props {
	car: Car;
  }

export default function CarCard1({ car }: any) {
	return (
		<>
			<div className="card-journey-small background-card hover-up">
					<div className="card-image">
						<Link href={`/cars/${car.slug}`}>
							<img src={`${car.image}`}
							  alt={`${car.name} - Rent Luxury Car in Dubai`}
							  title={`Rent ${car.name} in Dubai`}
							   loading="lazy"
                          		decoding="async"
							
							/>
						</Link>
					</div>
					<div className="card-info p-4 pt-30">
						<div className="card-rating">
							<div className="card-left" />
							<div className="card-right">
								<span className="rating text-xs-medium rounded-pill">{car.rating} <span className="text-xs-medium neutral-500">({car.reviews} Reviews)</span></span>
							</div>
						</div>
						<div className="card-title"><Link className="text-lg-bold neutral-1000 text-nowrap" href={`/cars/${car.slug}`}>{car.name}</Link></div>
						<div className="card-program">
							<div className="card-location">
								<p className="text-location text-sm-medium neutral-500">{car.location}</p>
							</div>
							<div className="card-facitlities">
								<p className="card-miles text-md-medium">{car.doors} Doors</p>
								<p className="card-gear text-md-medium">{car.gear}</p>
								<p className="card-fuel text-md-medium">{car.fuel}</p>
								<p className="card-seat text-md-medium">{car.seats} seats</p>
							</div>
							<div className="endtime">
								<div className="card-price">
									<h6 className="text-lg-bold neutral-1000">AED {car.price}</h6>
									<p className="text-md-medium neutral-500">/ day</p>
								</div>
								<div className="card-button"><Link className="btn btn-gray" href={`/cars/${car.slug}`}>Book Now</Link></div>
							</div>
						</div>
					</div>
				</div>
		</>
	)
}
