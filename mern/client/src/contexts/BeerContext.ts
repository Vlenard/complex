import { createContext } from "react";

export type BeerContextType = {
    beers: []
};

export const BeerContext = createContext<BeerContextType | undefined>(undefined);
