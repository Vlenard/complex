'use client';

import React, { createContext, useContext, useTransition } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import locals from '../i18n/locals.json';

export type Language = 'en' | 'hu';

export type I18nContextType = {
    language: Language;
    setLanguage: (language: Language) => void;
    getLanguageString: (language: Language) => string;
    localization: Record<string, string>;
    isLoading: boolean;
};

export const I18nContext = createContext<I18nContextType>({} as I18nContextType);

export const I18nProvider = ({
    children,
    language,
    localization,
}: {
    children: React.ReactNode;
    language: Language;
    localization: Record<string, string>;
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const getLanguageString = (lang: Language): string => {
        return (locals as Record<string, string>)[lang] || lang;
    };

    const setLanguage = (newLang: Language) => {
        startTransition(() => {
            // Update cookie
            document.cookie = `language=${newLang}; path=/; max-age=31536000`;

            // Replace locale prefix in current URL
            const segments = pathname.split('/');
            if (segments[1] === 'en' || segments[1] === 'hu') {
                segments[1] = newLang;
            } else {
                segments.splice(1, 0, newLang);
            }
            router.push(segments.join('/'));
        });
    };

    return (
        <I18nContext.Provider value={{
            language,
            setLanguage,
            getLanguageString,
            localization,
            isLoading: isPending,
        }}>
            {children}
        </I18nContext.Provider>
    );
};

export const useI18n = () => {
    const context = useContext(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within an I18nProvider');
    }
    return context;
};
