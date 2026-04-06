import { createContext, useState, type Dispatch, type SetStateAction, type FC, type PropsWithChildren } from "react";

type Fetcher = (url: string, options: Pick<RequestInit, "method" | "body">) => Promise<Response>;
type HttpContextType = {
    fetch: Fetcher;
    setBearerToken:  Dispatch<SetStateAction<string>>;
};

const API_URL = "http://localhost:3000";
const HttpContext = createContext<HttpContextType>({} as HttpContextType);

const HttpProvider: FC<PropsWithChildren> = ({ children }) => {

    const [bearerToken, setBearerToken] = useState("");

    const fetchData: Fetcher = async (url, options) => {
        return await fetch(API_URL + url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${bearerToken}`
            }
        });
    };

    return (
        <HttpContext.Provider value={{
            fetch: fetchData,
            setBearerToken,
        }}>
            {children}
        </HttpContext.Provider>
    );
};

export default HttpProvider;
