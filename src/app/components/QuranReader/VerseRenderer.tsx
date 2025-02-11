import QuranWord from './QuranWord';
import { toArabicNumerals } from '@/app/types/ArabicNumbers';

import { processVerseText } from '@/app/utils/verseProcessor';

interface VerseRendererProps {
    arabicText: string;
    verseNumber: string;
    englishText?: string;
    chapterId: number; // Add chapterId as a prop
}

const VerseRenderer = ({ arabicText, verseNumber, englishText, chapterId }: VerseRendererProps) => {
    const words = processVerseText(arabicText);

    return (
        <div className="verse-container">
            <div style={{ fontFamily: "'IndoPak', serif" }}>
                {words.map((word, index) => {
                    // Construct the audio URL for each word
                    const audioUrl = `https://audio.qurancdn.com/wbw/${chapterId.toString().padStart(3, '0')}_${verseNumber.padStart(3, '0')}_${(index + 1).toString().padStart(3, '0')}.mp3`;

                    return (
                        <QuranWord
                            key={index}
                            word={word.text}
                            audioUrl={audioUrl} // Pass the audio URL
                        />
                    );
                })}
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