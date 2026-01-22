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
    <>
    <h1><center>Contact</center></h1>
    </>
  );
}
