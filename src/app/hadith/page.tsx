"use client";

import { useState } from 'react';

export default function HadithPage() {
    const [hadithName, setHadithName] = useState<string>('');
    const [hadithData, setHadithData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchHadith = async (name: string) => {
        setLoading(true);
        setError(null);
        setHadithData(null);
        try {
            const response = await fetch(`https://random-hadith-generator.vercel.app/${name}`);
            if (!response.ok) throw new Error('Failed to fetch Hadith');
            const data = await response.json();
            setHadithData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch Hadith');
        } finally {
            setLoading(false);
        }
    };

    const handleButtonClick = (name: string) => {
        setHadithName(name);
        fetchHadith(name);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col space-y-4 p-5 mr-96 -ml-96">
                <h1>Choose a Book:</h1>
                <label className="relative flex items-center cursor-pointer">
                    <input
                        className="sr-only peer"
                        name="futuristic-radio"
                        type="radio"
                        onClick={() => handleButtonClick('bukhari')}
                    />
                    <div className="w-6 h-6 bg-transparent border-2 border-b-white rounded-full peer-checked:bg-white peer-checked:border-white peer-hover:shadow-lg peer-hover:shadow-cyan-50/50 peer-checked:shadow-lg peer-checked:shadow-cyan-50/50 transition duration-300 ease-in-out"></div>
                    <span className="ml-2 text-white">Sahih Al-Bukhari</span>
                </label>
                <label className="relative flex items-center cursor-pointer">
                    <input
                        className="sr-only peer"
                        name="futuristic-radio"
                        type="radio"
                        onClick={() => handleButtonClick('muslim')}
                    />
                    <div className="w-6 h-6 bg-transparent border-2 border-b-white rounded-full peer-checked:bg-white peer-checked:border-white peer-hover:shadow-lg peer-hover:shadow-cyan-50/50 peer-checked:shadow-lg peer-checked:shadow-cyan-50/50 transition duration-300 ease-in-out"></div>
                    <span className="ml-2 text-white">Sahih Muslim</span>
                </label>
                <label className="relative flex items-center cursor-pointer">
                    <input
                        className="sr-only peer"
                        name="futuristic-radio"
                        type="radio"
                        onClick={() => handleButtonClick('abudawud')}
                    />
                    <div className="w-6 h-6 bg-transparent border-2 border-b-white rounded-full peer-checked:bg-white peer-checked:border-white peer-hover:shadow-lg peer-hover:shadow-cyan-50/50 peer-checked:shadow-lg peer-checked:shadow-cyan-50/50 transition duration-300 ease-in-out"></div>
                    <span className="ml-2 text-white">Abu Dawud</span>
                </label>
                <label className="relative flex items-center cursor-pointer">
                    <input
                        className="sr-only peer"
                        name="futuristic-radio"
                        type="radio"
                        onClick={() => handleButtonClick('ibnmajah')}
                    />
                    <div className="w-6 h-6 bg-transparent border-2 border-b-white rounded-full peer-checked:bg-white peer-checked:border-white peer-hover:shadow-lg peer-hover:shadow-cyan-50/50 peer-checked:shadow-lg peer-checked:shadow-cyan-50/50 transition duration-300 ease-in-out"></div>
                    <span className="ml-2 text-white">Ibn Majah</span>
                </label>
                <label className="relative flex items-center cursor-pointer">
                    <input
                        className="sr-only peer"
                        name="futuristic-radio"
                        type="radio"
                        onClick={() => handleButtonClick('tirmidhi')}
                    />
                    <div className="w-6 h-6 bg-transparent border-2 border-b-white rounded-full peer-checked:bg-white peer-checked:border-white peer-hover:shadow-lg peer-hover:shadow-cyan-50/50 peer-checked:shadow-lg peer-checked:shadow-cyan-50/50 transition duration-300 ease-in-out"></div>
                    <span className="ml-2 text-white">Al-Tirmidhi</span>
                </label>
            </div>
            <div className="mb-56 ml-24 mr-24">
                {loading && <div>Loading...</div>}
                {error && <div>Error: {error}</div>}
                {hadithData && (
                    <div className="p-4 border rounded-lg">
                        <p>{hadithData.data.id}</p>
                        <p className="text-lg">{hadithData.data.hadith_english}</p>
                        <p className="text-sm text-gray-500">{hadithData.reference}</p>
                    </div>
                )}
            </div>
        </main>
    );
}