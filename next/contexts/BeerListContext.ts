import { createContext } from "react";
import type { BeerModel } from "@/models/BeerModel";

export type BeerListContextType = {
  beerList: BeerModel[];
  isLoading: boolean;
  query: Pick<BeerModel, "name">;
  setQuery: (query: Pick<BeerModel, "name">) => void;
  deleteBeer: (id: string) => void;
};

export const BeerListContext = createContext<BeerListContextType>({} as BeerListContextType);
