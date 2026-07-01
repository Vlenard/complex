"use client";

import Link from "next/link";
import { useI18n } from "@/components/i18n-provider";
import { Badge } from "./badge";
import { Button } from "./button";

export type Beer = {
  id: string;
  name: string;
  type: "lager" | "ipa" | "apa" | "stout" | "porter";
  note?: string;
  rate: number;
  alcohol: number;
};

export const initialBeers: Beer[] = [
  {
    id: "1",
    name: "Pilsner Urquell",
    type: "lager",
    note: "Crisp, golden lager with a floral hop aroma.",
    rate: 8,
    alcohol: 4.4,
  },
  {
    id: "2",
    name: "Guinness Draught",
    type: "stout",
    note: "Creamy, roasted stout that goes down dangerously smooth.",
    rate: 9,
    alcohol: 4.2,
  },
  {
    id: "3",
    name: "Sierra Nevada Torpedo",
    type: "ipa",
    note: "Bold citrus and pine bitterness with a firm malt backbone.",
    rate: 7,
    alcohol: 7.2,
  },
];

type BeerListProps = {
  beers: Beer[];
  onDelete: (id: string) => void;
};

export function BeerList({ beers, onDelete }: BeerListProps) {
  const { localization, language } = useI18n();

  return (
    <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-4">
      {beers.map((beer) => (
        <div key={beer.id} className="w-80 rounded-3xl shadow">
          <div className="relative group">
            <div className="w-full h-70 rounded-t-3xl bg-muted flex items-center justify-center text-6xl">
              🍺
            </div>
            {beer.note && (
              <div className="absolute top-0 left-0 w-full h-full rounded-t-2xl backdrop-blur-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity p-2">
                <p className="text-start font-bold text-sm">{beer.note}</p>
              </div>
            )}
          </div>
          <div className="p-4">
            <h2 className="text-2xl font-bold">{beer.name}</h2>
            <div className="flex space-x-2 justify-center items-center mt-2">
              <Badge variant="default" className="p-4 h-12 text-lg">
                {beer.rate}
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                </svg>
              </Badge>
              <Button asChild className="p-4 h-12 rounded-full" variant="secondary">
                <Link href={`/${language}/app/beer/${beer.id}`}>
                  {localization.modify}
                </Link>
              </Button>
              <Button
                onClick={() => onDelete(beer.id)}
                className="p-4 h-12 w-12 rounded-full"
                variant="destructive"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BeerList;
