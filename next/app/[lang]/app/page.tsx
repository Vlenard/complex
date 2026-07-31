import Auth from "@/lib/Auth";
import Home from "@/components/pages/Home";

export default async function App() {
  const user = await Auth.getUser();

  return <Home userName={user?.name} />;
}
