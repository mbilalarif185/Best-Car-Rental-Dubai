import Link from "next/link";

export default function CtaBanner() {
    return (
        <section className="section-box-banner-3 banner-2 background-body">
            <div className="container pt-110 pb-110 position-relative z-1">
                <div className="row justify-content-center">
                    <div className="col-auto text-center wow fadeInUp justify-content-center d-flex flex-column align-items-center">
                        <h2 className="text-white">Explore and Enjoy the Best Car Rental Deals</h2>
                        <p className="text-white text-md mt-10">
                          Save up to 10% on luxury car rentals in Dubai by booking before June 1st, 2025.
                           Get affordable car rental rates in UAE.

                        </p>
                        <Link  href="https://wa.me/971545514155?text=Thank%20you!%20We%20appreciate%20your%20support%20—%20looking%20forward%20to%20hearing%20your%20feedback%20as%20you%20explore%20the%20portal."
                        target="_blank"
                        rel="noopener noreferrer" 
                        aria-label="Get Best Car Rental Deals Now" 
                        className="btn btn-primary rounded-pill btn-lg mt-20">
                           Get Best Deals Now
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
