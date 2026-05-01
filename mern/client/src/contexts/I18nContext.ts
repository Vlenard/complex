import { createContext } from "react";

export enum Language {
    English = "en",
    Hungarian = "hu",
}

export type I18nContextType = {
    language: Language;
    setLanguage: (language: Language) => void;
    localization: Record<string, string>;
    isLoading: boolean;
}

export const I18nContext = createContext<I18nContextType>({} as I18nContextType);
