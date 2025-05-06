//  'use client';
// import Marquee from 'react-fast-marquee';

// import ByCarType from '@/components/Filter/ByCarType';
// import ByPagination from '@/components/Filter/ByPagination';
// import CarCard1 from '@/components/elements/carcard/CarCard1';
// import ByPrice from '@/components/Filter/ByPrice';
// import ByRating from '@/components/Filter/ByRating';
// import { Car } from "@/types/type";
// import rawCarsData from "@/util/cars.json";
// import useCarFilter from '@/util/useCarFilter';
// import { getCategoryData } from "@/lib/categoryUtils"
// import SortCarsFilter from '@/components/elements/SortCarsFilter';

// const carsData: Car[] = rawCarsData;

// export default function CarsGrid() {
// const {
//   filter,
//   setFilter,
//   sortCriteria,
//   setSortCriteria,
//   itemsPerPage,
//   setItemsPerPage,
//   currentPage,
//   setCurrentPage,
//   uniqueNames,
//   uniqueFuelTypes,
//   uniqueLocations,
//   uniqueRatings,
//   uniqueCarTypes,
//   filteredCars,
//   sortedCars,
//   totalPages,
//   startIndex,
//   endIndex,
//   paginatedCars,
//   handleCheckboxChange,
//   handleSortChange,
//   handlePriceRangeChange,
//   handleItemsPerPageChange,
//   handlePageChange,
//   handlePreviousPage,
//   handleNextPage,
//   handleClearFilters,
//   startItemIndex,
//   endItemIndex,
// } = useCarFilter(carsData);
// return(
// <>
//  <section className="box-section block-content-tourlist background-body">
//           <div className="container">
//             <div className="box-content-main pt-20">
//               {/* Filters Sidebar */}
//               <aside className="content-left order-lg-first">
//                 <div className="sidebar-left border-1 background-body">
//                   <div className="box-filters-sidebar">
//                     <div className="block-filter border-1">
//                       <h6 className="text-lg-bold item-collapse neutral-1000">Show on Map</h6>
//                       <div className="box-collapse scrollFilter mb-15">
//                         <iframe
//                           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5249.611419370571!2d2.3406913487788334!3d48.86191519358772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e18a5f84801%3A0x6eb5daa624bdebd2!2sLes%20Halles%2C%20Paris%2C%20France!5e0!3m2!1svi!2s!4v1711728202093!5m2!1svi!2s"
//                           width="100%"
//                           height="160"
//                           style={{ border: 0 }}
//                           allowFullScreen
//                           loading="lazy"
//                           referrerPolicy="no-referrer-when-downgrade"
//                           title="Car Locations Map"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

               
//                 <div className="sidebar-left border-1 background-body">
//                     <div className="box-filters-sidebar">
//                       <div className="block-filter border-1">
//                         <h6 className="text-lg-bold item-collapse neutral-1000">Filter Price </h6>
//                         <ByPrice filter={filter} handlePriceRangeChange={handlePriceRangeChange} />
//                       </div>
//                     </div>
//                   </div>
//                   <div className="sidebar-left border-1 background-body">
//                     <div className="box-filters-sidebar">
//                       <div className="block-filter border-1">
//                         <h6 className="text-lg-bold item-collapse neutral-1000">Car type</h6>
                        
//                         <ByCarType 
//                           categories={getCategoryData()} 
//                           filter={filter} 
//                           handleCheckboxChange={handleCheckboxChange} 
//                         />

//                       </div>
//                     </div>
//                   </div>
               
//                 <div className="sidebar-left border-1 background-body">
//                 <div className="box-filters-sidebar">
//                       <div className="block-filter border-1">
//                         <h6 className="text-lg-bold item-collapse neutral-1000">Ratings</h6>
//                   <ByRating uniqueRatings={uniqueRatings} filter={filter} handleCheckboxChange={handleCheckboxChange} />
//                 </div>
//                 </div>
//                 </div>

//               </aside>

//               {/* Cars Content */}
//               <main className="content-right">
//                 <div className="box-filters mb-25 pb-5 border-bottom border-1">
//                   <SortCarsFilter
//                     sortCriteria={sortCriteria}
//                     handleSortChange={handleSortChange}
//                     itemsPerPage={itemsPerPage}
//                     handleItemsPerPageChange={handleItemsPerPageChange}
//                     handleClearFilters={handleClearFilters}
//                     startItemIndex={startItemIndex}
//                     endItemIndex={endItemIndex}
//                     sortedCars={sortedCars}
//                   />
//                 </div>
                
//                 <div className="box-grid-tours">
//                   <div className="row">
//                     {paginatedCars.map((car) => (
//                       <div className="col-lg-4 col-md-6" key={car.id}>
//                         <CarCard1 car={car} />
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <ByPagination
//                   handlePreviousPage={handlePreviousPage}
//                   totalPages={totalPages}
//                   currentPage={currentPage}
//                   handleNextPage={handleNextPage}
//                   handlePageChange={handlePageChange}
//                 />
//               </main>
//             </div>
//           </div>

//           {/* Brands Marquee */}
//           <div className="background-100 pt-55 pb-55">
//             <div className="container">
//               <Marquee direction="left" pauseOnHover className="carouselTicker carouselTicker-left box-list-brand-car justify-content-center">
//                 <ul className="carouselTicker__list">
//                   {[
//                     { src: "lexus", alt: "Lexus" },
//                     { src: "mer", alt: "Mercedes" },
//                     { src: "bugatti", alt: "Bugatti" },
//                     { src: "jaguar", alt: "Jaguar" },
//                     { src: "honda", alt: "Honda" },
//                     { src: "chevrolet", alt: "Chevrolet" },
//                     { src: "acura", alt: "Acura" },
//                     { src: "bmw", alt: "BMW" },
//                     { src: "toyota", alt: "Toyota" },
//                   ].map(({ src, alt }, idx) => (
//                     <li className="carouselTicker__item" key={idx}>
//                       <div className="item-brand">
//                         <img className="light-mode" src={`/assets/imgs/page/homepage2/${src}.png`} alt={`${alt} logo`} width="120" height="60" loading="lazy" />
//                         <img className="dark-mode" src={`/assets/imgs/page/homepage2/${src}-w.png`} alt={`${alt} logo`} width="120" height="60" loading="lazy" />
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               </Marquee>
//             </div>
//           </div>
//         </section>
//         </>
//         );
//       };

'use client';
import Marquee from 'react-fast-marquee';

import ByCarType from '@/components/Filter/ByCarType';
import ByPagination from '@/components/Filter/ByPagination';
import CarCard1 from '@/components/elements/carcard/CarCard1';
import ByPrice from '@/components/Filter/ByPrice';
import ByRating from '@/components/Filter/ByRating';
import { Car } from "@/types/type";
import rawCarsData from "@/util/cars.json";
import useCarFilter from '@/util/useCarFilter';
import { getCategoryData } from "@/lib/categoryUtils";
import SortCarsFilter from '@/components/elements/SortCarsFilter';

const carsData: Car[] = rawCarsData;

export default function CarsGrid() {
  const {
    filter,
    setFilter,
    sortCriteria,
    setSortCriteria,
    itemsPerPage,
    setItemsPerPage,
    currentPage,
    setCurrentPage,
    uniqueNames,
    uniqueFuelTypes,
    uniqueLocations,
    uniqueRatings,
    uniqueCarTypes,
    filteredCars,
    sortedCars,
    totalPages,
    startIndex,
    endIndex,
    paginatedCars,
    handleCheckboxChange,
    handleSortChange,
    handlePriceRangeChange,
    handleItemsPerPageChange,
    handlePageChange,
    handlePreviousPage,
    handleNextPage,
    handleClearFilters,
    startItemIndex,
    endItemIndex,
  } = useCarFilter(carsData);

  return (
    <>
      <section className="box-section block-content-tourlist background-body">
        <div className="container">
          <div className="box-content-main pt-20">
            
            {/* Filters Sidebar */}
            <aside className="content-left order-lg-first" aria-label="Car Filters Sidebar">
              
              <div className="sidebar-left border-1 background-body">
                <div className="box-filters-sidebar">
                  <div className="block-filter border-1">
                    <h6 className="text-lg-bold item-collapse neutral-1000">Show on Map</h6>
                    {/* <div className="box-collapse scrollFilter mb-15">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5249.611419370571!2d2.3406913487788334!3d48.86191519358772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e18a5f84801%3A0x6eb5daa624bdebd2!2sLes%20Halles%2C%20Paris%2C%20France!5e0!3m2!1svi!2s!4v1711728202093!5m2!1svi!2s"
                        width="100%"
                        height="160"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Car Locations Map"
                      />
                    </div> */}
                    <div className="box-collapse scrollFilter mb-15">
                    <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3609.618166772418!2d55.23615531501264!3d25.121154183944334!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f17!3m3!1m2!1s0x3e5f6bfe8d289efb%3A0xf24c5208d3b3b8b!2sLEGENDARY%20CAR%20RENTAL%20LLC!5e0!3m2!1sen!2sae!4v1714246800000!5m2!1sen!2sae"
                    width="230px"
                    height="260px"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Legendary Car Rental LLC Dubai"
/>

</div>

                  </div>
                </div>
              </div>

              <div className="sidebar-left border-1 background-body">
                <div className="box-filters-sidebar">
                  <div className="block-filter border-1">
                    <h6 className="text-lg-bold item-collapse neutral-1000">Filter Price</h6>
                    <ByPrice filter={filter} handlePriceRangeChange={handlePriceRangeChange} />
                  </div>
                </div>
              </div>

              <div className="sidebar-left border-1 background-body">
                <div className="box-filters-sidebar">
                  <div className="block-filter border-1">
                    <h6 className="text-lg-bold item-collapse neutral-1000">Car Type</h6>
                    <ByCarType 
                      categories={getCategoryData()} 
                      filter={filter} 
                      handleCheckboxChange={handleCheckboxChange} 
                    />
                  </div>
                </div>
              </div>

              <div className="sidebar-left border-1 background-body">
                <div className="box-filters-sidebar">
                  <div className="block-filter border-1">
                    <h6 className="text-lg-bold item-collapse neutral-1000">Ratings</h6>
                    <ByRating uniqueRatings={uniqueRatings} filter={filter} handleCheckboxChange={handleCheckboxChange} />
                  </div>
                </div>
              </div>

            </aside>

            {/* Cars Content */}
            <main className="content-right" aria-label="Car Listings">
              <div className="box-filters mb-25 pb-5 border-bottom border-1">
                <SortCarsFilter
                  sortCriteria={sortCriteria}
                  handleSortChange={handleSortChange}
                  itemsPerPage={itemsPerPage}
                  handleItemsPerPageChange={handleItemsPerPageChange}
                  handleClearFilters={handleClearFilters}
                  startItemIndex={startItemIndex}
                  endItemIndex={endItemIndex}
                  sortedCars={sortedCars}
                />
              </div>

              <div className="box-grid-tours">
                <div className="row">
                  {paginatedCars.map((car) => (
                    <div className="col-lg-4 col-md-6" key={car.id}>
                      <CarCard1 car={car} />
                    </div>
                  ))}
                </div>
              </div>

              <ByPagination
                handlePreviousPage={handlePreviousPage}
                totalPages={totalPages}
                currentPage={currentPage}
                handleNextPage={handleNextPage}
                handlePageChange={handlePageChange}
              />
            </main>

          </div> {/* <-- Correct closing div for box-content-main */}
        </div>

        {/* Brands Marquee */}
        <div className="background-100 pt-55 pb-55">
          <div className="container">
            <Marquee direction="left" pauseOnHover className="carouselTicker carouselTicker-left box-list-brand-car justify-content-center">
              <ul className="carouselTicker__list">
                {[
                  { src: "lexus", alt: "Lexus" },
                  { src: "mer", alt: "Mercedes" },
                  { src: "bugatti", alt: "Bugatti" },
                  { src: "jaguar", alt: "Jaguar" },
                  { src: "honda", alt: "Honda" },
                  { src: "chevrolet", alt: "Chevrolet" },
                  { src: "acura", alt: "Acura" },
                  { src: "bmw", alt: "BMW" },
                  { src: "toyota", alt: "Toyota" },
                ].map(({ src, alt }, idx) => (
                  <li className="carouselTicker__item" key={idx}>
                    <div className="item-brand">
                      <img 
                        className="light-mode" 
                        src={`/assets/imgs/page/homepage2/${src}.png`} 
                        alt={`${alt} logo`} 
                        width="120" 
                        height="60" 
                        loading="lazy" 
                      />
                      <img 
                        className="dark-mode" 
                        src={`/assets/imgs/page/homepage2/${src}-w.png`} 
                        alt={`${alt} logo`} 
                        width="120" 
                        height="60" 
                        loading="lazy" 
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </Marquee>
          </div>
        </div>

      </section>
    </>
  );
}
