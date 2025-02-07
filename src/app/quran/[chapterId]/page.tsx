"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';
import VerseRenderer from '@/app/components/QuranReader/VerseRenderer';
import { toArabicNumerals } from '@/app/types/ArabicNumbers';

interface Verse {
    id: number;
    verse_number: number; // Ensure this matches API response
    text_madani: string;
}

export default function ChapterPage() {
    const { chapterId } = useParams();
    const [verses, setVerses] = useState<Verse[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);
    const perPage = 20;

    const fetchVerses = useCallback(async (page: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.quran.com/api/v3/chapters/${chapterId}/verses?page=${page}&per_page=${perPage}`
            );

            if (!response.ok) throw new Error('Failed to fetch verses');

            const data = await response.json();

            // Verify API response structure
            console.log('API Response:', data.verses);

            const newVerses = data.verses.map((verse: any) => ({
                id: verse.id,
                verse_number: verse.verse_number, // Confirm this matches API
                text_madani: verse.text_madani
            }));

            setVerses(prev => [
                ...prev,
                ...newVerses.filter((newVerse: Verse) =>
                    !prev.some(prevVerse => prevVerse.id === newVerse.id)
                )
            ]);

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


    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="arabic-surahtitle text-5xl font-bold text-center mb-8">
                {chapterId.toString().padStart(3, '0')} surah
            </h1>

            <div className="space-y-4">
                {verses.map((verse, index) => (
                    <div
                        key={verse.id}
                        ref={index === verses.length - 1 ? lastVerseRef : null}
                        className="p-4 border rounded-lg"
                    >
                        {/* Verse number display */}
                        <div className="text-xl font-semibold mb-4">
                            {toArabicNumerals(verse.verse_number)}
                        </div>

                        <VerseRenderer
                            arabicText={verse.text_madani}
                            verseNumber={verse.verse_number}
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
        </div>
    );
}