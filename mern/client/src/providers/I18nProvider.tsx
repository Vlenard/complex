import { I18nContext, Language } from "@/contexts/I18nContext";
import { useEffect, useState, type FC, type PropsWithChildren } from "react";

const I18nProvider: FC<PropsWithChildren> = ({ children }) => {

    const [language, setLanguage] = useState<Language>(document.documentElement.lang as Language || Language.English);
    const [localization, setLocalization] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        document.documentElement.lang = language;

        setIsLoading(true);
        import(`@/i18n/${language}.json`)
            .then((module) => {
                setLocalization(module.default);
            })
            .catch((err) => {
                console.error(`Could not load locales for ${language}`, err);
            })
            .finally(() => setIsLoading(false));
    }, [language]);

    if ( isLoading ) return null;

    return (
        <I18nContext.Provider value={{
            language,
            setLanguage,
            localization,
            isLoading,
        }}>
            {children}
        </I18nContext.Provider>
    );
};

export default I18nProvider;
