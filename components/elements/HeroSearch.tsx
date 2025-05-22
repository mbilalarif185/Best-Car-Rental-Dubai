// 'use client'
// import Link from 'next/link'
// import React from 'react'
// import Dropdown from 'react-bootstrap/Dropdown'
// import { useRouter } from 'next/navigation';

// export default function HeroSearch() {
// 	 const router = useRouter()
// 	  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
// 			if (e.key === 'Enter') {
// 			  e.preventDefault()
// 			  const trimmed = searchTerm.trim()
// 			  if (trimmed) {
// 				router.push(`/search?query=${encodeURIComponent(trimmed)}`)
// 			  } else {
// 				router.push('/search')
// 			  }
// 			  setShowSearch(false) // optional: hide search after submit
// 			}
// 		  }
// 	return (
// 		<>
// 			<div className="box-bottom-search background-card">
// 				<div className="item-search">
// 					<label className="text-sm-bold neutral-500">Pick Up Location</label>
// 					<Dropdown className="dropdown">
// 						<Dropdown.Toggle as="div" className="btn btn-secondary dropdown-toggle btn-dropdown-search location-search"  aria-expanded="false">Palm Jumeriah</Dropdown.Toggle>
// 						<Dropdown.Menu as="ul" className="dropdown-menu">
// 							<li className="dropdown-item">
// 								Dubai
// 							</li>
// 							<li className="dropdown-item">
// 								Bur Dubai
// 							</li>
// 							<li className="dropdown-item">
// 								Deira
// 							</li>
// 							<li className="dropdown-item">
// 								Palm Jumeriah
// 							</li>
// 						</Dropdown.Menu>
// 					</Dropdown>
// 				</div>
// 				<div className="item-search item-search-2">
// 					<label className="text-sm-bold neutral-500">Car Type</label>
// 					<Dropdown className="dropdown">
// 						<Dropdown.Toggle as="div" className="btn btn-secondary dropdown-toggle btn-dropdown-search location-search" >SUV</Dropdown.Toggle>
// 						<Dropdown.Menu as="ul" className="dropdown-menu">
// 						<li className="dropdown-item">
// 								SUV
// 							</li>
// 							<li className="dropdown-item">
// 								Sedan
// 							</li >
// 							<li className="dropdown-item">
// 								Coupe
// 							</li>
// 							<li className="dropdown-item">
// 								Convertible
// 							</li>
// 						</Dropdown.Menu>
// 					</Dropdown>
// 				</div>
// 				<div className="item-search item-search-2">
// 					<label className="text-sm-bold neutral-500">Drop Off Location</label>
// 					<Dropdown className="dropdown">
// 						<Dropdown.Toggle as="div" className="btn btn-secondary dropdown-toggle btn-dropdown-search location-search" >Dubai</Dropdown.Toggle>
// 						<Dropdown.Menu as="ul" className="dropdown-menu">
// 						<li className="dropdown-item">
// 								Dubai
// 							</li>
// 							<li className="dropdown-item">
// 								Bur Dubai
// 							</li>
// 							<li className="dropdown-item">
// 								Deira
// 							</li>
// 							<li className="dropdown-item">
// 								Palm Jumeriah
// 							</li>
// 						</Dropdown.Menu>
// 					</Dropdown>
// 				</div>
// 				<div className="item-search item-search-2">
// 					<label className="text-sm-bold neutral-500">Brand</label>
// 					<Dropdown className="dropdown">
// 						<Dropdown.Toggle as="div" className="btn btn-secondary dropdown-toggle btn-dropdown-search location-search" >Audi</Dropdown.Toggle>
// 						<Dropdown.Menu as="ul" className="dropdown-menu">
// 						<li className="dropdown-item">
// 								BMW
// 							</li>
// 							<li className="dropdown-item">
// 								Land Rover
// 							</li>
// 							<li className="dropdown-item">
// 								Mercedes
// 							</li>
// 							<li className="dropdown-item">
// 								Lamborghini
// 							</li>
// 						</Dropdown.Menu>
// 					</Dropdown>
// 				</div>
// 				<div className="item-search bd-none d-flex justify-content-end">
// 					<button className="btn btn-brand-2 text-nowrap">
// 						<svg className="me-2" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
// 							<path d="M19 19L14.6569 14.6569M14.6569 14.6569C16.1046 13.2091 17 11.2091 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17C11.2091 17 13.2091 16.1046 14.6569 14.6569Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
// 						</svg>
// 						Find a Vehicle
// 					</button>
// 				</div>
// 			</div>
// 		</>
// 	)
// }

'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HeroSearch() {
  const router = useRouter()

  const [carName, setCarName] = useState('')
  const [price, setPrice] = useState('')
  const [carType, setCarType] = useState('')
  const [brand, setBrand] = useState('')

  return (
    <div className="box-bottom-search background-card">
      {/* Car Name */}
      <div className="item-search">
        <label className="text-sm-bold neutral-500">Car Name</label>
        <input
          list="car-names"
          className="form-control"
          placeholder="Enter or select..."
          value={carName}
          onChange={(e) => setCarName(e.target.value)}
        />
        <datalist id="car-names">
          <option value="BMW X6" />
          <option value="Range Rover Sport" />
          <option value="Range Rover Evoque" />
          <option value="Audi RS Q8" />
        </datalist>
      </div>

      {/* Price */}
      <div className="item-search item-search-2">
        <label className="text-sm-bold neutral-500">Price</label>
        <input
          list="price-ranges"
          className="form-control"
          placeholder="Enter or select..."
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <datalist id="price-ranges">
          <option value="100 - 500 AED" />
          <option value="600 - 1000 AED" />
          <option value="1100 - 3000 AED" />
          <option value="3000 - 5000 AED" />
        </datalist>
      </div>

      {/* Car Type */}
      <div className="item-search item-search-2">
        <label className="text-sm-bold neutral-500">Car Type</label>
        <input
          list="car-types"
          className="form-control"
          placeholder="Enter or select..."
          value={carType}
          onChange={(e) => setCarType(e.target.value)}
        />
        <datalist id="car-types">
          <option value="SUV" />
          <option value="Sedan" />
          <option value="Coupe" />
          <option value="Convertible" />
        </datalist>
      </div>

      {/* Brand */}
      <div className="item-search item-search-2">
        <label className="text-sm-bold neutral-500">Brand</label>
        <input
          list="brands"
          className="form-control"
          placeholder="Enter or select..."
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
        <datalist id="brands">
          <option value="BMW" />
          <option value="Land Rover" />
          <option value="Mercedes" />
          <option value="Lamborghini" />
        </datalist>
      </div>

      {/* Submit Button */}
      <div className="item-search bd-none d-flex justify-content-end">
        <button
          className="btn btn-brand-2 text-nowrap"
          onClick={() => {
            const query = new URLSearchParams()
            if (carName.trim()) query.append('name', carName.trim())
            if (price.trim()) query.append('price', price.trim())
            if (carType.trim()) query.append('type', carType.trim())
            if (brand.trim()) query.append('brand', brand.trim())

            router.push(`/search?${query.toString()}`)
          }}
        >
          Find a Vehicle
        </button>
      </div>
    </div>
  )
}
