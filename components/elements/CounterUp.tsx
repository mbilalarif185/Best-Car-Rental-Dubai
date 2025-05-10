// 'use client'
// import dynamic from 'next/dynamic'
// import React from 'react'

// const Odometer = dynamic(() => import('react-odometerjs'), {
// 	ssr: false,
// 	loading: () => <span>0</span>,
// })

// interface CounterUpProps {
// 	count: number,
// 	duration?: number
// }

// const CounterUp: React.FC<CounterUpProps> = ({ count }) => {
// 	return (
// 		<Odometer value={count} className="odometer" duration={5000} animation='count' />
// 	)
// }

// export default CounterUp
'use client'
import dynamic from 'next/dynamic'
import React, { useState, useEffect } from 'react'
import { useInView } from 'react-intersection-observer'
import 'odometer/themes/odometer-theme-default.css'

const Odometer = dynamic(() => import('react-odometerjs'), {
	ssr: false,
	loading: () => <span>0</span>,
})

interface CounterUpProps {
	count: number
	duration?: number
}

const CounterUp: React.FC<CounterUpProps> = ({ count, duration = 7000 }) => {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.6, // Adjust as needed
	})
	const [displayCount, setDisplayCount] = useState(0)

	useEffect(() => {
		if (inView) {
			setDisplayCount(count)
		}
	}, [inView, count])

	return (
		<div ref={ref}>
			<Odometer value={displayCount} className="odometer" duration={duration} />
		</div>
	)
}

export default CounterUp
