'use client';

export default function Card() {
  const cards = [
    {
      img: "Card/card-01.webp",
      title: "Nike Air Jordan 1",
      text: "รองเท้ารุ่นคลาสสิคที่เป็นตำนาน ใส่สบายและดูดีทุกโอกาส",
      ctaText: "ดูรายละเอียด",
      ctaLink: "#",
    },
    {
      img: "Card/card-02.webp",
      title: "Nike x Billie Eilish Alpha Force White and Red",
      text: "ดีไซน์โดดเด่นร่วมสมัย เหมาะสำหรับสายแฟชั่นล้ำยุค",
      ctaText: "ดูรายละเอียด",
      ctaLink: "#",
    },
    {
      img: "Card/card-03.webp",
      title: "Nike Men Full Force Low",
      text: "รองเท้าคลาสสิคใส่ได้ทุกวัน ดีไซน์เรียบง่ายแต่ดูดี",
      ctaText: "ดูรายละเอียด",
      ctaLink: "#",
    },
  ];

  return (
    <div className="container py-5">
      {/* หัวข้อ */}
      <h3 className="fw-bold fst-italic mb-4 section-title">
        Our Popular Products
      </h3>

      <div className="row g-5 justify-content-center">
        {cards.map((card, idx) => (
          <div className="col-12 col-sm-6 col-md-4" key={idx}>
            <div className="card card-float h-100 d-flex flex-column">
              <div className="card-img-wrapper">
                <img src={card.img} alt={card.title} loading="lazy" />
              </div>
              <div className="card-body d-flex flex-column flex-grow-1 px-0 pt-3 text-center">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text">{card.text}</p>
                <div className="mt-auto pt-2">
                  <a
                    href={card.ctaLink}
                    className="btn btn-outline-warning btn-sm shadow-sm"
                  >
                    {card.ctaText}
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .section-title {
          border-bottom: 2px solid #000;
          display: inline-block;
          padding-bottom: 4px;
        }
        /* สไตล์การ์ดเดิมของคุณ */
        .card-float {
          background: transparent;
          box-shadow: none;
          border: none;
          cursor: pointer;
          border-radius: 1rem;
          transition: transform 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 1rem;
        }
        .card-float:hover {
          transform: translateY(-10px) scale(1.04);
        }
        .card-img-wrapper {
          width: 100%;
          height: 280px;
          overflow: hidden;
          border-radius: 1rem;
          display: flex;
          justify-content: center;
          align-items: center;
          background: transparent;
        }
        .card-img-wrapper img {
          height: 100%;
          width: auto;
          object-fit: contain;
          transition: transform 0.5s ease, filter 0.5s ease;
          border-radius: 1rem;
        }
        .card-float:hover img {
          transform: scale(1.1);
          filter: brightness(1.1);
        }
        .card-title {
          font-weight: 700;
          font-size: 1.3rem;
          color: #222;
          letter-spacing: 0.02em;
          margin-bottom: 0.5rem;
        }
        .card-text {
          font-size: 1rem;
          color: #555;
          line-height: 1.4;
          margin-bottom: 1.2rem;
          min-height: 60px;
        }
        .btn-outline-warning {
          border-color: #ffc107;
          color: #ffc107;
          font-weight: 600;
          border-radius: 30px;
          padding: 0.35rem 1.3rem;
          transition: all 0.3s ease;
          box-shadow: 0 3px 6px rgba(255, 193, 7, 0.3);
          background: transparent;
          white-space: nowrap;
        }
        .btn-outline-warning:hover {
          background-color: #ffc107;
          color: #212529;
          box-shadow: 0 8px 20px rgba(255, 193, 7, 0.6);
          transform: translateY(-3px);
        }
        @media (max-width: 576px) {
          .card-img-wrapper {
            height: 220px;
          }
          .card-title {
            font-size: 1.15rem;
          }
          .card-text {
            font-size: 0.9rem;
            margin-bottom: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
