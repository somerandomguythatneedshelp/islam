import QuranWord from './QuranWord';
import {toArabicNumerals} from '@/app/types/ArabicNumbers';
import {processVerseText} from '@/app/utils/verseProcessor';

interface VerseRendererProps {
    arabicText: string;
    verseNumber: string;
    englishText?: string;
    chapterId: number;
    isPlaying: boolean;
    onPlayClick: () => void;
}

const VerseRenderer = ({
                           arabicText,
                           verseNumber,
                           englishText,
                           chapterId,
                           isPlaying,
                           onPlayClick
                       }: VerseRendererProps) => {
    const words = processVerseText(arabicText);

    return (
        <div className="border-b border-gray-200 pb-4 relative">
            {/* Surah and Verse Number */}
            <div className="flex items-center justify-between mb-2">
                <h1 className="text-lg ml-1 mb-3 font-semibold">
                    {chapterId}:{verseNumber}
                </h1>
            </div>

            {/* Play Button and Content */}
            <div className="flex items-start gap-3">
                <button
                    onClick={onPlayClick}
                    className="p-1.5 rounded-full transition-colors mt-1"
                >
                    {isPlaying ? (
                        <svg className="w-5 h-5 text-white hover:text-red-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6zm8 0h4v16h-4z"/>
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 text-white hover:text-red-600" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M5 3l14 9-14 9V3z"/>
                        </svg>
                    )}
                </button>

                <div className="flex-1">
                    {/* Arabic text aligned right */}
                    <div className="verse-container ml-36" style={{fontFamily: "'IndoPak', serif"}}>
                        {words.map((word, index) => {
                            const audioUrl = `https://audio.qurancdn.com/wbw/${chapterId.toString().padStart(3, '0')}_${verseNumber.padStart(3, '0')}_${(index + 1).toString().padStart(3, '0')}.mp3`;
                            return (
                                <QuranWord
                                    key={index}
                                    word={word.text}
                                    audioUrl={audioUrl}
                                />
                            );
                        })}
                        <span className="leading-normal arabic-font-1 text-5xl">
                            {toArabicNumerals(verseNumber)}
                        </span>
                    </div>

                    {/* English text aligned left */}
                    {englishText && (
                        <div className="translation-text mt-2 text-gray-600 -ml-10">
                            {englishText}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerseRenderer;