import Auth from "@/lib/Auth";
import CreateBeer from "@/components/pages/CreateBeer";

export default async function CreateBeerPage() {
  const user = await Auth.getUser();

  return <CreateBeer userName={user?.name} />;
}
