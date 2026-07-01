"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { useI18n } from "@/components/i18n-provider";
import { LangSelector } from "@/components/ui/lang-selector";
import { Button } from "@/components/ui/button";
import BeerList, { initialBeers, type Beer } from "@/components/ui/beer-list";
import LogoutAction from "@/actions/LogoutAction";

const extraBeerPool: Beer[] = [
  {
    id: "4",
    name: "Founders Porter",
    type: "porter",
    note: "Dark chocolate and coffee notes with a smooth finish.",
    rate: 8,
    alcohol: 6.5,
  },
  {
    id: "5",
    name: "Stone APA",
    type: "apa",
    note: "Balanced malt sweetness with a citrusy hop bite.",
    rate: 7,
    alcohol: 5.9,
  },
];

export default function App() {
  const { localization } = useI18n();
  const [beers, setBeers] = useState<Beer[]>(initialBeers);
  const [poolIndex, setPoolIndex] = useState(0);

  const handleAdd = () => {
    const template = extraBeerPool[poolIndex % extraBeerPool.length];
    setBeers((prev) => [...prev, { ...template, id: crypto.randomUUID() }]);
    setPoolIndex((index) => index + 1);
  };

  const handleDelete = (id: string) => {
    setBeers((prev) => prev.filter((beer) => beer.id !== id));
  };

  return (
    <div className="min-h-screen w-full flex flex-col *:px-8 *:py-4">
      <div className="sticky w-full top-0 flex justify-between items-center bg-white/60 backdrop-blur-2xl">
        <div className="text-xl gradiant-text py-2">Rbeer</div>
        <div className="flex space-x-2 items-center">
          <Button onClick={handleAdd} className="p-6 h-12">
            {localization.add}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
          </Button>
          <LangSelector />
          <form action={LogoutAction}>
            <Button type="submit" variant="ghost" className="p-6 h-12">
              {localization.signOut}
              <LogOut className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </div>

      <div className="flex-1 text-center">
        <BeerList beers={beers} onDelete={handleDelete} />
      </div>
    </div>
  );
}
