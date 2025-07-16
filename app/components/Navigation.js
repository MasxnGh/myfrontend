"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (href) =>
    pathname === href ? "nav-link active text-warning fw-semibold" : "nav-link text-white";

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-navbar shadow-sm py-3 sticky-top">
      <div className="container">
        {/* Logo */}
        <Link href="/" className="navbar-brand fs-4 fw-bold text-glow">
          WEBTEST
        </Link>

        {/* Toggle (Mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMain"
          aria-controls="navbarMain"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Menu */}
        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/" className={isActive("/")}>
                หน้าแรก
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" className={isActive("/about")}>
                เกี่ยวกับเรา
              </Link>
            </li>
            <li className="nav-item">
              <span className="nav-link text-white">เร็ว ๆ นี้</span>
            </li>
          </ul>

          {/* 👉 Login Button */}
          <div className="d-flex">
            <Link href="/login" className="btn btn-warning fw-semibold px-4">
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </div>

      {/* 🎨 CSS */}
      <style jsx>{`
        .bg-navbar {
          background: linear-gradient(to right, #111111, #1c1c1c);
        }

        .text-glow {
          color: white;
          text-shadow: 0 0 8px #ffc107, 0 0 12px #ff9100;
        }

        .nav-link {
          transition: all 0.3s ease;
          padding: 8px 14px;
          font-size: 1rem;
        }

        .nav-link:hover {
          color: #ffc107 !important;
          text-shadow: 0 0 8px #ffc107;
        }

        .btn-warning {
          transition: box-shadow 0.3s ease;
        }

        .btn-warning:hover {
          box-shadow: 0 0 10px #ffc107;
        }
      `}</style>
    </nav>
  );
}
