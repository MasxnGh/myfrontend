'use client';

import Image from 'next/image';
import { useEffect } from 'react';

export default function Carousel() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  const slides = [
    {
      img: "/images/sliders/sliders01.jpg",
      alt: "Smart PC",
      heading: "Smart All-in-One PC",
      text: "สุดยอดคอมพิวเตอร์สำหรับงานและบันเทิง",
    },
    {
      img: "/images/sliders/sliders02.jpg",
      alt: "Banner Slide",
    },
    {
      img: "/images/sliders/sliders03.png",
      alt: "Classic Setup",
    },
  ];

  return (
    <div
      id="carouselExample"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      data-bs-interval="5000"
    >
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div
            className={`carousel-item position-relative ${index === 0 ? 'active' : ''}`}
            key={index}
          >
            <Image
              src={slide.img}
              className="d-block w-100"
              alt={slide.alt}
              width={1920}
              height={690}
              priority={index === 0}
              style={{ objectFit: 'cover' }}
            />
            <div className="carousel-text-overlay text-center">
              <h1>{slide.heading}</h1>
              <p>{slide.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon custom-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon custom-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>

      {/* CSS */}
      <style jsx>{`
        .carousel-text-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          z-index: 10;
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.7),
                       0 0 20px rgba(255, 193, 7, 0.6);
          animation: fadeInUp 1s ease-out;
        }

        .carousel-text-overlay h1 {
          font-size: 3.5rem;
          font-weight: 700;
          text-transform: uppercase;
          margin-bottom: 1rem;
        }

        .carousel-text-overlay p {
          font-size: 1.5rem;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translate(-50%, -60%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%);
          }
        }

        .custom-icon {
          filter: brightness(0.7) drop-shadow(0 0 6px white);
          transition: filter 0.3s ease;
        }

        .carousel-control-prev:hover .custom-icon,
        .carousel-control-next:hover .custom-icon {
          filter: brightness(1.2) drop-shadow(0 0 10px #ffc107);
        }
      `}</style>
    </div>
  );
}
