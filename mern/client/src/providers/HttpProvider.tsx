import { useState, type FC, type PropsWithChildren } from "react";
import { HttpContext, type Fetcher } from "../contexts/HttpContext";

const API_URL = "http://localhost:3000/api";

const HttpProvider: FC<PropsWithChildren> = ({ children }) => {

    const [bearerToken, setBearerToken] = useState("");

    const fetchData: Fetcher = async (url, options) => {
        const response = await fetch(API_URL + url, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                "Authorization": bearerToken ? `Bearer ${bearerToken}` : "",
            }
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
        }}>
            {children}
        </HttpContext.Provider>
    );
};

export default HttpProvider;
