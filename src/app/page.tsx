"use client";

import Box from './components/Home/Box';
import Link from 'next/link';

// Add a reusable HomeGrid component
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
    </div>
);

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
                <HomeGrid />
            </div>
        </main>
    );
}