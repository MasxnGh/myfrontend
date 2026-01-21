"use client";

export default function Footer() {
  return (
    <footer className="footer-section py-5 mt-auto">
      <div className="container">
        <div className="row">

          {/* โลโก้และคำอธิบาย */}
          <div className="col-md-4 mb-4">
            <h5 className="footer-brand">WEBTEST</h5>
            <p className="text-white">
              WEBTEST
            </p>
          </div>

          {/* เมนู */}
          <div className="col-md-4 mb-4">
            <h6 className="text-white fw-semibold mb-3">เมนู</h6>
            <ul className="list-unstyled">
              <li><a href="/" className="footer-link">หน้าหลัก</a></li>
              <li><a href="/about" className="footer-link">เกี่ยวกับเรา</a></li>
              <li><a href="/services" className="footer-link">บริการ</a></li>
              <li><a href="/contact" className="footer-link">ติดต่อเรา</a></li>
            </ul>
          </div>

          {/* ช่องทางติดต่อ */}
          <div className="col-md-4 mb-4">
            <h6 className="text-white fw-semibold mb-3">ติดต่อเรา</h6>
            <p className="text-white">123/45 เชียงใหม่, ประเทศไทย</p>
            <p className="text-white">โทร: 099-999-9999</p>
            <div className="d-flex gap-3 mt-2">
              <a href="#" className="social-icon"><i className="bi bi-facebook"></i></a>
              <a href="#" className="social-icon"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="social-icon"><i className="bi bi-instagram"></i></a>
              <a href="#" className="social-icon"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

        </div>

        <hr className="border-secondary mt-4" />

        <p className="text-center text-white small mb-0">
          &copy; {new Date().getFullYear()} WEBTEST. All rights reserved.
        </p>
      </div>

      <style jsx>{`
        .footer-section {
          background: linear-gradient(to right, #0f0f0f, #1a1a1a);
          color: white;
        }

        .footer-brand {
          font-size: 1.8rem;
          font-weight: bold;
          text-shadow: 0 0 8px #ffc107;
        }

        .footer-link {
          color: white;
          text-decoration: none;
          display: inline-block;
          margin-bottom: 0.5rem;
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }

        .footer-link:hover {
          color: #ffc107;
          text-shadow: 0 0 8px #ffc107;
        }

        .social-icon {
          color: white;
          font-size: 1.5rem;
          transition: transform 0.3s ease, color 0.3s ease;
        }

        .social-icon:hover {
          color: #ffc107;
          transform: scale(1.2);
        }
      `}</style>
    </footer>
  );
}
