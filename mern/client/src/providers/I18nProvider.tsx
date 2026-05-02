import { I18nContext, Language } from "@/contexts/I18nContext";
import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import locals from "@/i18n/locals.json";

const I18nProvider: FC<PropsWithChildren> = ({ children }) => {

    const [language, setLanguage] = useState<Language>(document.documentElement.lang as Language || Language.English);
    const [localization, setLocalization] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(true);
    const [firstLoad, setFirstLoad] = useState(true);

    const getLanguageString = (lang: Language): string => {
        return locals[lang];
    };

    useEffect(() => {
        document.documentElement.lang = language;

        setIsLoading(true);
        import(`@/i18n/${language}.json`)
            .then((module) => {
                setLocalization(module.default);
                if (firstLoad) {
                    setFirstLoad(false);
                }
            })
            .catch((err) => {
                console.error(`Could not load locales for ${language}`, err);
            })
            .finally(() => setIsLoading(false));
    }, [language]);

    return (
        isLoading && firstLoad ? null :
        <I18nContext.Provider value={{
            language,
            setLanguage,
            getLanguageString,
            localization,
            isLoading,
        }}>
            {children}
        </I18nContext.Provider>
    );
};

export default I18nProvider;
