"use client";

import React, { useEffect, useState } from 'react';
import SurahBox from '../components/Home/SurahBox';

export default function QuranPage() {
    const [surahs, setSurahs] = useState<never[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSurahs = async () => {
            try {
                const response = await fetch('https://api.quran.com/api/v3/chapters');
                const data = await response.json();
                setSurahs(data.chapters);
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

    let chapterId;

    return (
        <div>
            <h1 className="text-3xl font-bold text-center my-8">The Noble Quran</h1>
            <div className="flex flex-wrap justify-center gap-4 max-w-6xl mx-auto p-4">
                {surahs.map((surah) => (
                    <div key={surah.id} className="m-1">
                        {chapterId = surah.id}
                        <SurahBox
                            chapterId={surah.id}
                            topText={surah.name_simple}
                            bottomText={surah.translated_name.name}
                            number={surah.verses_count}
                            versesText="verses"
                            href={`/quran/${chapterId}`}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}