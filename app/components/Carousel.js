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
      heading: "Stylish Shoes",
      subheading: "Nike Air Flight 89",
      ctaText: "BUY NOW",
      ctaLink: "/products",
    },
    {
      img: "/images/sliders/sliders02.jpg",
      alt: "Classic Sneaker",
      heading: "Classic Never Dies",
      subheading: "Nike Classic Collection",
      ctaText: "SHOP NOW",
      ctaLink: "/collections/classic",
    },
    {
      img: "/images/sliders/sliders03.jpg",
      alt: "Sport Shoes",
      heading: "Run With Purpose",
      subheading: "Nike Sport Series",
      ctaText: "VIEW SPORT",
      ctaLink: "/collections/sport",
    },
  ];

  return (
    <div
      id="shoeCarousel"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="5000"
    >
      <div className="carousel-inner">
        {slides.map((slide, idx) => (
          <div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
            <div className="carousel-content">
              <div className="container">
                <div className="row align-items-center">
                  {/* Text */}
                  <div className="col-md-6 text-center text-md-start text-white slide-text">
                    <h1 className="fw-bold display-4">{slide.heading}</h1>
                    <h3 className="fw-semibold">{slide.subheading}</h3>
                    <a href={slide.ctaLink} className="btn btn-dark btn-lg mt-3 px-4 rounded-pill btn-cta">
                      {slide.ctaText}
                    </a>
                  </div>
                  {/* Image */}
                  <div className="col-md-6 text-center slide-image">
                    <Image
                      src={slide.img}
                      alt={slide.alt}
                      width={400}
                      height={400}
                      style={{ objectFit: 'contain' }}
                      priority={idx === 0}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#shoeCarousel"
        data-bs-slide="prev"
        aria-label="Previous Slide"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#shoeCarousel"
        data-bs-slide="next"
        aria-label="Next Slide"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>

      <style jsx>{`
        .carousel-content {
          background-color: #d32f2f; /* แดงสด */
          padding: 4rem 0;
          overflow: hidden;
        }
        h1, h3 {
          margin-bottom: 0.5rem;
          opacity: 0;
          transform: translateX(-30px);
          animation: slideInText 0.8s forwards;
        }
        .carousel-item.active h1,
        .carousel-item.active h3 {
          opacity: 1;
          transform: translateX(0);
          animation: slideInText 0.8s forwards;
        }
        .btn-dark.btn-cta {
          font-weight: 700;
          transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .btn-dark.btn-cta:hover,
        .btn-dark.btn-cta:focus {
          background-color: #000000ff;
          color: #ffffffff;
          transform: scale(1.05);
          box-shadow: 0 0 15px #000000aa;
        }
        /* Controls ปรับใหญ่และเพิ่ม transition */
        .carousel-control-prev,
        .carousel-control-next {
          width: 6%;
          filter: drop-shadow(0 0 5px rgba(0,0,0,0.7));
          transition: transform 0.3s ease, filter 0.3s ease;
          cursor: pointer;
        }
        .carousel-control-prev:hover,
        .carousel-control-next:hover {
          transform: scale(1.3);
          filter: drop-shadow(0 0 15px #000000ff);
        }
        /* Fade in/out smoother */
        .carousel-item {
          transition: opacity 1s ease;
        }

        /* Text slide in animation */
        @keyframes slideInText {
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 768px) {
          .carousel-content {
            padding: 3rem 1rem;
            text-align: center;
          }
          h1 {
            font-size: 2rem;
          }
          h3 {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
}
