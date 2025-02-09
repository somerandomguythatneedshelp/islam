// src/app/hadith/page.tsx
import HadithList from '@/app/components/Hadith/HadithList';

export default function HadithPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <HadithList />
        </main>
    );
}