import { use, type FC } from "react"
import { Input } from "./input";
import { BeerListContext } from "@/contexts/BeerListContext";
import { I18nContext } from "@/contexts/I18nContext";

const SearchBeer: FC = () => {

    const i18n = use(I18nContext);
    const beerList = use(BeerListContext);

    const handleSearch = (e: React.FormEvent<HTMLInputElement>) => {
        const { value } = e.target as HTMLInputElement;
        beerList.setQuery({ name: value });
    };

    return (
        <Input
            className="w-sm p-6"
            placeholder={i18n.localization.searchBeer}
            value={beerList.query.name} onChange={handleSearch} type="text" />
    )
}

export default SearchBeer;
