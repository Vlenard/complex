import BeerListProvider from "@/providers/BeerListProvider";
import SearchBeer from "@/components/ui/search-beer";
import { use, type FC } from "react";
import { Button } from "../ui/button";
import { I18nContext } from "@/contexts/I18nContext";
import { LangSelector } from "../ui/lang-selector";
import { AuthContext } from "@/contexts/AuthContext";
import { UserContext } from "@/contexts/UserContext";
import BeerList from "../ui/beer-list";
import { useNavigate } from "react-router";
import { LogOut } from "lucide-react";

const Home: FC = () => {

    const i18n = use(I18nContext);
    const auth = use(AuthContext);
    const userctx = use(UserContext);
    const navigate = useNavigate();

    return (
        <BeerListProvider>
            <div className="min-h-screen w-full flex flex-col *:px-8 *:py-4">
                <div className="sticky w-full top-0 flex justify-center bg-white/60 backdrop-blur-2xl">
                    <div className="absolute w-fit flex justify-center space-x-2">
                        <SearchBeer />
                        <Button onClick={() => navigate("beer/create")} className="p-6 h-12">
                            {i18n.localization.add}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                        </Button>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="text-xl gradiant-text py-2">
                            Hello {userctx.user?.name}
                        </div>
                        <div className="flex space-x-2">
                            <LangSelector />
                            <Button variant="ghost" className="p-6" onClick={auth.signOut}>
                                {i18n.localization.signOut}
                                <LogOut className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="flex-1 text-center">
                    <BeerList />
                </div>
            </div>
        </BeerListProvider>
    );
}
export default Home
