'use client';

import { createContext, useContext, useState } from 'react';

const TranslationContext = createContext({
    translationLang: 131,
    setTranslationLang: (lang: number) => {}
});

export function TranslationProvider({ children }: { children: React.ReactNode }) {
    const [translationLang, setTranslationLang] = useState(131);

    return (
        <TranslationContext.Provider value={{ translationLang, setTranslationLang }}>
            {children}
        </TranslationContext.Provider>
    );
}

export const useTranslation = () => useContext(TranslationContext);