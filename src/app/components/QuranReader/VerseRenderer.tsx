// src/components/Quran/VerseRenderer.tsx
'use client';

import { processVerseText } from '@/app/utils/verseProcessor';
import QuranWord from './QuranWord';
import { toArabicNumerals } from '@/app/types/ArabicNumbers';

interface VerseRendererProps {
    arabicText: string;
    verseNumber: string;
    englishText?: string;
}

const VerseRenderer = ({ arabicText, verseNumber, englishText }: VerseRendererProps) => {
    const words = processVerseText(arabicText);

    console.log('Rendering verse:', { arabicText, verseNumber, englishText });

    return (
        <div className="verse-container">
            <div style={{fontFamily: "'Uthmanic-Hafs', serif"}}>
                {words.map((word, index) => (
                    <QuranWord
                        key={index} // why?
                        word={word.text}
                    />
                ))}
                <span className="leading-normal arabic-font-1 text-5xl">{toArabicNumerals(verseNumber)}</span>
            </div>
            {englishText && (
                <div className="translation-text">
                {englishText}
                </div>
            )}
        </div>
    );
};

export default VerseRenderer;