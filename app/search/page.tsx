
// import cars from '@/util/cars.json';
// import { Car } from '@/types/type';
// import Layout from '@/components/layout/Layout';
// import Header from '@/components/category/header';
// import dynamic from 'next/dynamic';

// const CarsListing4 = dynamic(() => import('@/components/sections/CarsListing4'), {
//   ssr: false,
// });

// interface SearchPageProps {
//   searchParams: {
//     query?: string;
//     carType?: string;
//     brand?: string;
//     pickup?: string;
//     dropoff?: string;
//   };
// }

// export default function SearchPage({ searchParams }: SearchPageProps) {
//   const query = searchParams.query?.toLowerCase().trim() || '';
//   const carType = searchParams.carType?.toLowerCase().trim() || '';
//   const brand = searchParams.brand?.toLowerCase().trim() || '';

//   // Filter cars by either `query` (broad search) or by individual filters
//   const filteredCars: Car[] = cars.filter((car) => {
//     const carBrand = car.brand.toLowerCase();
//     const carName = car.name.toLowerCase();
//     const carTypeValue = car.type.toLowerCase();

//     if (query) {
//       const combined = `${carBrand} ${carName} ${carTypeValue}`;
//       return combined.includes(query);
//     } else {
//       const matchesBrand = brand ? carBrand.includes(brand) : true;
//       const matchesType = carType ? carTypeValue.includes(carType) : true;
//       return matchesBrand && matchesType;
//     }
//   });

//   const hasSearch = query || brand || carType;

//   return (
//     <Layout footerStyle={1}>
//       <Header
//         breadcrumbLabel={hasSearch ? `Results for "${query || brand || carType}"` : 'Search'}
//         secondbreadcrumb="Fleet"
//         secondbreadcrumburl="/luxury-fleet"
//         breadcrumbUrl="/search"
//         categorySlug={undefined}
//       />
//       <section className="search-results container my-5">
//         {hasSearch ? (
//           filteredCars.length > 0 ? (
//             <CarsListing4 cars={filteredCars} brandSlug={brand || query || ''} />
//           ) : (
//             <p className="text-center fs-5 text-muted">
//               No results found for <strong>{query || `${brand} ${carType}`}</strong>.
//             </p>
//           )
//         ) : (
//           <p className="text-center fs-5 text-muted">
//             Please enter a search term or use filters to find cars.
//           </p>
//         )}
//       </section>
//     </Layout>
//   );
// }

// app/search/page.tsx

import cars from '@/util/cars.json'
import { Car } from '@/types/type'
import Layout from '@/components/layout/Layout'
import Header from '@/components/category/header'
import dynamic from 'next/dynamic'

const CarsListing4 = dynamic(() => import('@/components/sections/CarsListing4'), {
  ssr: false,
})

interface SearchPageProps {
  searchParams: {
    query?: string
    name?: string
    price?: string
    type?: string
    brand?: string
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  // Normalize all params to lowercase trimmed strings
  const query = searchParams.query?.toLowerCase().trim() || ''
  const name = searchParams.name?.toLowerCase().trim() || ''
  const price = searchParams.price?.toLowerCase().trim() || ''
  const type = searchParams.type?.toLowerCase().trim() || ''
  const brand = searchParams.brand?.toLowerCase().trim() || ''

  // Parse price range if provided
  let priceMin = 0,
    priceMax = Infinity
  if (price) {
    const match = price.match(/(\d+)\s*-\s*(\d+)/)
    if (match) {
      priceMin = Number(match[1])
      priceMax = Number(match[2])
    }
  }

  const filteredCars: Car[] = cars.filter((car) => {
    const carBrand = car.brand.toLowerCase()
    const carName = car.name.toLowerCase()
    const carType = car.type.toLowerCase()
    const carPrice = Number(car.price) // Make sure price is number

    if (query) {
      // If query param exists, do broad search on brand, name, type combined
      const combined = `${carBrand} ${carName} ${carType}`
      return combined.includes(query)
    } else {
      // Otherwise, apply filters from HeroSearch form
      const matchesName = name ? carName.includes(name) : true
      const matchesBrand = brand ? carBrand.includes(brand) : true
      const matchesType = type ? carType.includes(type) : true
      const matchesPrice = carPrice >= priceMin && carPrice <= priceMax

      return matchesName && matchesBrand && matchesType && matchesPrice
    }
  })

  const hasSearch = query || name || brand || type || price

  // Create user-friendly label for breadcrumbs
  let breadcrumbLabel = 'Search'
  if (query) breadcrumbLabel = `Results for "${query}"`
  else if (hasSearch) {
    const parts = []
    if (name) parts.push(`Name: "${name}"`)
    if (brand) parts.push(`Brand: "${brand}"`)
    if (type) parts.push(`Type: "${type}"`)
    if (price) parts.push(`Price: "${price}"`)
    breadcrumbLabel = `Results for ${parts.join(', ')}`
  }

  return (
    <Layout footerStyle={1}>
      <Header
        breadcrumbLabel={breadcrumbLabel}
        secondbreadcrumb="Fleet"
        secondbreadcrumburl="/luxury-fleet"
        
        categorySlug={undefined}
      />
      <section className="search-results container my-5">
        {hasSearch ? (
          filteredCars.length > 0 ? (
            <CarsListing4 cars={filteredCars} brandSlug={brand || name || query || ''} />
          ) : (
            <p className="text-center fs-5 text-muted mt-4 mb-4">
             Sorry, we couldn't find any cars matching
            </p>
          )
        ) : (
          <p className="text-center fs-5 text-muted">Please enter a search term or use filters to find cars.</p>
        )}
      </section>
    </Layout>
  )
}
