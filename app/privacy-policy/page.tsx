
import Layout from "@/components/layout/Layout"
import Privacypolicy from "@/components/useful/privacy-policy"
export const metadata = {
  title: 'Privacy Policy | Best Car Rental Dubai',
  description: 'Review the Privacy Policy of Best Car Rental Dubai. We beleive in data protection and take care of you personal data. Feel Free to share your personal information on Best Car Rental Dubai website',
  alternates: {
    canonical: 'https://bestcarrentaldubai.ae/privacy-policy'
  }
};

export default function Term() {

	return (
		<>

			<Layout footerStyle={1}>
				<main>
				<Privacypolicy/>
				</main>
			</Layout>
		</>
	)
}