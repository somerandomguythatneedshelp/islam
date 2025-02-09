// src/app/page.tsx
"use client";

import { useState } from 'react';
import SettingsIcon from './components/Settings/SettingsIcon';
import Link from "next/link";
import Box from "@/app/components/Home/Box";

export default function Home() {
    const [languageId, setLanguageId] = useState<number>(131); // Default to English

    const handleLanguageChange = (languageId: number) => {
        setLanguageId(languageId);
    };

    const HomeGrid = () => (
        <div className="container mx-auto">
            <Link href="/quran">
                <Box
                    imageSource="/images/Quran.png"
                    imageAlt="Image description"
                    text="Q'uran"
                />
            </Link>

            <h1 className="pt-6 pb-8">‎</h1>

            <Link href="/timings">
                <Box
                    imageSource="/images/namaz.png"
                    imageAlt="Image description"
                    text="Salah Timings"
                />
            </Link>

            <h1 className="pt-6 pb-8">‎</h1>

            <Link href="/hadith">
                <Box
                    imageSource="/images/hadith.png"
                    imageAlt="Image description"
                    text="Hadtih"
                />
            </Link>
        </div>
    );

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <HomeGrid/>
            </div>
        </main>
    );
}