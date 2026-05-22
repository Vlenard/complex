import { useState, type FC, type PropsWithChildren } from "react";
import { HttpContext, type Fetcher } from "../contexts/HttpContext";

const URL = "http://localhost:3000";
const API_URL = `${URL}/api`;

const HttpProvider: FC<PropsWithChildren> = ({ children }) => {

    const [bearerToken, setBearerToken] = useState("");

    const image = (imageUrl: string) => `${URL}/${imageUrl}`;

    const fetchData: Fetcher = async (url, options) => {
        const headers: HeadersInit = {
            "Authorization": bearerToken ? `Bearer ${bearerToken}` : "",
        };


        if (!(options.body instanceof FormData)) {
            headers["Content-Type"] = "application/json";
        }

        const response = await fetch(API_URL + url, {
            ...options,
            headers
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || "Something went wrong");
        }

        return response;
    };

    return (
        <HttpContext.Provider value={{
            fetch: fetchData,
            setBearerToken,
            image,
        }}>
            {children}
        </HttpContext.Provider>
    );
};

export default HttpProvider;
