import React from 'react';
import Image from 'next/image';
import { Heart, AlignJustify, User } from 'lucide-react';

interface BookCardProps {
    coverUrl: string;
    userName: string;
    date: string;
    className?: string;
}

export const BookCard = ({ coverUrl, userName, date, className }: BookCardProps) => {
    return (
        <div className={`flex flex-col items-start px-[8px] ${className} w-[170px] h-[293px]`}>
            {/* Frame 4 - Inner Card Container */}
            <div className="flex flex-col justify-center items-start w-[162px] h-[285px] rounded-[8px] bg-[#556677] overflow-hidden">

                {/* Cover Image */}
                <div className="relative w-[162px] h-[247px] bg-cover bg-center shrink-0">
                    <Image
                        src={coverUrl}
                        alt={`Capa do livro postado por ${userName}`}
                        fill
                        className="object-cover"
                        sizes="162px"
                    />
                </div>

                {/* User Bar (Frame 5) */}
                <div className="flex flex-row items-center p-[8px] gap-[8px] w-[162px] h-[40px] bg-[#556677]">
                    {/* Avatar */}
                    <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#334455] shrink-0">
                        <User size={16} className="text-[#CCDDEE]" />
                    </div>

                    {/* User Name Link */}
                    <div className="flex items-center gap-[10px] w-[35px] h-[21px]">
                        <span className="font-sans text-[16px] leading-[20px] text-white underline decoration-white">{userName}</span>
                    </div>
                </div>
            </div>

            {/* Icon Bar */}
            <div className="flex flex-row justify-between items-center p-[8px] gap-[14px] w-[154px] h-[32px]">
                <div className="flex items-center gap-[4px] w-[48px] h-[24px]">
                    <button className="text-[#BBCCDD] hover:text-[#00E054] transition-colors">
                        <Heart size={20} />
                    </button>
                    <span className="text-[#BBCCDD] text-[12px]"></span>
                </div>
                <span className="font-sans font-semibold text-[16px] leading-[20px] text-[#BBCCDD] text-center w-[48px]">
                    {date}
                </span>
            </div>
        </div>
    );
};
