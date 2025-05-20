import { useEffect, useState } from "react"
import Image from 'next/image'
export default function ThemeSwitch() {
	const [toggleTheme, setToggleTheme] = useState<string>(
		() => localStorage.getItem("toggleTheme") || "light"
	)

	useEffect(() => {
		localStorage.setItem("toggleTheme", toggleTheme)
		document.documentElement.setAttribute("data-bs-theme", toggleTheme)
	}, [toggleTheme])

	const handleToggleTheme = () => {
		setToggleTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"))
	}

	return (
		<a className="btn btn-mode change-mode mr-15" onClick={handleToggleTheme}>
			{toggleTheme === "light" ? (
				<Image className="light-mode" src="/assets/imgs/template/icons/best-car-rental-light.png"
				width={30}
				height={30}
				 alt="Best Car Rental Dubai -Rent a Luxury Car"
				 title="Best Car Rental Dubai" />
			) : (
				<Image className="dark-mode" src="/assets/imgs/template/icons/best-car-rental-dark.png" 
				width={30}
				height={30}
				alt="Best Car Rental Dubai -" />
			)}
		</a>
	)
}
