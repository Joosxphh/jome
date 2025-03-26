// File: src/app/components/MenuCard.tsx
import Image from "next/image";
import React from "react";

interface MenuCardProps {
    imageSrc: string;
    imageAlt: string;
    title: string;
    text: string;
    width?: number;
    height?: number;
}

const MenuCard: React.FC<MenuCardProps> = ({
       imageSrc,
       imageAlt,
       title,
       text,
       width = 400,
       height = 200,
   }) => {
    return (
        <li className="bg-white p-4 rounded-lg shadow-lg">
            <Image
                src={imageSrc}
                alt={imageAlt}
                width={width}
                height={height}
                className="w-full h-[200px] object-cover rounded-lg mb-4"
            />
            <h3 className="text-secondaire text-xl font-serif font-bold">{title}</h3>
            <p className="text-lg text-principale">{text}</p>
        </li>
    );
};

export default MenuCard;