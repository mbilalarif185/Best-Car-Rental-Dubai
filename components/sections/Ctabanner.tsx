import Link from "next/link";

export default function CtaBanner() {
    return (
        <section className="section-box-banner-3 banner-2 background-body">
            <div className="container pt-110 pb-110 position-relative z-1">
                <div className="row justify-content-center">
                    <div className="col-auto text-center wow fadeInUp justify-content-center d-flex flex-column align-items-center">
                        <h2 className="text-white">Best Car Rent Deals</h2>
                        <h3 className="text-white text-md mt-10">
                            Save 10% or more when you book and ride <br />
                            before 1 June 2025
                        </h3>
                        <Link href="/contact" aria-label="Find early 2025 car rental deals" className="btn btn-primary rounded-pill btn-lg mt-20">
                            Find Early 2025 Deals
                            <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} viewBox="0 0 25 24" fill="none">
                                <path d="M12.5 19L19.5 12L12.5 5M19.5 12L5.5 12" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
