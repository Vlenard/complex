"use client";

import { useEffect, useRef, useState, type FC, type PropsWithChildren } from "react";
import { toast } from "sonner";
import { useI18n } from "@/components/i18n-provider";
import { BeerListContext } from "@/contexts/BeerListContext";
import type { BeerModel } from "@/models/BeerModel";
import GetBeersAction from "@/actions/GetBeersAction";
import DeleteBeerAction from "@/actions/DeleteBeerAction";

type BeerListState = {
    list: BeerModel[];
    query: Pick<BeerModel, "name">;
    isLoading: boolean;
};

const BeerListProvider: FC<PropsWithChildren> = (props) => {
    const { localization } = useI18n();
    const requestIdRef = useRef(0);

    const [beerListState, setBeerListState] = useState<BeerListState>({
        list: [],
        query: { name: "" },
        isLoading: false,
    });

    const setQuery = (query: Pick<BeerModel, "name">) => {
        setBeerListState((prev) => ({ ...prev, query }));
    };

    const deleteBeer = async (id: string) => {
        const result = await DeleteBeerAction(id);

        if (!result.success) {
            toast.error(localization.failedToDeleteBeer);
            return;
        }

        setBeerListState((prev) => ({ ...prev, list: prev.list.filter(beer => beer.id !== id) }));
        toast.info(localization.beerDeleted);
    };

    useEffect(() => {
        const requestId = ++requestIdRef.current;

        const fetchBeerList = async () => {
            setBeerListState((prev) => ({ ...prev, isLoading: true }));

            try {
                const data = await GetBeersAction(beerListState.query?.name || undefined);

                if (requestIdRef.current !== requestId) return;
                setBeerListState((prev) => ({ ...prev, list: data, isLoading: false }));
            } catch {
                if (requestIdRef.current !== requestId) return;
                toast.error(localization.failedToFetchBeerList);
                setBeerListState((prev) => ({ ...prev, isLoading: false }));
            }
        };

        fetchBeerList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [beerListState.query]);

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
