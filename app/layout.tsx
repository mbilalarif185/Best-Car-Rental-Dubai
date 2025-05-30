
import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "/public/assets/css/main.css";
import WhatsAppButton from '@/components/whatsapp/WhatsAppButton';

const urbanist = Urbanist({
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: "--urbanist",
  display: 'swap',
});
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};
export const metadata: Metadata = {
  title: "Best Car Rental Dubai",
  description: "Looking for Luxury Cars? Explore Our Best Car Rental Dubai's top luxury fleet.",
  
  icons: {
    icon: "/favicon.webp",
  },
  verification: {
    google: "eIB_T-TdBSukKqmpqtNjHrscPQx2ukT5Gpn5Vyr7T0c", 
  },
  openGraph: {
    title: "Best Luxury Car Rental in Dubai",
    description: "Explore luxury, sports, and exotic car rentals in Dubai including Rolls Royce, Lamborghini, Ferrari & more.",
    url: "https://bestcarrentaldubai.ae/",
    siteName: "Best Car Rental Dubai",
    images: [
      {
        url: "https://bestcarrentaldubai.ae/assets/imgs/hero/hero-1/check.webp",
        width: 1200,
        height: 630,
        alt: "Luxury Car Rental Dubai",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Luxury Car Rental in Dubai",
    description: "Top-tier luxury and exotic cars for rent in Dubai. Easy booking, 24/7 support.",
    images: ["https://bestcarrentaldubai.ae/assets/imgs/hero/hero-1/check.webp"],
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://bestcarrentaldubai.ae/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body>
        {children}

       
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
  );
}
