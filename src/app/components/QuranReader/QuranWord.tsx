// src/components/QuranReader/QuranWord.tsx
'use client';

import { useState } from 'react';

interface QuranWordProps {
    word: string;
}

const QuranWord = ({ word }: QuranWordProps) => {
    const [isHovered, setIsHovered] = useState(false);

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
                direction: 'rtl'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
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
                    pointerEvents: 'none'
                }}
            />
    </span>
    );
};

export default QuranWord;