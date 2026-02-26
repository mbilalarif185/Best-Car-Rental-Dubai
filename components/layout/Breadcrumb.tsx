"use client";

import Link from "next/link";

type BreadcrumbProps = {
  breadcrumbTitle?: string;
};

export default function Breadcrumb({ breadcrumbTitle }: BreadcrumbProps) {
  if (!breadcrumbTitle) return null;

  return (
    <section className="box-section box-breadcrumb background-body border-bottom">
      <div className="container-fluid">
        <div className="d-flex flex-wrap align-items-center gap-2 py-3 min-w-0">
          <nav className="d-flex align-items-center gap-2 min-w-0" aria-label="Breadcrumb">
            <Link href="/" className="text-neutral-700 text-md-medium text-decoration-none">
              Home
            </Link>
            <span className="text-neutral-500" aria-hidden>/</span>
            <span className="neutral-1000 text-md-bold text-truncate">{breadcrumbTitle}</span>
          </nav>
        </div>
      </div>
    </section>
  );
}
