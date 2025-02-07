// src/utils/verseProcessor.ts
export const processVerseText = (text?: string) => {
    if (!text) {
        console.warn('processVerseText received undefined text');
        return [];
    }

    return text
        .split(/([\u0600-\u06FF]+[\u064B-\u065F]*)/g)
        .filter(word => word.trim().length > 0)
        .map((word, index) => ({
            id: `${index}-${word}`,
            text: word.trim(),
            position: index
        }));
};