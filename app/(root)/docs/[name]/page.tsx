import { documentation } from "@/constants/docs";

export default async function DocsPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;

  const doc = documentation.find((doc) => doc.name === name);

  return (
    <div className="mb-11">
      <h1 className="text-3xl font-bold mb-3">{doc?.title}</h1>
      {doc?.content}
    </div>
  );
}
