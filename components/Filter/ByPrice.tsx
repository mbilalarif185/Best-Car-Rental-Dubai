
export default function ByPrice({ handlePriceRangeChange, filter, }: any) {
	return (
		<>
			<div className="box-collapse scrollFilter">
				<input
					type="range"
					min="0"
					max="5000"
					value={filter.priceRange[0]}
					onChange={(e) => {
						const v = parseInt(e.target.value, 10)
						const max = filter.priceRange[1]
						handlePriceRangeChange([Math.min(v, max), max])
					}}
				/>
				<input
					type="range"
					min="0"
					max="5000"
					value={filter.priceRange[1]}
					onChange={(e) => {
						const v = parseInt(e.target.value, 10)
						const min = filter.priceRange[0]
						handlePriceRangeChange([min, Math.max(v, min)])
					}}
				/>
				<div>
					<span>AED {filter.priceRange[0]}</span> - <span>AED {filter.priceRange[1]}</span>
				</div>
			</div>
		</>
	)
}
