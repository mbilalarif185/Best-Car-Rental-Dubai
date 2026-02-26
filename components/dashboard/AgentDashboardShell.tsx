import AgentSidebar from "./AgentSidebar";
import Header from "@/components/about_sections/header";

interface AgentDashboardShellProps {
  title: string;
  breadcrumbLabel: string;
  children: React.ReactNode;
}

export default function AgentDashboardShell({
  title,
  breadcrumbLabel,
  children,
}: AgentDashboardShellProps) {
  return (
    <div className="main">
      <Header
        title={title}
        currentPage={breadcrumbLabel}
        backgroundImage="/assets/imgs/page-header/banner.webp"
      />
      <section className="box-section background-body pt-80 pb-110 dashboard">
        <div className="container px-2 px-sm-3 px-lg-4">
          <div className="row g-2 g-lg-2">
            <div className="col-12 col-lg-4 col-xl-3">
              <AgentSidebar />
            </div>
            <div className="col-12 col-lg-7 col-xl-8">{children}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
