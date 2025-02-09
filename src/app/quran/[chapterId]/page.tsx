// src/app/quran/[chapterId]/page.tsx
"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import VerseRenderer from '@/app/components/QuranReader/VerseRenderer';
import SurahNavbar from '@/app/components/QuranReader/SurahNavbar';
import { useRouter } from 'next/navigation';

interface Verse {
    id: number;
    verse_number: number;
    text_madani: string;
    text_english?: string;
}

export default function ChapterPage() {
    const { chapterId } = useParams();
    const [verses, setVerses] = useState<Verse[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showFooter, setShowFooter] = useState(true);
    const observer = useRef<IntersectionObserver | null>(null);
    const perPage = 20;

    const router = useRouter();

    const fetchVerses = useCallback(async (page: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.quran.com/api/v3/chapters/${chapterId}/verses?page=${page}&per_page=${perPage}`
            );

            if (!response.ok) throw new Error('Failed to fetch verses');

            const data = await response.json();
            console.log('Arabic verses response:', data);

            const newVerses = await Promise.all(data.verses.map(async (verse: any) => {
                const englishResponse = await fetch(
                    `https://api.quran.com/api/v4/verses/by_chapter/${chapterId}?page=${page}&per_page=${perPage}&translations=131`
                );

                if (!englishResponse.ok) throw new Error('Failed to fetch English translation');

                const englishData = await englishResponse.json();
                console.log('English translation response:', englishData);

                const englishTranslation = englishData.verses.find((v: any) => v.verse_number === verse.verse_number)?.translations[0]?.text.replace(/<sup[^>]*>.*?<\/sup>/g, '') || '';

                return {
                    id: verse.id,
                    verse_number: verse.verse_number,
                    text_madani: verse.text_madani,
                    text_english: englishTranslation
                };
            }));

            console.log('Fetched verses:', newVerses);

            setVerses(prev => {
                const updatedVerses = [
                    ...prev,
                    ...newVerses.filter((newVerse: Verse) =>
                        !prev.some(prevVerse => prevVerse.id === newVerse.id)
                    )
                ];
                console.log('Updated verses:', updatedVerses);
                return updatedVerses;
            });

            setHasMore(data.verses.length === perPage);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch verses');
        } finally {
            setLoading(false);
        }
    }, [chapterId]);

    useEffect(() => {
        setVerses([]);
        setCurrentPage(1);
        fetchVerses(1);
    }, [chapterId, fetchVerses]);

    const lastVerseRef = useCallback((node: HTMLElement | null) => {
        if (loading || !hasMore) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setCurrentPage(prev => prev + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore]);

    useEffect(() => {
        if (currentPage > 1) fetchVerses(currentPage);
    }, [currentPage, fetchVerses]);

    const SkeletonVerse = () => (
        <div className="p-4 border rounded-lg shimmer-bg">
            <div className="h-6 w-1/3 mb-4 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
        </div>
    );

    const handleNextSurah = () => {
        router.push(`/quran/${Number(chapterId) + 1}`);
    };

    const handlePreviousSurah = () => {
        router.push(`/quran/${Number(chapterId) - 1}`);
    };

    let bisSurah1 = false;
    let bisSurah114 = false;

    if (Number(chapterId) == 1) {
        bisSurah1 = true;
        bisSurah114 = false;
    }

    if (Number(chapterId) == 114) {
        bisSurah114 = true;
        bisSurah1 = false;
    }

    useEffect(() => {
        let lastScrollTop = 0;
        const handleScroll = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            if (scrollTop > lastScrollTop + 50) {
                setShowFooter(false);
            } else if (scrollTop < lastScrollTop - 50) {
                setShowFooter(true);
            }
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSwipeDown = () => {
        setShowFooter(false);
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <SurahNavbar />
            <h1 className="arabic-surahtitle text-5xl font-bold text-center mb-8 mt-5">
                {chapterId.toString().padStart(3, '0')} surah
            </h1>

            <div className="space-y-4">
                {verses.map((verse, index) => (
                    <div
                        key={verse.id}
                        ref={index === verses.length - 1 ? lastVerseRef : null}
                        className="p-4 border rounded-lg"
                    >
                        <VerseRenderer
                            arabicText={verse.text_madani}
                            verseNumber={verse.verse_number}
                            englishText={verse.text_english}
                        />
                    </div>
                ))}

                {loading && (
                    <>
                        <SkeletonVerse />
                        <SkeletonVerse />
                        <SkeletonVerse />
                    </>
                )}
            </div>

            {error && (
                <div className="text-center p-4 text-red-500">{error}</div>
            )}

            <div className={`quran-footer ${showFooter ? 'visible' : 'hidden'}`} onTouchStart={handleSwipeDown}>
                {!bisSurah1 && (
                    <button onClick={handlePreviousSurah}>
                        <span className="text-xs" style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle' }}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                style={{ marginRight: '5px', marginBottom: '2px' }}
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                                />
                            </svg>
                            Previous Surah
                        </span>
                    </button>
                )}

                {!bisSurah114 && (
                    <button onClick={handleNextSurah}>
                        <span className="text-xs" style={{ display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle' }}>
                            Next Surah
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                                style={{ marginLeft: '5px', marginBottom: '2px' }}
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                                />
                            </svg>
                        </span>
                    </button>
                )}
            </div>
        </div>
    );
}