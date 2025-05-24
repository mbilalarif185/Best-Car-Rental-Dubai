
import Layout from "@/components/layout/Layout"
import TermofUse from "@/components/useful/termofuse"

export const metadata = {
  title: "Terms of Use | Best Car Rental Dubai",
  description:
    "Read the terms of use for Best Car Rental Dubai.These terms helps to represent legeal agreement between us.Terms can be change from time to time",
  robots: "index, follow",
  alternates: {
    canonical: "https://bestcarrentaldubai.ae/term-of-use",
  },
};

export default function Term() {

	return (
		<>

			<Layout footerStyle={1}>
				<TermofUse/>

			</Layout>
		</>
	)
}