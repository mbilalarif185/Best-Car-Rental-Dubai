"use client"

import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState, FormEvent } from "react"

export default function Register() {
	const router = useRouter()
	const [error, setError] = useState<string | null>(null)
	const [submitting, setSubmitting] = useState(false)

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault()
		setError(null)
		const form = e.currentTarget
		const full_name = (form.querySelector('input[name="full_name"]') as HTMLInputElement)?.value
		const email = (form.querySelector('input[name="email"]') as HTMLInputElement)?.value
		const password = (form.querySelector('input[name="password"]') as HTMLInputElement)?.value
		const confirmPassword = (form.querySelector('input[name="confirmPassword"]') as HTMLInputElement)?.value

		if (!full_name?.trim() || !email?.trim() || !password) {
			setError("Please fill in full name, email and password.")
			return
		}
		if (password !== confirmPassword) {
			setError("Passwords do not match.")
			return
		}
		const terms = (form.querySelector('input[name="terms"]') as HTMLInputElement)?.checked
		if (!terms) {
			setError("Please agree to the terms and conditions.")
			return
		}

		setSubmitting(true)
		try {
			const res = await fetch("/api/auth/register", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ full_name: full_name.trim(), email: email.trim(), password }),
			})
			const data = await res.json().catch(() => ({}))
			if (!res.ok) {
				setError(data.error ?? "Registration failed. Please try again.")
				return
			}
			router.push("/login")
		} catch {
			setError("Registration failed. Please try again.")
		} finally {
			setSubmitting(false)
		}
	}

	return (
		<>

			<Layout footerStyle={1}>
				<div className="container pt-140 pb-170">
					<div className="row">
						<div className="col-lg-5 mx-auto">
							<div className="register-content border rounded-3 px-md-5 px-3 ptb-50">
								<div className="text-center">
									<p className="neutral-1000 px-4 py-2 bg-2 text-sm-bold rounded-12 d-inline-flex align-items-center">Register</p>
									<h4 className="neutral-1000">Create an Account</h4>
								</div>
								<div className="form-login mt-30">
									<form onSubmit={handleSubmit} action="#">
										{error && <p className="text-danger small mb-2">{error}</p>}
										<div className="form-group">
											<input name="full_name" className="form-control username" type="text" placeholder="Enter Full Name" />
										</div>
										<div className="form-group">
											<input name="email" className="form-control email" type="email" placeholder="Email / Username" />
										</div>
										<div className="form-group">
											<input name="password" className="form-control password" type="password" placeholder="Enter Your Password" />
										</div>
										<div className="form-group">
											<input name="confirmPassword" className="form-control password" type="password" placeholder="Confirm Your Password" />
										</div>
										<div className="form-group my-3">
											<div className="box-remember-forgot">
												<div className="remeber-me d-flex align-items-center neutral-500">
													<input name="terms" className="cb-remember" type="checkbox" />
													I agree to term and conditions
												</div>
											</div>
										</div>
										<div className="form-group mb-30">
											<button type="submit" className="btn btn-primary w-100" disabled={submitting}>
												{submitting ? "Signing up…" : "Sign up"}
												<svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
													<path d="M8 15L15 8L8 1M15 8L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
												</svg>
											</button>
										</div>
										<p className="text-md-medium neutral-500 text-center">Or connect with your social account</p>
										<div className="box-button-logins">
											<Link className="btn btn-login btn-google mr-10" href="#">
												<img src="/assets/imgs/template/popup/google.svg" alt="Carento" />
												<span className="text-sm-bold">Sign up with Google</span>
											</Link>
											<Link className="btn btn-login mr-10" href="#">
												<img src="/assets/imgs/template/popup/facebook.svg" alt="Carento" />
											</Link>
											<Link className="btn btn-login" href="#">
												<img src="/assets/imgs/template/popup/apple.svg" alt="Carento" />
											</Link>
										</div>
										<p className="text-sm-medium neutral-500 text-center mt-70">Already have an account? <Link className="neutral-1000" href="/login">Login Here !</Link></p>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>

			</Layout>
		</>
	)
}