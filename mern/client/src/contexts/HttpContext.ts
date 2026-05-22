import { createContext, type Dispatch, type SetStateAction } from "react";

export type Fetcher = (url: string, options: Pick<RequestInit, "method" | "body" | "signal">) => Promise<Response>;
export type HttpContextType = {
    fetch: Fetcher;
    image: (imageUrl: string) => string;
    setBearerToken:  Dispatch<SetStateAction<string>>;
};

export const HttpContext = createContext<HttpContextType>({} as HttpContextType);
