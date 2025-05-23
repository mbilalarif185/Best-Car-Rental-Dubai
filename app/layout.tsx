import type { Metadata } from "next"
import { Urbanist } from "next/font/google"
import "@/node_modules/react-modal-video/css/modal-video.css"
import "/public/assets/css/main.css"
import WhatsAppButton from '@/components/whatsapp/WhatsAppButton';
import Head from "next/head";


const urbanist = Urbanist({
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
	variable: "--urbanist",
	display: 'swap',
})

export const metadata: Metadata = {
	title: "Best Car Rental Dubai",
	description: "Looking for Luxury Cars? Explore Our Best Car Rental dubai's top luxury fleet. ",
	icons: {
		icon: "/favicon.webp"
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<Head>
        <meta name="google-site-verification" content="eIB_T-TdBSukKqmpqtNjHrscPQx2ukT5Gpn5Vyr7T0c" />
        {/* This ensures it appears in the real HTML source */}
      </Head>
			<body className={`${urbanist.variable}`}>{children}
				<WhatsAppButton
			phoneNumber="+971545514155"
			iconUrl="/whatsapp-icon.webp"
			bottom={40}
			right={20}
			openInNewTab={true}
			animation="zoom"
      />
			</body>
			
		</html>
	)
}
