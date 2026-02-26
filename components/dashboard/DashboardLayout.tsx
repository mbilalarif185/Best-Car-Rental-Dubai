import PageHeader from "../shared/PageHeader";
import styles from "./DashboardLayout.module.css";

interface DashboardLayoutProps {
  title: string;
  breadcrumbLabel: string;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export default function DashboardLayout({
  title,
  breadcrumbLabel,
  sidebar,
  children,
}: DashboardLayoutProps) {
  return (
    <section className={styles.section}>
      <div className="container">
        <PageHeader title={title} breadcrumbLabel={breadcrumbLabel} />
        <div className={styles.grid}>
          <aside className={styles.sidebar}>{sidebar}</aside>
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    </section>
  );
}
