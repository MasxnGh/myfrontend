// app/blog/[slug]/page.js

export async function generateStaticParams() {
  return [
    { slug: "หนังสือ" },
    { slug: "เทคโนโลยี" },
    { slug: "ไอที" },
  ];
}

export default function BlogPost({ params }) {
  const { slug } = params;

  return (
    <div>
      <h1>บทความ: {slug}</h1>
      <p>เนื้อหาบทความ...</p>
    </div>
  );
}
