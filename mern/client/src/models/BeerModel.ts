export type BeerModel = {
    name: string;
    type: "lager" | "ipa" | "apa" | "stout" | "porter";
    note?: string;
    rate: number;
    alcohol: number;
    owner: string;
};
