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
    isBookmarked: boolean;
    onBookmarkClick: () => void;
}

const VerseRenderer = ({
                           arabicText,
                           verseNumber,
                           englishText,
                           chapterId,
                           isPlaying,
                           onPlayClick,
                           isBookmarked,
                           onBookmarkClick
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
                {/* Buttons Container */}
                <div className="flex flex-col gap-2">
                    {/* Play Button */}
                    <button
                        onClick={onPlayClick}
                        className="p-1.5 rounded-full transition-colors"
                    >
                        {isPlaying ? (
                            <svg className="w-5 h-5 text-white hover:text-red-600" fill="currentColor"
                                 viewBox="0 0 24 24">
                                <path d="M6 4h4v16H6zm8 0h4v16h-4z"/>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5 text-white hover:text-red-600" fill="currentColor"
                                 viewBox="0 0 24 24">
                                <path d="M5 3l14 9-14 9V3z"/>
                            </svg>
                        )}
                    </button>

                    {/* Bookmark Button */}
                    <button
                        onClick={onBookmarkClick}
                        className="p-1.5 rounded-full transition-colors text-yellow-400 hover:text-yellow-500"
                    >
                        {isBookmarked ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path
                                    d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                            </svg>
                        ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M 6.0097656 2 C 4.9143111 2 4.0097656 2.9025988 4.0097656 3.9980469 L 4 22 L 12 19 L 20 22 L 20 20.556641 L 20 4 C 20 2.9069372 19.093063 2 18 2 L 6.0097656 2 z M 6.0097656 4 L 18 4 L 18 19.113281 L 12 16.863281 L 6.0019531 19.113281 L 6.0097656 4 z"/>
                            </svg>
                        )}
                    </button>
                </div>

                <div className="flex-1">
                    {/* Arabic text aligned right */}
                    <div className="verse-container" style={{fontFamily: "'IndoPak', serif"}}>
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
                        <span className="leading-normal arabic-font-1 text-5xl text-white">
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