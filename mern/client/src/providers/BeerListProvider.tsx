import { BeerListContext } from "@/contexts/BeerListContext";
import { HttpContext } from "@/contexts/HttpContext";
import { I18nContext } from "@/contexts/I18nContext";
import type { BeerModel } from "@/models/BeerModel";
import { use, useEffect, useState, type FC, type PropsWithChildren } from "react";
import { toast } from "sonner";

type BeerListState = {
    list: BeerModel[];
    query: Pick<BeerModel, "name"> | null;
    isLoading: boolean;
};

const BeerListProvider: FC<PropsWithChildren> = (props) => {
    const i18n = use(I18nContext);
    const http = use(HttpContext);

    const [beerListState, setBeerListState] = useState<BeerListState>({
        list: [],
        query: { name: "" },
        isLoading: false,
    });

    const setQuery = (query: Pick<BeerModel, "name"> | null) => {
        setBeerListState((prev) => ({ ...prev, query }));
    };

    const deleteBeer = async (id: string) => {
        const response = await http.fetch(`/beer/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            toast.error(i18n.localization.failedToDeleteBeer);
            return;
        }

        setBeerListState((prev) => ({ ...prev, list: prev.list.filter(beer => beer.id !== id) }));
        toast.info(i18n.localization.beerDeleted);
    };

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const fetchBeerList = async () => {
            setBeerListState((prev) => ({ ...prev, isLoading: true }));

            const params = new URLSearchParams();
            if (beerListState.query?.name !== "") {
                params.append("name", beerListState.query?.name || "");
            }

            try {
                const response = await http.fetch(`/beer?${params.toString()}`, {
                    method: "GET",
                    signal,
                });

                if (!response.ok) {
                    toast.error(i18n.localization.failedToFetchBeerList);
                    setBeerListState((prev) => ({ ...prev, isLoading: false }));
                    return;
                }

                const data = await response.json();
                setBeerListState((prev) => ({ ...prev, list: data, isLoading: false }));

            } catch (error: any) {
                if (error.name === "AbortError") {
                    return;
                }

                toast.error(i18n.localization.failedToFetchBeerList);
                setBeerListState((prev) => ({ ...prev, isLoading: false }));
            }
        };

        fetchBeerList();

        return () => {
            controller.abort();
        };
    }, [beerListState.query, http]);

    return (
        <BeerListContext.Provider value={{
            beerList: beerListState.list,
            query: beerListState.query,
            isLoading: beerListState.isLoading,
            setQuery,
            deleteBeer,
        }}>
            {props.children}
        </BeerListContext.Provider>
    );
};

export default BeerListProvider;
