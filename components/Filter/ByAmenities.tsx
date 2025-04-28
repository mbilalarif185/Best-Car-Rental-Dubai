// import { Filter } from "@/util/useCarFilter"

// interface ByAmenitiesProps {
//   uniqueAmenities: string[]
//   filter: Filter
//   handleCheckboxChange: (field: keyof Filter, value: string) => (e: React.ChangeEvent<HTMLInputElement>) => void
// }

// export default function ByAmenities({ uniqueAmenities, filter, handleCheckboxChange }: ByAmenitiesProps) {
//   return (
//     <div className="box-collapse scrollFilter">
//       <ul className="list-filter-checkbox">
//         {uniqueAmenities.map((amenity) => (
//           <li key={amenity}>
//             <label className="cb-container">
//               <input
//                 type="checkbox"
//                 checked={(filter as any).amenities?.includes(amenity)}
//                 onChange={handleCheckboxChange("amenities", amenity)}
//               />
//               <span className="text-sm-medium">{amenity}</span>
//               <span className="checkmark" />
//             </label>
//             <span className="number-item">{amenity?.length}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }
