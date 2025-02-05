import Image from 'next/image';
import React from 'react';
import Link from 'next/link';

// Add a reusable ImageContainer component
const ImageContainer = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative w-32 h-32">
        <Image
            src={src}
            alt={alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw" // Added for performance
        />
    </div>
);

// Add a reusable ContentWrapper component
const ContentWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="flex flex-col items-center bg-white-50 border p-4 rounded-lg hover:bg-white hover:text-black transition-colors duration-200 text-gray-100">
        {children}
    </div>
);

interface BoxProps {
    imageSource: string;
    imageAlt: string;
    text: string;
    href?: string;
}

const Box: React.FC<BoxProps> = ({ imageSource, imageAlt, text, href }) => {
    const content = (
        <ContentWrapper>
            <ImageContainer src={imageSource} alt={imageAlt} />
            <p className="mt-2 text-center">{text}</p>
        </ContentWrapper>
    );

    return href ? <Link href={href}>{content}</Link> : content;
};

export default Box;