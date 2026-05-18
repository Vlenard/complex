import type { BeerModel } from "@/models/BeerModel";
import { createContext } from "react";

export type BeerListContextType = {
    beerList: BeerModel[];
    isLoading: boolean;
    query: Pick<BeerModel, "name">;
    setQuery: (query: Pick<BeerModel, "name">) => void;
};

export const BeerListContext = createContext<BeerListContextType>({} as BeerListContextType);
