export const processVerseText = (text: string) => {
    // Improved Arabic word splitting with punctuation handling
    return text
        .split(/([\u0600-\u06FF]+[\u064B-\u065F]*)/g)
        .filter(word => word.trim().length > 0)
        .map((word, index) => ({
            id: `${index}-${word}`,
            text: word.trim(),
            position: index
        }));
};