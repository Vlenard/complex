export type BeerModel = {
    id: string;
    name: string;
    type: "lager" | "ipa" | "apa" | "stout" | "porter";
    note?: string;
    rate: number;
    alcohol: number;
    owner: string;
    url: string;
};
