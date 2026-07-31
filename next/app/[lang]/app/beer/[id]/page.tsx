import { redirect } from "next/navigation";

export default async function BeerPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;

  redirect(`/${lang}/app/beer/${id}/edit`);
}
