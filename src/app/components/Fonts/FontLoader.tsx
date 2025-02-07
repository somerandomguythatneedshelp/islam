// src/components/FontLoader.tsx
'use client';

import { useEffect } from 'react';

const FontLoader = () => {
    useEffect(() => {
        // This ensures fonts are loaded after initial render
        const style = document.createElement('style');
        style.innerHTML = `
      @font-face {
  font-family: "IndoPak";
  src:
          local("AlQuran IndoPak by QuranWBW"),
          url("/fonts/quran/hafs/nastaleeq/indopak/indopak-nastaleeq-waqf-lazim-v4.2.1.woff2") format("woff2"),
          url("/fonts/quran/hafs/nastaleeq/indopak/indopak-nastaleeq-waqf-lazim-v4.2.1.woff") format("woff"),
          url("/fonts/quran/hafs/nastaleeq/indopak/indopak-nastaleeq-waqf-lazim-v4.2.1.ttf") format("truetype");
  font-display: swap;
}

@font-face {
  font-family: "surahnames";
  src:
          url("/fonts/quran/surah-names/v1/sura_names.woff2"),
          url("/fonts/quran/quran/surah-names/v1/sura_names.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
    font-family: "Uthmani-Hafs";

    src: url("/fonts/ee/uthmanic_hafs_v22.woff2") format("woff2"),
    url("/fonts/ee/uthmanic_hafs_v22.woff") format("woff");

    font-weight: normal;

    font-style: normal;

    font-display: swap;
}
    `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    return null;
};

export default FontLoader;