import { connectDB } from "@/lib/db";
import { Beer } from "@/models/Beer";
import Auth from "@/lib/Auth";
import EditBeer, { type EditBeerData } from "@/components/pages/EditBeer";

export default async function EditBeerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  await connectDB();
  const user = await Auth.getUser();

  let beer: EditBeerData | null = null;
  try {
    const beerDoc = user
      ? await Beer.findOne({ _id: id, owner: user.id })
      : null;
    beer = beerDoc ? JSON.parse(JSON.stringify(beerDoc.toJSON())) : null;
  } catch {
    beer = null;
  }

  return <EditBeer id={id} beer={beer} userName={user?.name} />;
}
