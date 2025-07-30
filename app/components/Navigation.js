"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Navigation() {
  const pathname = usePathname();

  const links = [
    { name: "HOME", href: "/" },
    { name: "BRAND", href: "/brand" },
    { name: "COLLECTION", href: "/collection" },
    { name: "BLOG", href: "/blog" },
    { name: "CONTACT", href: "/contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 60 }}
      className="navbar navbar-expand-lg navbar-dark bg-dark py-3 shadow-lg sticky-top"
    >
      <div className="container">
        {/* Logo */}
        <Link href="/" className="navbar-brand fs-3 fw-bold text-white">
          <motion.span whileHover={{ scale: 1.1, color: "#ffc107" }}>MONDE</motion.span>
        </Link>

        {/* Toggler */}
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

        {/* Links */}
        <div className="collapse navbar-collapse justify-content-center" id="mainNavbar">
          <ul className="navbar-nav gap-lg-4 text-center position-relative">
            {links.map(({ name, href }) => (
              <li key={href} className="nav-item position-relative">
                <Link
                  href={href}
                  className={`nav-link ${pathname === href ? "text-warning fw-bold" : "text-white"}`}
                >
                  <motion.span whileHover={{ scale: 1.1 }}>{name}</motion.span>
                  {pathname === href && (
                    <motion.div
                      layoutId="underline"
                      className="underline"
                      style={{
                        position: "absolute",
                        height: "2px",
                        backgroundColor: "#ffc107",
                        bottom: 0,
                        left: 0,
                        right: 0,
                      }}
                    />
                  )}
                </Link>
              </li>
            ))}

            {/* Mobile Login */}
            <li className="nav-item d-lg-none">
              <Link href="/login" className="nav-link text-warning fw-semibold">
                LOGIN
              </Link>
            </li>
          </ul>
        </div>

        {/* Desktop Login */}
        <div className="d-none d-lg-block">
          <motion.div whileHover={{ scale: 1.05 }}>
            <Link href="/login" className="btn btn-outline-warning fw-semibold shadow-sm px-4">
              LOGIN
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Custom Style */}
      <style jsx>{`
        .nav-link {
          font-weight: 500;
          font-size: 1rem;
          transition: all 0.3s ease;
        }

        .nav-link:hover {
          color: #ffc107 !important;
          text-shadow: 0 0 6px #ffc107;
        }

        .underline {
          border-radius: 9999px;
          height: 3px;
          background-color: #ffc107;
        }
      `}</style>
    </motion.nav>
  );
}
