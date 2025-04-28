

// import { Filter } from "@/util/useCarFilter"

// interface ByCarTypeProps {
//   uniqueCarTypes: string[]
//   filter: Filter
//   handleCheckboxChange: (field: keyof Filter, value: string) => (e: React.ChangeEvent<HTMLInputElement>) => void
// }

// export default function ByCarType({ uniqueCarTypes, filter, handleCheckboxChange }: ByCarTypeProps) {
//   return (
//     <div className="box-collapse scrollFilter">
//       <ul className="list-filter-checkbox">
//         {uniqueCarTypes.map((carType) => (
//           <li key={carType}>
//             <label className="cb-container">
//               <input
//                 type="checkbox"
//                 checked={filter.type.includes(carType)}
//                 onChange={handleCheckboxChange("type", carType)}
//               />
//               <span className="text-sm-medium">{carType}</span>
//               <span className="checkmark" />
//             </label>
//             <span className="number-item">{carType?.length}</span>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }
import { Filter } from "@/util/useCarFilter"
import { Category } from "@/lib/categoryUtils"

interface ByCarTypeProps {
  categories: Category[]
  filter: Filter
  handleCheckboxChange: (field: keyof Filter, value: string) => (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ByCarType({ categories, filter, handleCheckboxChange }: ByCarTypeProps) {
  return (
    <div className="box-collapse scrollFilter">
      <ul className="list-filter-checkbox">
        {categories.map((category) => (
          <li key={category.name}>
            <label className="cb-container">
              <input
                type="checkbox"
                checked={filter.type.includes(category.name)}
                onChange={handleCheckboxChange("type", category.name)}
              />
              <span className="text-sm-medium">{category.name}</span>
              <span className="checkmark" />
            </label>
            <span className="number-item">{category.count}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

