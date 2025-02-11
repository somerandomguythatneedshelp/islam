// src/components/QuranReader/QuranWord.tsx
'use client';

import { useState } from 'react';

interface QuranWordProps {
    word: string;
    audioUrl: string; // Directly pass the audio URL
    translation: string;
}

const QuranWord = ({ word, audioUrl }: QuranWordProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [hoveredWord, setHoveredWord] = useState<number | null>(null);

    const playAudio = () => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        } else {
            console.error('Audio URL is not available for this word.');
        }
    };

    return (
        <span
            className="quran-word arabic-verses"
            style={{
                display: 'inline-block',
                position: 'relative',
                color: isHovered ? '#ee1c1c' : '#e7e9ea',
                transition: 'color 0.2s ease',
                cursor: 'pointer',
                unicodeBidi: 'isolate',
                margin: '0 1px',
                padding: '0 2px',
                lineHeight: '1.8',
                direction: 'rtl',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={playAudio} // Play audio on click
        >
            <span
                style={{
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                {word}
                {hoveredWord === word.id && (
                    <div className="tooltip">
                      {word.transliteration.text}
                    </div>
                  )}
            </span>
            {/* Background overlay for precise hover area */}
            <span
                style={{
                    position: 'absolute',
                    top: '-5px',
                    bottom: '-5px',
                    left: '-3px',
                    right: '-3px',
                    zIndex: 0,
                    pointerEvents: 'none',
                }}
            />
        </span>
    );
};

export default QuranWord;