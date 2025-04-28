import Link from "next/link"
const Header=()=>{
    return(
        <header>
        <div className="page-header pt-30 background-body">
						<div className="custom-container position-relative mx-auto">
							<div className="bg-overlay rounded-12 overflow-hidden">
								<img className="w-100 h-100 img-banner" src="/assets/imgs/page-header/banner.png" alt="Carento" />
							</div>
							<div className="container position-absolute z-1 top-50 start-50 translate-middle">
								<h2 className="text-white">About Us</h2>
								<span className="text-white text-xl-medium">Get the latest news, updates and tips</span>
							</div>
							<div className="background-body position-absolute z-1 top-100 start-50 translate-middle px-3 py-2 rounded-12 border d-flex gap-3 @@navigation-page">
								<Link href="/" className="neutral-700 text-md-medium">Home</Link>
								<span>
									<img src="/assets/imgs/template/icons/arrow-right.svg" alt="Carento" />
								</span>
								<Link href="#" className="neutral-1000 text-md-bold">About Us</Link>
							</div>
						</div>
					</div>
        </header>
        
    );
};

export default Header;
