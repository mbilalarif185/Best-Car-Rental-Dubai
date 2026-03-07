import UserSidebar from "./UserSidebar";
import Header from "@/components/about_sections/header";
import type { VendorSidebarData } from "@/lib/dashboard";

interface UserDashboardShellProps {
  title: string;
  breadcrumbLabel: string;
  children: React.ReactNode;
  initialSidebarData?: VendorSidebarData | null;
}

export default function UserDashboardShell({
  title,
  breadcrumbLabel,
  children,
  initialSidebarData,
}: UserDashboardShellProps) {
  return (
    <div className="main">
      <Header
        title={title}
        currentPage={breadcrumbLabel}
        backgroundImage="/assets/imgs/page-header/banner.webp"
      />

      <section className="box-section background-body pt-80 pb-110 dashboard">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4">
              <UserSidebar initialSidebarData={initialSidebarData} />
            </div>
            <div className="col-xl-9 col-lg-8">{children}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
