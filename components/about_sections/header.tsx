import Link from "next/link"
import Image from "next/image"
type HeaderProps = {
	title: string;
	subtitle?: string;
	currentPage: string;
	backgroundImage?: string;
  };
  
const Header = ({ title, subtitle, currentPage, backgroundImage }: HeaderProps) => {
	return (
		<header>
			<div className="page-header pt-30 background-body">
				<div className="custom-container position-relative mx-auto">
					<div className="bg-overlay rounded-12 overflow-hidden">
						<Image
							className="w-100 h-100 img-banner"
							src={backgroundImage || "/assets/imgs/page-header/banner.png"}
							alt={title}
							width={833}
							height={280}
							priority
							
							
						
						/>
					</div>

					<div className="container position-absolute z-1 top-50 start-50 translate-middle ">
						<h1 className="text-white">{title}</h1>
						{subtitle && <p className="text-white text-xl-medium" dangerouslySetInnerHTML={{ __html: subtitle }}/>}
					</div>

					<div className="background-body position-absolute z-1 top-100 start-50 translate-middle px-3 py-2 rounded-12 border d-flex gap-3">
						<Link href="/" className="neutral-700 text-md-medium">Home</Link>
						<span>
							<img src="/assets/imgs/template/icons/arrow-right.svg" alt="arrow" />
						</span>
						<span className="neutral-1000 text-md-bold">{currentPage}</span>
					</div>
				</div>
			</div>
		</header>
	);
};


export default Header;
