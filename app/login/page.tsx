import Layout from "@/components/layout/Layout"
import LoginForm from "@/components/auth/LoginForm"

export const dynamic = "force-dynamic";

export default function Login() {
	return (
		<>
			<Layout footerStyle={1}>
				<div className="container pt-140 pb-170">
					<div className="row">
						<div className="col-lg-5 mx-auto">
							<div className="border rounded-3 px-md-5 px-3 ptb-50">
								<div className="login-content">
									<div className="text-center">
										<p className="neutral-1000 px-4 py-2 bg-2 text-sm-bold rounded-12 d-inline-flex align-items-center">Sign in</p>
										<h4 className="neutral-1000">Welcome back</h4>
									</div>
									<div className="form-login mt-30">
										<LoginForm />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		</>
	)
}
