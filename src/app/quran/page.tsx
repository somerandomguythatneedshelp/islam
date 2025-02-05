"use client";

import { useState, useEffect } from 'react';
import SurahBox from '../components/Home/SurahBox';
import type { Surah } from '@/app/types/surah';

// Add a reusable SurahList component
const SurahList = ({ surahs }: { surahs: Surah[] }) => (
    <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto p-4">
        {surahs.map((surah) => (
            <div key={surah.id} className="m-1">
                <SurahBox
                    chapterId={surah.id}
                    topText={surah.name_simple}
                    bottomText={surah.translated_name.name}
                    number={surah.verses_count}
                    versesText="verses"
                    href={`/quran/${surah.id}`}
                />
            </div>
        ))}
    </div>
);

export default function QuranPage() {
    const [surahs, setSurahs] = useState<Surah[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSurahs = async () => {
            try {
                const response = await fetch('https://api.quran.com/api/v3/chapters');
                const data = await response.json();
                setSurahs(data.chapters as Surah[]);
            } catch (error) {
                console.error('Error fetching surahs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchSurahs();
    }, []);

    if (loading) {
        return <div className="text-center p-8">Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-8">The Noble Quran</h1>
            <SurahList surahs={surahs} />
        </div>
    );
}