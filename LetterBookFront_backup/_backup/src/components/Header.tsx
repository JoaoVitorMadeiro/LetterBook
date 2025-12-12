'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Plus, User, ChevronDown } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { NewListModal } from './NewListModal';

export const Header = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <header className="absolute top-0 left-0 flex h-[125px] w-full items-center justify-between border-b border-white/5 bg-background px-[12px] py-[8px] pl-[96px] shadow-[0px_4px_30px_rgba(153,170,187,0.2)]">
                <div className="flex items-center gap-[192px]"> {/* Gap between Logo and Nav area based on spec */}
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <Link href="/" className="flex items-end gap-[2px]">
                            {/* Recreating the vector logo from spec more precisely if possible, or sticking to the current approximation but sizing it correctly */}
                            <div className="flex items-end gap-[2px]">
                                <div className="h-[14.5px] w-[11.2px] bg-white"></div>
                                <div className="h-[10px] w-[13.2px] bg-white"></div>
                                <div className="h-[13px] w-[9px] bg-white"></div>
                                <div className="h-[13px] w-[9px] bg-white"></div>
                                <div className="h-[10px] w-[13px] bg-white"></div>
                            </div>
                            <span className="ml-3 font-sans text-xl font-bold tracking-tight text-white">Latterbook</span>
                        </Link>
                    </div>
                </div>

                {/* Navigation & Actions Container */}
                <div className="flex w-[1292px] items-center justify-end gap-[36px]">
                    {/* Navigation Links */}
                    <nav className="hidden md:flex items-center gap-[36px]">
                        {['Livros', 'Comunidade', 'Resenhas', 'Ranking'].map((item) => (
                            <Link
                                key={item}
                                href="#"
                                className="font-nav text-[16px] text-white hover:text-primary transition-colors"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="flex items-center gap-[8px]">
                        {/* Search */}
                        <div className="flex h-[40px] w-[40px] items-center justify-center rounded-[8px]">
                            <Search size={24} className="text-[#BBCCDD]" />
                        </div>

                        {/* Add Button */}
                        <Button
                            variant="primary"
                            className="flex h-[36px] w-[70px] items-center justify-center gap-[8px] rounded-[8px] bg-[#00E054] px-[8px] font-sans text-[16px] text-[#14181C] hover:bg-[#00c048]"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus size={12} strokeWidth={3} />
                            Add
                        </Button>

                        {/* User Profile */}
                        <div className="ml-[8px] flex h-[24px] w-[106px] items-center gap-[8px]">
                            <div className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#334455]">
                                <User size={16} className="text-[#CCDDEE]" />
                            </div>
                            <button className="flex items-center gap-[4px]">
                                <span className="font-nav text-[16px] text-white">fulano</span>
                                <ChevronDown size={16} className="text-white" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <NewListModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};
