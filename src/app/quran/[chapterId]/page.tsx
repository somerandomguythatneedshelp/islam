"use client";

import {useParams} from 'next/navigation';
import {useState, useEffect, useCallback, useRef} from 'react';
import VerseRenderer from '@/app/components/QuranReader/VerseRenderer'; // Adjust the path if needed
import SurahNavbar from '@/app/components/QuranReader/SurahNavbar'; // Adjust the path if needed
import SettingsIcon from '@/app/components/Settings/SettingsIcon';
import {Verse} from "@/app/types/verse";

export default function ChapterPage() {
  const {chapterId} = useParams(); // Correct usage of useParams
  const [verses, setVerses] = useState<Verse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [languageId, setLanguageId] = useState<number>(131); // Default to English
  const observer = useRef<IntersectionObserver | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentPlayingVerse, setCurrentPlayingVerse] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const perPage = 20;

  const handlePlayAyah = useCallback((chapterId: string, verseNumber: string) => {
    const verseKey = `${chapterId}-${verseNumber}`;

    if (currentPlayingVerse === verseKey) {
      if (audioRef.current) {
        if (isPlaying) {
          audioRef.current.pause();
        } else {
          audioRef.current.play();
        }
      }
      return;
    }

    if (audioRef.current) {
      audioRef.current.pause();
    }

    // Using Al-Quran Cloud API for verse-level audio
    const verseAudioUrl = `https://cdn.alquran.cloud/media/audio/ayah/ar.alafasy/${verseNumber}`;
    const newAudio = new Audio(verseAudioUrl);
    audioRef.current = newAudio;

    newAudio.addEventListener('play', () => {
      setCurrentPlayingVerse(verseKey);
      setIsPlaying(true);
    });

    newAudio.addEventListener('pause', () => setIsPlaying(false));
    newAudio.addEventListener('ended', () => {
      setCurrentPlayingVerse(null);
      setIsPlaying(false);
    });

    newAudio.play();
  }, [currentPlayingVerse, isPlaying]);

  const fetchVerses = useCallback(async (page: number, langId: number) => {
    if (!chapterId) return; // Wait until chapterId is available
    setLoading(true);
    setError(null);

    try {
      const [arabicResponse, translationResponse] = await Promise.all([
        fetch(`https://api.quran.com/api/v3/chapters/${chapterId}/verses?page=${page}&per_page=${perPage}`),
        fetch(`https://api.quran.com/api/v4/verses/by_chapter/${chapterId}?page=${page}&per_page=${perPage}&translations=${langId}`)
      ]);

      if (!arabicResponse.ok) throw new Error('Failed to fetch Arabic verses');
      if (!translationResponse.ok) throw new Error('Failed to fetch translation');

      const arabicData = await arabicResponse.json();
      const translationData = await translationResponse.json();

      const newVerses = arabicData.verses.map((verse: any) => {
        const translation = translationData.verses.find((v: any) => v.verse_number === verse.verse_number)?.translations[0]?.text.replace(/<sup[^>]*>.*?<\/sup>/g, '') || '';

        return {
          id: verse.id,
          verse_number: verse.verse_number,
          text_madani: verse.text_madani,
          text_english: translation,
        };
      });


      setVerses(prev => {
        const updatedVerses = [
          ...prev,
          ...newVerses.filter((newVerse: Verse) =>
            !prev.some(prevVerse => prevVerse.id === newVerse.id)
          )
        ];
        return updatedVerses;
      });

      setHasMore(arabicData.verses.length === perPage);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch verses');
    } finally {
      setLoading(false);
    }
  }, [chapterId]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!chapterId) return; // Wait until chapterId is available
    setVerses([]);
    setCurrentPage(1);
    fetchVerses(1, languageId);
  }, [chapterId, fetchVerses, languageId]);

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

  useEffect(() => {
    if (currentPage > 1) fetchVerses(currentPage, languageId);
  }, [currentPage, fetchVerses, languageId]);

  const SkeletonVerse = () => (
    <div className="p-4 border rounded-lg shimmer-bg">
      <div className="h-6 w-1/3 mb-4 bg-gray-200 rounded"></div>
      <div className="h-32 bg-gray-200 rounded"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Surah Navbar */}
      <div className="flex justify-between items-center mb-4">
        <SurahNavbar/>
        <SettingsIcon onLanguageChange={(languageId) => setLanguageId(languageId)}/>
      </div>


      {/* Surah Title */}
      <h1 className="arabic-surahtitle text-5xl font-bold text-center mb-8 mt-5">
        {chapterId?.toString().padStart(3, '0')} surah
      </h1>

      {/* Verses Section */}
      <div className="space-y-4">
        {verses.map((verse, index) => (
          <div
            key={verse.id}
            ref={index === verses.length - 1 ? lastVerseRef : null}
            className="p-4 rounded-lg"
          >
            <VerseRenderer
              arabicText={verse.text_madani}
              verseNumber={verse.verse_number.toString()}
              chapterId={chapterId}
              englishText={verse.text_english}
              chapterId={Number(chapterId)}
              isPlaying={currentPlayingVerse === `${chapterId}-${verse.verse_number}` && isPlaying}
              onPlayClick={() => handlePlayAyah(chapterId, verse.verse_number.toString())}
            />
          </div>
        ))}

        {loading && (
          <>
            <SkeletonVerse/>
            <SkeletonVerse/>
            <SkeletonVerse/>
          </>
        )}
      </div>

      {error && (
        <div className="text-center p-4 text-red-500">{error}</div>
      )}
    </div>
  );
}