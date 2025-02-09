// src/app/components/Hadith/HadithList.tsx
"use client";

import { useEffect, useState } from 'react';

interface Hadith {
    id: number;
    text: string;
    reference: string;
}

const HadithList = () => {
    const [hadiths, setHadiths] = useState<Hadith[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchHadiths = async () => {
            try {
                const apiKey = process.env.NEXT_PUBLIC_HADITH_APIKEY;
                const response = await fetch(`https://hadithapi.com/api/hadiths/?apiKey=${apiKey}`);
                if (!response.ok) throw new Error('Failed to fetch Hadiths');
                const data = await response.json();
                setHadiths(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch Hadiths');
            } finally {
                setLoading(false);
            }
        };

        fetchHadiths();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Hadiths List</h1>
            <ul className="space-y-4">
                {hadiths.map(hadith => (
                    <li key={hadith.id} className="p-4 border rounded-lg">
                        <p className="text-lg">{hadith.text}</p>
                        <p className="text-sm text-gray-500">{hadith.reference}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HadithList;