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
    const [verses, setVerses] = useState<(Verse | { skeleton: true })[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);
    const perPage = 20;

    const fetchVerses = useCallback(async (pageNumber: number) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.quran.com/api/v3/chapters/${chapterId}/verses?page=${pageNumber}&per_page=${perPage}`
            );

            if (!response.ok) throw new Error('Failed to fetch verses');

            const data = await response.json();
            const newVerses = data.verses.map((verse: any) => ({
                id: verse.id,
                verse_number: verse.verse_number,
                text_madani: verse.text_madani
            }));

            setVerses(prev => {
                // Remove skeletons for current page
                const existingVerses = prev.filter(v => !('skeleton' in v));
                return [...existingVerses, ...newVerses];
            });

            setHasMore(data.verses.length === perPage);
            setPage(pageNumber + 1);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch verses');
        } finally {
            setLoading(false);
        }
    }, [chapterId]);

    // Initial load
    useEffect(() => {
        setVerses(Array(perPage).fill({ skeleton: true }));
        fetchVerses(1);
    }, [chapterId]);

    // Infinite scroll handler
    const lastVerseRef = useCallback((node: HTMLElement | null) => {
        if (loading || !hasMore) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore && !loading) {
                // Add skeletons for next page
                setVerses(prev => [...prev, ...Array(perPage).fill({ skeleton: true })]);
                fetchVerses(page);
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, hasMore, page, fetchVerses]);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="arabic-surahtitle text-5xl font-bold text-center mb-8">
                {chapterId.toString().padStart(3, '0')} surah
            </h1>

            <div className="space-y-4">
                {verses.map((verse, index) => (
                    'skeleton' in verse ? (
                        <div key={`skeleton-${index}`} className="p-4 border rounded-lg relative overflow-hidden">
                            <div className="h-6 w-1/3 mb-4 shimmer-bg"></div>
                            <div className="h-32 shimmer-bg"></div>
                            <div className="h-5 w-2/3 mt-4 shimmer-bg"></div>
                        </div>
                    ) : (
                        <div
                            key={verse.id}
                            ref={index === verses.length - 1 ? lastVerseRef : null}
                            className="p-4 border rounded-lg"
                        >
                            <h2 className="text-xl font-semibold">
                                {chapterId}:{verse.verse_number}
                            </h2>
                            <p className="text-4xl text-right arabic-verses mt-2">
                                {verse.text_madani}
                            </p>
                        </div>
                    )
                ))}
            </div>

            {error && (
                <div className="text-center p-4 text-red-500">{error}</div>
            )}

            <style jsx global>{`
                .shimmer-bg {
                    background: rgba(0,0,0,0.05);
                    background-image: linear-gradient(
                            -45deg,
                            transparent 25%,
                            rgba(255,255,255,0.1) 50%,
                            transparent 75%
                    );
                    background-size: 400% 400%;
                    animation: shimmer 1.5s infinite;
                    border-radius: 4px;
                }

                @keyframes shimmer {
                    0% { background-position: 100% 100%; }
                    100% { background-position: -100% -100%; }
                }
            `}</style>
        </div>
    );
}