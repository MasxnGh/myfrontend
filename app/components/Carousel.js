'use client';

import Image from 'next/image';
import { useEffect } from 'react';

export default function ShoeCarousel() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  const slides = [
    {
      img: "/images/sliders/sliders01.avif",
      alt: "Nike Air Max",
      heading: "Step Into Your Style",
      description: "รองเท้าแฟชั่นคุณภาพ พร้อมลุคใหม่ที่สะกดทุกสายตา",
      ctaText: "ดูสินค้า",
      ctaLink: "/products",
    },
    {
      img: "/images/sliders/sliders02.jpg",
      alt: "Classic Sneaker",
      heading: "Classic Never Dies",
      description: "ความงามที่ยืนยง กับสไตล์ที่ไม่เคยตกยุค",
      ctaText: "คอลเลกชันคลาสสิค",
      ctaLink: "/collections/classic",
    },
    {
      img: "/images/sliders/sliders03.jpg",
      alt: "Sport Shoes",
      heading: "Run With Purpose",
      description: "สปอร์ตลุค พร้อมพลังในการเคลื่อนไหวทุกจังหวะ",
      ctaText: "ดูรองเท้ากีฬา",
      ctaLink: "/collections/sport",
    },
  ];

  return (
    <div
      id="shoeCarousel"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      data-bs-interval="7000"
      style={{ backgroundColor: 'transparent', padding: '4rem 2rem', position: 'relative' }}
    >
      {/* Indicators */}
      <div className="carousel-indicators">
        {slides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            data-bs-target="#shoeCarousel"
            data-bs-slide-to={idx}
            className={idx === 0 ? 'active' : ''}
            aria-current={idx === 0 ? 'true' : undefined}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      <div className="carousel-inner">
        {slides.map((slide, idx) => (
          <div key={idx} className={`carousel-item text-center ${idx === 0 ? 'active' : ''}`}>
            <div className="content-wrapper d-flex flex-column flex-md-row align-items-center justify-content-center gap-3">
              <div className="image-wrapper position-relative">
                <Image
                  src={slide.img}
                  alt={slide.alt}
                  width={480}
                  height={480}
                  style={{ objectFit: 'contain', background: 'transparent' }}
                  priority={idx === 0}
                />
              </div>
              <div className="text-wrapper text-start text-md-start">
                <h2 className="fw-semibold">{slide.heading}</h2>
                <p className="text-muted">{slide.description}</p>
                <a href={slide.ctaLink} className="btn btn-primary btn-lg rounded-pill d-inline-flex align-items-center gap-3 mt-3">
                  {slide.ctaText}
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M10.146 4.146a.5.5 0 0 1 .708 0L14 7.293a.5.5 0 0 1 0 .707l-3.146 3.147a.5.5 0 0 1-.708-.708L12.293 8H2.5a.5.5 0 0 1 0-1h9.793L10.146 4.854a.5.5 0 0 1 0-.708z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom Controls with arrow icons */}
      <button className="carousel-control-prev custom-arrow" type="button" data-bs-target="#shoeCarousel" data-bs-slide="prev">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="black" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M5.854 4.146a.5.5 0 0 0-.708 0L2 7.293a.5.5 0 0 0 0 .707l3.146 3.147a.5.5 0 0 0 .708-.708L3.707 8l2.147-2.146a.5.5 0 0 0 0-.708z" />
          </svg>
        </span>
      </button>
      <button className="carousel-control-next custom-arrow" type="button" data-bs-target="#shoeCarousel" data-bs-slide="next">
        <span>
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="black" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M10.146 4.146a.5.5 0 0 1 .708 0L14 7.293a.5.5 0 0 1 0 .707l-3.146 3.147a.5.5 0 0 1-.708-.708L12.293 8 10.146 5.854a.5.5 0 0 1 0-.708z" />
          </svg>
        </span>
      </button>

      <style jsx>{`
        #shoeCarousel {
          max-width: 100vw;
          background: transparent;
          position: relative;
        }

        .carousel-indicators {
          position: absolute;
          bottom: 15px;
          left: 0;
          width: 100%;
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          z-index: 30;
        }

        .carousel-indicators button {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: none;
          background-color: #ffcc33;
          opacity: 0.5;
          transition: opacity 0.3s ease;
          cursor: pointer;
        }

        .carousel-indicators button.active {
          opacity: 1;
          background-color: #ffb347;
        }

        .carousel-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
          overflow: visible !important;
        }

        .content-wrapper {
          gap: 1rem;
          align-items: center;
          justify-content: center;
          display: flex;
          flex-wrap: wrap;
        }

        .image-wrapper {
          width: 480px;
          height: 480px;
          filter: drop-shadow(0 20px 25px rgba(0, 0, 0, 0.18));
          transition: filter 0.3s ease, transform 0.3s ease;
          background: transparent !important;
        }

        .image-wrapper:hover {
          filter: drop-shadow(0 30px 40px rgba(0, 0, 0, 0.25));
          transform: scale(1.05);
        }

        .text-wrapper {
          max-width: 480px;
          text-align: left;
        }

        .btn-primary {
          background-color: #ffb347;
          border-color: #ffb347;
          color: #fff;
          transition: background-color 0.3s ease, color 0.3s ease;
        }

        .btn-primary:hover {
          background-color: #ffa500;
          border-color: #ffa500;
          color: #fff;
        }

        .custom-arrow {
          background: white;
          width: 54px;
          height: 54px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          top: 50%;
          transform: translateY(-50%);
          position: absolute;
          cursor: pointer;
          z-index: 40;
        }

        .carousel-control-prev.custom-arrow {
          left: -60px;
        }

        .carousel-control-next.custom-arrow {
          right: -60px;
        }

        .custom-arrow span svg {
          fill: black;
        }

        @media (max-width: 768px) {
          .custom-arrow {
            width: 42px;
            height: 42px;
          }
          .carousel-control-prev.custom-arrow {
            left: 10px;
          }
          .carousel-control-next.custom-arrow {
            right: 10px;
          }
          .content-wrapper {
            flex-direction: column;
          }
          .text-wrapper {
            max-width: 100%;
            text-align: center;
          }
          .image-wrapper {
            width: 320px;
            height: 320px;
          }
        }
      `}</style>
    </div>
  );
}
