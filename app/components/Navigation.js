'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // กัน hydration mismatch
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // login = มี token
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    setIsLoggedIn(false);
    router.push("/"); // กลับหน้า Home
  };

  if (!mounted) return null;

  const links = [
    { name: "HOME", href: "/" },
    { name: "BRAND", href: "/brand" },
    { name: "COLLECTION", href: "/collection" },
    { name: "BLOG", href: "/blog" },
    { name: "CONTACT", href: "/contact" },
    ...(isLoggedIn ? [{ name: "ADMIN", href: "/admin/users" }] : []), // ADMIN สำหรับผู้ล็อกอิน
  ];

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 60 }}
      className="navbar navbar-expand-lg navbar-dark bg-dark py-3 shadow-lg sticky-top"
    >
      <div className="container">
        {/* Brand */}
        <Link href="/" className="navbar-brand fs-3 fw-bold text-white">
          <motion.span whileHover={{ scale: 1.1, color: "#ffc107" }}>MONDE</motion.span>
        </Link>

        {/* Toggle Mobile */}
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

        {/* Menu Links */}
        <div className="collapse navbar-collapse justify-content-center" id="mainNavbar">
          <ul className="navbar-nav gap-lg-4 text-center position-relative">
            {links.map(({ name, href }) => (
              <li key={href} className="nav-item position-relative">
                <Link
                  href={href}
                  className={`nav-link ${pathname === href ? "text-warning fw-bold" : "text-white"}`}
                  style={{ fontWeight: 500, fontSize: "1rem", transition: "all 0.3s ease" }}
                >
                  <motion.span whileHover={{ scale: 1.1 }}>{name}</motion.span>
                  {pathname === href && (
                    <motion.div
                      layoutId="underline"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "3px",
                        backgroundColor: "#ffc107",
                        borderRadius: "9999px",
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            ))}

            {/* Mobile Login / Logout */}
            <li className="nav-item d-lg-none mt-3">
              {isLoggedIn ? (
                <button
                  className="btn btn-outline-warning fw-semibold shadow-sm w-100"
                  onClick={handleLogout}
                >
                  Sign-out
                </button>
              ) : (
                <Link href="/signin" className="btn btn-outline-warning fw-semibold shadow-sm w-100">
                  Sign-in
                </Link>
              )}
            </li>
          </ul>
        </div>

        {/* Desktop Login / Logout */}
        <div className="d-none d-lg-block">
          <motion.div whileHover={{ scale: 1.05 }}>
            {isLoggedIn ? (
              <button
                className="btn btn-outline-warning fw-semibold shadow-sm px-4"
                onClick={handleLogout}
              >
                Sign-out
              </button>
            ) : (
              <Link href="/signin" className="btn btn-outline-warning fw-semibold shadow-sm px-4">
                Sign-in
              </Link>
            )}
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}