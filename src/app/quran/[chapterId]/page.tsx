"use client";

import { useParams } from 'next/navigation';
import { useEffect, useState, useRef, useCallback } from 'react';

interface Verse {
    id: number;
    verse_number: number;
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
    const perPage = 50;
    const formattedChapterId = chapterId.toString().padStart(3, '0');

    const fetchVerses = useCallback(async (page: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.quran.com/api/v3/chapters/${chapterId}/verses?page=${page}&per_page=${perPage}`
            );

            if (!response.ok) throw new Error('Failed to fetch verses');

            const data = await response.json();

            // Filter out duplicates
            setVerses(prev => {
                const newVerses = data.verses.filter(
                    (newVerse: Verse) => !prev.some(prevVerse => prevVerse.id === newVerse.id)
                );
                return [...prev, ...newVerses];
            });

            // Check if we've received all verses
            const receivedAll = data.verses.length < perPage;
            const apiSaysHasMore = data.pagination.next_page !== null;
            setHasMore(!receivedAll && apiSaysHasMore);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch verses');
        } finally {
            setLoading(false);
        }
    }, [chapterId]);

    // Reset when chapter changes
    useEffect(() => {
        setVerses([]);
        setCurrentPage(1);
        setHasMore(true);
        fetchVerses(1);
    }, [chapterId, fetchVerses]);

    // Infinite scroll observer
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

    // Load next page when currentPage changes
    useEffect(() => {
        if (currentPage > 1) fetchVerses(currentPage);
    }, [currentPage, fetchVerses]);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="arabic-surahtitle text-5xl font-bold text-center mb-8">
                {formattedChapterId} surah
            </h1>

            <div className="space-y-4">
                {verses.map((verse, index) => (
                    <div
                        key={verse.id}
                        ref={index === verses.length - 1 ? lastVerseRef : null}
                        className="p-4 border rounded-lg"
                    >
                        <h2 className="text-xl font-semibold">{chapterId}:{verse.verse_number}</h2>
                        <p className="text-4xl text-right arabic-verses mt-2">
                            {verse.text_madani}
                        </p>
                        <p className="text-3xl mt2">test</p>
                    </div>
                ))}
            </div>

            {loading && (
                <div className="text-center p-4 text-gray-500">Loading...</div>
            )}

            {error && (
                <div className="text-center p-4 text-red-500">{error}</div>
            )}

            {!hasMore && (
                 <div className="text-center p-4 text-gray-500">

                 </div>
            )}
        </div>
    );
}