
// 'use client'
// import { useState } from "react"
// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css"

// export default function MyDatePicker({form}:any) {
// 	const [startDate, setStartDate] = useState(new Date())
//   return (
// 	<>
// 		<DatePicker selected={startDate} onChange={(date:any) => setStartDate(date)} className={!form? "search-input datepicker" : "form-control calendar-date"} />
// 	</>
//   )
// }
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Extend the MyDatePickerProps interface to include the missing props
interface MyDatePickerProps {
  form?: boolean; // optional prop
  id: string; // required prop for id
  value: string; // value as a string (for date)
  onChange: (date: Date | null) => void; // handle date change with Date or null
  required?: boolean; // optional prop for required
}

export default function MyDatePicker({ id, value, onChange, required, form }: MyDatePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(new Date());

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    onChange(date); // Call the onChange prop to update the parent state
  };

  return (
    <DatePicker
      id={id}
      selected={startDate}
      onChange={handleDateChange}
      required={required}
      className={!form ? "search-input datepicker" : "form-control calendar-date"}
    />
  );
}