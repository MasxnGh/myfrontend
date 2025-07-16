'use client';
export default function Card() {
  const cards = [
    {
      img: "Card/card-01.jpeg",
      title: "Smart All-in-One PC",
      text: "The ultimate all-in-one solution for modern productivity and home entertainment.",
      updated: "Last updated 3 mins ago",
    },
    {
      img: "Card/card-02.jpeg",
      title: "Funny Meme",
      text: "Sometimes humor is the best tech support. Lighten up your day with a meme.",
      updated: "Last updated 10 mins ago",
    },
    {
      img: "Card/card-03.jpeg",
      title: "Classic Desktop Setup",
      text: "A traditional yet reliable desktop workstation for any professional use.",
      updated: "Last updated 1 hour ago",
    },
  ];

  return (
    <div className="container py-5">
      <div className="row g-4">
        {cards.map((card, index) => (
          <div className="col-12 col-sm-6 col-md-4" key={index}>
            <div className="card card-hover h-100 border-0 shadow-sm">
              <div className="card-img-wrapper">
                <img
                  src={card.img}
                  className="card-img-top"
                  alt={card.title}
                />
              </div>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{card.title}</h5>
                <p className="card-text flex-grow-1">{card.text}</p>
                <p className="card-text">
                  <small className="text-muted">{card.updated}</small>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 💅 Style เฉพาะลูกเล่น Hover */}
      <style jsx>{`
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .card-img-wrapper {
          overflow: hidden;
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
        }

        .card-img-wrapper img {
          transition: transform 0.4s ease;
          width: 100%;
          height: 220px;
          object-fit: cover;
        }

        .card-hover:hover img {
          transform: scale(1.08);
        }
      `}</style>
    </div>
  );
}
