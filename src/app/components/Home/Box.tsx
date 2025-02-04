import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

interface BoxProps {
    imageSource: string;
    imageAlt: string;
    text: string;
    href?: string; // Make the href prop optional
}

const Box: React.FC<BoxProps> = ({ imageSource, imageAlt, text, href }) => {
    const content = (
        <div className="flex flex-col items-center bg-white-50 border p-4 rounded-lg hover:bg-white hover:text-black transition-colors duration-200 text-gray-100">
            <div className="relative w-32 h-32">
                <Image
                    src={imageSource}
                    alt={imageAlt}
                    fill
                    className="object-contain"
                />
            </div>
            <p className="mt-2 text-center">{text}</p>
        </div>
    );

    if (href) {
        return <Link href={href}>{content}</Link>;
    }

    return content;
};

export default Box;