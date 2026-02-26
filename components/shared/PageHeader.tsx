import Link from "next/link";
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  title: string;
  breadcrumbLabel: string;
}

export default function PageHeader({ title, breadcrumbLabel }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.breadcrumb}>
        <Link href="/" className={styles.breadcrumbLink}>
          Home
        </Link>
        <span className={styles.separator}>/</span>
        <span className={styles.current}>{breadcrumbLabel}</span>
      </div>
      <h1 className={styles.title}>{title}</h1>
    </header>
  );
}
