import React from "react";

interface IconBannerProps {
    imageSrc: string;
    imageAlt?: string;
    title: string;
}

const IconBanner: React.FC<IconBannerProps> = ({ imageSrc, imageAlt = "Icon", title }) => {
    return (
        <div className="flex flex-col items-center justify-around w-full">
            <img src={imageSrc} alt={imageAlt} className="w-52 h-52 object-contain" />
            <span className="mt-2 text-center text-4xl text-white font-serif font-bold mx-22">{title}</span>
        </div>
    );
};

export default IconBanner;