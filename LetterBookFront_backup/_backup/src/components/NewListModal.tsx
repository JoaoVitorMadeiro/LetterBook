'use client';

import React from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { cn } from '@/lib/utils';

interface NewListModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const NewListModal = ({ isOpen, onClose }: NewListModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-4xl rounded-lg bg-[#121212] p-8 shadow-2xl ring-1 ring-white/10 animate-in fade-in zoom-in-95 duration-200">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-800 pb-4 mb-8">
                    <h2 className="text-2xl font-medium text-white">Nova lista</h2>
                    <button onClick={onClose} className="text-red-500 hover:text-red-400 transition-colors">
                        <X size={28} />
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Left Column: Form Fields */}
                    <div className="space-y-6">

                        {/* Name */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                                <span className="h-3 w-3 rounded-full bg-green-500"></span>
                                Nome
                            </label>
                            <Input placeholder="Text" className="bg-white text-black border-transparent placeholder:text-gray-400 h-10" />
                        </div>

                        {/* Tags */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Etiquetas</label>
                            <Input placeholder="Text" className="bg-white text-black border-transparent placeholder:text-gray-400 h-10" />
                            <div className="flex gap-2 text-xs text-gray-500">
                                <span>#Suspense</span>
                                <span>#Terror</span>
                                <span>#Brasil</span>
                            </div>
                        </div>

                        {/* Privacy */}
                        <div className="space-y-3 pt-2">
                            <label className="text-sm font-medium text-gray-300">Tipo de Lista</label>
                            <div className="flex items-center gap-6">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="privacy" className="accent-white h-4 w-4" defaultChecked />
                                    <span className="text-sm text-gray-300">Pública</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="privacy" className="accent-white h-4 w-4" />
                                    <span className="text-sm text-gray-300">Somente eu</span>
                                </label>
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input type="radio" name="privacy" className="accent-white h-4 w-4" />
                                    <span className="text-sm text-gray-300">Privada</span>
                                </label>
                            </div>
                        </div>

                        {/* Book Search */}
                        <div className="pt-8">
                            <Input
                                placeholder="Digite o nome do livro...."
                                className="bg-white text-black border-transparent placeholder:text-gray-400 h-10"
                            />
                            <p className="mt-4 text-center text-sm text-gray-400 leading-relaxed">
                                Adicione livros usando o campo acima ou através dos links no pôster ou na página do livro.
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Description</label>
                        <textarea
                            className="w-full h-[400px] resize-none rounded-md bg-white p-4 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Text"
                        ></textarea>
                    </div>
                </div>
            </div>
        </div>
    );
};
