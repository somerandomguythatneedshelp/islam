// src/components/Quran/VerseRenderer.tsx
'use client';

import { processVerseText } from '@/app/utils/verseProcessor';
import QuranWord from './QuranWord';
import { toArabicNumerals } from '@/app/types/ArabicNumbers';

interface VerseRendererProps {
    arabicText: string;
    verseNumber: string; // Add this prop
}

const VerseRenderer = ({ arabicText, verseNumber }: VerseRendererProps) => {
    const words = processVerseText(arabicText);

    return (
        <div
            className="verse-container"
            style={{
                fontFamily: "'Amiri Quran', 'Lateef', 'Noto Naskh Arabic', serif",
                fontSize: '2rem',
                lineHeight: '3.5rem',
                direction: 'rtl',
                textAlign: 'justify',
                wordSpacing: '-0.3em',
            }}
        >
            {words.map((word) => (
                <QuranWord
                    key={word.id}
                    word={word.text}
                    position={word.position}
                />
            ))}
            <span className="leading-normal arabic-font-1 text-5xl">{toArabicNumerals(verseNumber)}</span>
        </div>
    );
};

export default VerseRenderer;