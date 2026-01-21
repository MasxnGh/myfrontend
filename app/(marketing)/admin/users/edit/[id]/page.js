import EditClient from "./EditClient";

export default async function EditUserPage({ params }) {
  const { id } = await params; // 

  return <EditClient id={id} />;
}
