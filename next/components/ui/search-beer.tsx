"use client";

import { use, type FC } from "react";
import { Input } from "./input";
import { BeerListContext } from "@/contexts/BeerListContext";
import { useI18n } from "@/components/i18n-provider";

const SearchBeer: FC = () => {

    const { localization } = useI18n();
    const beerList = use(BeerListContext);

    const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.target as HTMLInputElement;
        beerList.setQuery({ name: value });
    };

    return (
        <Input
            className="w-sm p-6"
            placeholder={localization.searchBeer}
            value={beerList.query.name} onChange={handleSearch} type="text" />
    )
}

export default SearchBeer;
