"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href) =>
    pathname === href ? "text-warning fw-semibold" : "text-white";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3 shadow-sm sticky-top">
      <div className="container">
        {/* Logo / Brand */}
        <Link href="/" className="navbar-brand fs-4 fw-bold text-white">
          MONDE
        </Link>

        {/* Toggle button for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNavbar"
          aria-controls="mainNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse justify-content-center" id="mainNavbar">
          <ul className="navbar-nav gap-lg-4 text-center">
            <li className="nav-item">
              <Link href="/" className={`nav-link ${isActive("/")}`}>
                HOME
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/brand" className={`nav-link ${isActive("/brand")}`}>
                BRAND
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/collection" className={`nav-link ${isActive("/collection")}`}>
                COLLECTION
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/blog" className={`nav-link ${isActive("/blog")}`}>
                BLOG
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" className={`nav-link ${isActive("/contact")}`}>
                CONTACT
              </Link>
            </li>
            {/* LOGIN shown even on mobile */}
            <li className="nav-item d-lg-none">
              <Link href="/login" className="nav-link text-warning fw-semibold">
                LOGIN
              </Link>
            </li>
          </ul>
        </div>

        {/* LOGIN button (right on large screens only) */}
        <div className="d-none d-lg-block">
          <Link href="/login" className="btn btn-outline-warning fw-semibold">
            LOGIN
          </Link>
        </div>
      </div>

      <style jsx>{`
        .nav-link {
          font-weight: 500;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          color: #ffc107 !important;
          text-shadow: 0 0 8px #ffc107;
        }
      `}</style>
    </nav>
  );
}
