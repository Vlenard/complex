"use client";

import { useRouter } from "next/navigation";
import { useI18n } from "@/components/i18n-provider";
import { Button } from "@/components/ui/button";
import { LangSelector } from "@/components/ui/lang-selector";
import SearchBeer from "@/components/ui/search-beer";
import BeerList from "@/components/ui/beer-list";
import BeerListProvider from "@/providers/BeerListProvider";
import LogoutAction from "@/actions/LogoutAction";

type HomeProps = {
    userName?: string;
};

const Home = ({ userName }: HomeProps) => {

    const { localization, language } = useI18n();
    const router = useRouter();

    return (
        <BeerListProvider>
            <div className="min-h-screen w-full flex flex-col *:px-8 *:py-4">
                <div className="sticky w-full top-0 flex justify-center bg-white/60 backdrop-blur-2xl">
                    <div className="absolute w-fit flex justify-center space-x-2">
                        <SearchBeer />
                        <Button onClick={() => router.push(`/${language}/app/beer/create`)} className="p-6 h-12">
                            {localization.add}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                        </Button>
                    </div>
                    <div className="w-full flex justify-between">
                        <div className="text-xl gradiant-text py-2">
                            Hello {userName}
                        </div>
                        <div className="flex space-x-2">
                            <LangSelector />
                            <form action={LogoutAction}>
                                <Button type="submit" variant="ghost" className="p-6">
                                    {localization.signOut}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                      <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0z"/>
                                      <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                                    </svg>
                                </Button>
                            </form>
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
