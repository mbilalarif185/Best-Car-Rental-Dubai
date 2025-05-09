import Link from "next/link";
import categorydata from "@/util/categories.json";
import Image from "next/image"
interface HeaderProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  breadcrumbLabel?: string;
  breadcrumbUrl?: string;
  categorySlug?: string; 
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  imageUrl,
  breadcrumbLabel,
  breadcrumbUrl,
  categorySlug,
}) => {
    // Convert array to lookup object
    const categoryData = Object.fromEntries(
      categorydata.map((item) => [
        item.name.trim().toLowerCase(),
        {
          title: item.name,
         
          bannerImage: item["banner-image"], 
          Image1:item.image,
        },
      ])
    );

      const config = categorySlug ? categoryData[categorySlug] : null;
 
    const finalTitle = title || config?.title || "Explore Our Cars";
    
    const finalImageUrl = imageUrl || config?.bannerImage || config?.Image1 || "/assets/imgs/page-header/banner.png";
  
  
  return (
    <header>
      <div className="page-header pt-30 background-body">
        <div className="custom-container position-relative mx-auto">
          <div className="bg-overlay rounded-12 overflow-hidden">
            <Image className="w-100 h-100 img-banner" 
            src={finalImageUrl}
            alt={finalTitle}
            
            width={833}
            height={280} />
          </div>
          <div className="container position-absolute z-1 top-50 start-50 translate-middle text-center ">
            <h1 className="text-white">{finalTitle} Rental Dubai</h1>
            
          </div>
          <div className="background-body position-absolute z-1 top-100 start-50 translate-middle px-3 py-2 rounded-12 border d-flex gap-3">
            <Link href="/" className="neutral-700 text-md-medium">Home</Link>
            <span>
              <img src="/assets/imgs/template/icons/arrow-right.svg" alt="Arrow" />
            </span>
            <Link href="/luxury-fleet" className="neutral-700 text-md-medium">Fleet</Link>
            <span>
              <img src="/assets/imgs/template/icons/arrow-right.svg" alt="Arrow" />
            </span>
            {breadcrumbUrl ? (
              <Link href={breadcrumbUrl} className="neutral-1000 text-md-bold">
                {finalTitle}
              </Link>
            ) : (
                
              <span className="neutral-1000 text-md-bold">{finalTitle}</span>
            )}
          </div>
          
        </div>
      </div>
    </header>
  );
};

export default Header;
