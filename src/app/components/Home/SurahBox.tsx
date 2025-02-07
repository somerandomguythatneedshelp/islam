import React from 'react';
import Link from 'next/link';

// Add a reusable TiltedSquare component
const TiltedSquare = ({ chapterId }: { chapterId: number }) => (
    <div className="square-thing ml-2 relative w-10 h-10 transform rotate-45 overflow-hidden flex items-center justify-center">
        <div className="transform -rotate-45">
            <p className="font-bold text-lg">{chapterId}</p>
        </div>
    </div>
);

// Add a reusable MiddleText component
const MiddleText = ({ topText, bottomText }: { topText: string; bottomText: string }) => (
    <div className="flex flex-col ml-5 flex-grow">
        <p className="font-bold text-sm">{topText}</p>
        <p className="font-bold text-xs">{bottomText}</p>
    </div>
);

// Add a reusable RightContent component
const RightContent = ({ formattedChapterId, number, versesText }: { formattedChapterId: string; number: number; versesText: string }) => (
    <div className="flex flex-col items-center ml-2">
    <span className="arabic-surahtitle text-2xl font-medium text-right -ml-1">
      {formattedChapterId}
    </span>
        <div className="flex flex-col items-end">
            <p className="font-bold text-xs w-full text-center">{number}</p>
            <p className="text-xs">{versesText}</p>
        </div>
    </div>
);

interface BoxProps {
    chapterId: number;
    topText: string;
    bottomText: string;
    number: number;
    versesText: string;
    href?: string;
}

const SurahBox: React.FC<BoxProps> = ({ chapterId, topText, bottomText, number, versesText, href }) => {
    const formattedChapterId = chapterId.toString().padStart(3, '0');

    const content = (
        <div className="flex items-center bg-white-50 border p-3 rounded-lg hover:text-red-600 transition-colors duration-200 text-white w-72">
            <TiltedSquare chapterId={chapterId} />
            <MiddleText topText={topText} bottomText={bottomText} />
            <RightContent formattedChapterId={formattedChapterId} number={number} versesText={versesText} />
        </div>
    );

    return href ? <Link href={href}>{content}</Link> : content;
};

export default SurahBox;