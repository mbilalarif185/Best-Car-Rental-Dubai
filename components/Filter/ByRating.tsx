
// export default function ByRating({ uniqueRatings, filter, handleCheckboxChange }: any) {
// 	return (
// 		<>
// 			<div className="box-collapse scrollFilter">
// 				<ul className="list-filter-checkbox">
// 					{uniqueRatings.map((rating: any) => (
// 						<li key={rating}>
// 							<label className="cb-container">
// 								<input
// 									type="checkbox"
// 									checked={filter.ratings.includes(rating)}
// 									onChange={handleCheckboxChange("ratings", rating)}
// 								/>
// 								{rating} stars
// 								<span className="text-sm-medium">
// 									<img src="/assets/imgs/template/icons/star-yellow.svg" alt="Travila" />
// 									<img src="/assets/imgs/template/icons/star-yellow.svg" alt="Travila" />
// 									<img src="/assets/imgs/template/icons/star-yellow.svg" alt="Travila" />
// 									<img src="/assets/imgs/template/icons/star-yellow.svg" alt="Travila" />
// 									<img src="/assets/imgs/template/icons/star-yellow.svg" alt="Travila" />
// 								</span>
// 								<span className="checkmark" />
// 							</label>
// 						</li>
// 					))}					
// 				</ul>
// 			</div>
// 		</>
// 	)
// }
export default function ByRating({ filter, handleCheckboxChange }: any) {
	const individualRatings = [
	  4.0, 4.1, 4.2, 4.3, 4.4, 
	  4.5, 4.6, 4.7, 4.8, 4.9, 
	  5.0
	];
  
	return (
	  <>
		<div className="box-collapse scrollFilter">
		  <ul className="list-filter-checkbox">
			{individualRatings.map((rating) => (
			  <li key={rating}>
				<label className="cb-container">
				  <input
					type="checkbox"
					checked={filter.ratings.includes(rating)}
					onChange={handleCheckboxChange("ratings", rating)}
				  />
				  {rating.toFixed(1)} stars
				  <span className="text-sm-medium">
					<img src="/assets/imgs/template/icons/star-yellow.svg" alt="Travila" />
					<img src="/assets/imgs/template/icons/star-yellow.svg" alt="Travila" />
					<img src="/assets/imgs/template/icons/star-yellow.svg" alt="Travila" />
					<img src="/assets/imgs/template/icons/star-yellow.svg" alt="Travila" />
					<img src="/assets/imgs/template/icons/star-yellow.svg" alt="Travila" />
				  </span>
				  <span className="checkmark" />
				</label>
			  </li>
			))}
		  </ul>
		</div>
	  </>
	)
  }
  