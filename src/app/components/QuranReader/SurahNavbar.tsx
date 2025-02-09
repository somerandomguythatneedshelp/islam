// src/app/components/QuranReader/SurahNavbar.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Surah } from '@/app/types/surah';

const SurahNavbar = () => {
    const [surahs, setSurahs] = useState<Surah[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSurahId, setSelectedSurahId] = useState<string>('');
    const router = useRouter();
    const pathname = usePathname();

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

    useEffect(() => {
        const currentSurahId = pathname.split('/').pop();
        setSelectedSurahId(currentSurahId || '');
    }, [pathname]);

    const handleSurahChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSurahId = event.target.value;
        setSelectedSurahId(selectedSurahId);
        router.push(`/quran/${selectedSurahId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="surah-navbar">
            <select value={selectedSurahId} onChange={handleSurahChange} className="surah-select">
                {surahs.map((surah) => (
                    <option key={surah.id} value={surah.id}>
                        {surah.name_simple} ({surah.translated_name.name})
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SurahNavbar;