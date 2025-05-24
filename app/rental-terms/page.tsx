
import Layout from "@/components/layout/Layout"
import TermsCondition from "@/components/useful/terms-condition"

export const metadata = {
  title: "Terms and Conditions | Best Car Rental Dubai",
  description:
    "Best Car Rental Dubai offers you luxury cars for rent. For renting a car you need to provide your documents like license etc. ",
  robots: "index, follow",
  alternates: {
    canonical: "https://bestcarrentaldubai.ae/rental-terms",
  },
};

export default function Term() {

	return (
		<>

			<Layout footerStyle={1}>
				<main>
				<TermsCondition/>
				</main>

			</Layout>
		</>
	)
}