import React from 'react';
import Link from 'next/link';

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
        <div
            className="flex items-center bg-white-50 border p-5 rounded-lg hover:text-neutral-900 transition-colors duration-200 text-gray-100 w-72">
            {/* Tilted Square */}
            <div
                className="square-thing ml-2 relative w-10 h-10 transform rotate-45 overflow-hidden flex items-center justify-center">
                <div className="transform -rotate-45">
                    <p className="font-bold text-lg">{chapterId}</p>
                </div>
            </div>

            {/* Middle Text */}
            <div className="flex flex-col ml-5 flex-grow">
                <p className="font-bold text-sm">{topText}</p>
                <p className="font-bold text-xs">{bottomText}</p>
            </div>

            {/* Right-aligned Content */}
            <div className="flex flex-col items-center ml-2"> {/* Changed from items-end to items-center */}
                <span
                    className="arabic-surahtitle text-2xl font-medium text-right -ml-1">{/* Added w-full and text-center */}{formattedChapterId}</span>
                <div className="flex flex-col items-end">
                    <p className="font-bold text-xs w-full text-center">{number}</p>
                    <p className="text-xs">{versesText}</p>
                </div>
            </div>
        </div>
    );

    return href ? <Link href={href}>{content}</Link> : content;
};

export default SurahBox;