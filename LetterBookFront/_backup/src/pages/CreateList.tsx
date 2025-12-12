'use client';
import React, { useState } from 'react';
import { Search, Plus, X, User } from 'lucide-react';

// Reutilizando o ícone do Logo para consistência
const LogoIcon = () => (
  <div className="flex items-end gap-[2px] mr-2">
    <div className="w-1.5 h-4 bg-orange-600 rounded-sm"></div>
    <div className="w-1.5 h-6 bg-green-700 rounded-sm"></div>
    <div className="w-1.5 h-5 bg-yellow-600 rounded-sm"></div>
  </div>
);

const CreateList = () => {
  // Estado para controlar o tipo de lista (apenas visual neste exemplo)
  const [listType, setListType] = useState('public');

  return (
    <div className="min-h-screen bg-[#111316] text-gray-200 font-sans selection:bg-green-500 selection:text-white">
      
      {/* --- HEADER (Reutilizado para contexto) --- */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#111316] border-b border-gray-800/50 mb-8">
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center text-xl font-bold text-white tracking-wide">
            <LogoIcon />
            <span>Letterbook</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Livros</a>
            <a href="#" className="hover:text-white transition-colors">Comunidade</a>
            <a href="#" className="hover:text-white transition-colors">Resenhas</a>
            <a href="#" className="hover:text-white transition-colors">Ranking</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Search size={18} className="text-gray-400 cursor-pointer hover:text-white" />
          <button className="bg-[#00d664] hover:bg-[#00b553] text-black font-bold text-sm px-4 py-1.5 rounded-md flex items-center gap-1 transition-colors">
            <Plus size={16} strokeWidth={3} /> Add
          </button>
          <div className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
               <User size={16} />
            </div>
            <span className="text-sm font-medium">fulano</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </header>

      {/* --- MAIN FORM CONTAINER --- */}
      <main className="max-w-6xl mx-auto px-6 pb-20">
        
        {/* Title Section */}
        <div className="flex justify-between items-end border-b border-gray-700 pb-2 mb-8 relative">
          <h1 className="text-2xl font-bold text-white">Nova lista</h1>
          <button className="text-red-600 hover:text-red-500 transition-colors absolute right-0 bottom-4">
            <X size={28} strokeWidth={3} />
          </button>
        </div>

        {/* Form Fields */}
        <div className="flex flex-col gap-6">

          {/* Nome */}
          <div className="flex flex-col gap-2 w-full md:w-2/3">
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <span className="w-3 h-3 rounded-full bg-[#00d664]"></span>
              Nome
            </label>
            <input 
              type="text" 
              placeholder="Text"
              className="w-full bg-white text-gray-900 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Etiquetas */}
          <div className="flex flex-col gap-1 w-full md:w-2/3">
            <label className="text-sm text-gray-300 ml-5">Etiquetas</label>
            <input 
              type="text" 
              placeholder="Text"
              className="w-full bg-white text-gray-900 rounded px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-500"
            />
            <span className="text-xs text-gray-500 mt-1 italic">#Suspense #Terror #Brasil</span>
          </div>

          {/* Tipo de Lista (Radio) */}
          <div className="flex flex-col gap-2 mb-4">
            <label className="text-sm text-gray-300">Tipo de lista</label>
            <div className="flex gap-6">
              
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center ${listType === 'public' ? 'bg-white border-white' : ''}`}>
                  {listType === 'public' && <div className="w-1.5 h-1.5 bg-black rounded-full"></div>}
                </div>
                <input type="radio" name="type" className="hidden" onClick={() => setListType('public')} />
                <span className="text-sm text-gray-300 group-hover:text-white">Pública</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center ${listType === 'onlyme' ? 'bg-white border-white' : ''}`}>
                   {listType === 'onlyme' && <div className="w-1.5 h-1.5 bg-black rounded-full"></div>}
                </div>
                <input type="radio" name="type" className="hidden" onClick={() => setListType('onlyme')} />
                <span className="text-sm text-gray-300 group-hover:text-white">Somente eu</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer group">
                 <div className={`w-4 h-4 rounded-full border border-gray-400 flex items-center justify-center ${listType === 'private' ? 'bg-white border-white' : ''}`}>
                   {listType === 'private' && <div className="w-1.5 h-1.5 bg-black rounded-full"></div>}
                </div>
                <input type="radio" name="type" className="hidden" onClick={() => setListType('private')} />
                <span className="text-sm text-gray-300 group-hover:text-white">Privada</span>
              </label>

            </div>
          </div>

          {/* Bottom Split Section: Books Input vs Description */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column: Add Books */}
            <div className="flex flex-col gap-0">
              {/* Search Row */}
              <div className="flex w-full mb-0">
                <button className="bg-[#00d664] hover:bg-[#00b553] text-black font-bold text-xs px-6 py-2 rounded-l-sm transition-colors uppercase whitespace-nowrap">
                  Adicionar Livros
                </button>
                <input 
                  type="text" 
                  placeholder="Digite o nome do Livro...."
                  className="w-full bg-white text-gray-900 rounded-r-sm px-3 py-2 text-sm outline-none"
                />
              </div>
              
              {/* Empty State Box */}
              <div className="w-full h-64 border border-gray-600/50 mt-2 flex items-center justify-center p-8 text-center bg-[#111316]">
                <p className="text-gray-300 text-sm max-w-xs leading-relaxed">
                  Adicione livros usando o campo acima ou através dos Links no pôster ou na página do livro.
                </p>
              </div>
            </div>

            {/* Right Column: Description */}
            <div className="flex flex-col gap-2 h-full">
              <label className="text-sm text-gray-300">Description</label>
              <textarea 
                placeholder="Text"
                className="w-full h-full min-h-[290px] bg-white text-gray-900 rounded-sm p-3 text-sm outline-none resize-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
};

export default CreateList;