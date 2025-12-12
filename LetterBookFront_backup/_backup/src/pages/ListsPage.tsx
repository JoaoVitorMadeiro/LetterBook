'use client';
import React from 'react';
import { Search, Plus, X, User, Activity, MessageSquare, Heart } from 'lucide-react';

// Componente para simular o ícone do Logo (Livros na estante)
const LogoIcon = () => (
  <div className="flex items-end gap-[2px] mr-2">
    <div className="w-1.5 h-4 bg-orange-600 rounded-sm"></div>
    <div className="w-1.5 h-6 bg-green-700 rounded-sm"></div>
    <div className="w-1.5 h-5 bg-yellow-600 rounded-sm"></div>
  </div>
);

// Componente para as capas dos livros sobrepostas (O "Stack" visual)
const BookStack = () => {
  // Cores placeholders para simular as capas de La La Land e outros livros da imagem
  const covers = [
    "bg-gradient-to-br from-purple-600 to-indigo-900", // Fundo/Trás
    "bg-gradient-to-br from-yellow-400 to-orange-500", // Meio
    "bg-gradient-to-br from-blue-300 to-slate-500",    // Frente
    "bg-gradient-to-br from-purple-800 to-black"        // Lateral
  ];

  return (
    <div className="relative h-40 w-full mb-4 group cursor-pointer">
      {/* Container das imagens para centralizar o efeito */}
      <div className="flex justify-center items-center h-full relative pl-4">
        {/* Livro 4 (Fundo Direita) */}
        <div className={`absolute left-[65%] w-20 h-32 ${covers[3]} rounded-r-md shadow-lg transform rotate-3 border-l border-white/10 z-0`}></div>

        {/* Livro 3 (Fundo Esquerda) */}
        <div className={`absolute left-[15%] w-20 h-32 ${covers[0]} rounded-l-md shadow-lg transform -rotate-3 border-r border-white/10 z-10`}>
          <div className="absolute bottom-4 left-0 w-full text-center text-[8px] text-white font-bold opacity-80">LA LA LAND</div>
        </div>

        {/* Livro 2 (Meio) */}
        <div className={`absolute left-[30%] w-22 h-36 ${covers[1]} rounded shadow-xl z-20 transform -translate-y-1`}>
          <div className="absolute top-2 w-full text-center text-[8px] text-white font-serif">Music</div>
        </div>

        {/* Livro 1 (Frente - Destaque) */}
        <div className={`absolute left-[45%] w-22 h-36 ${covers[2]} rounded shadow-2xl z-30 transform translate-y-1`}>
          <div className="absolute bottom-8 right-2 text-white font-bold text-xs rotate-90">Basic</div>
        </div>
      </div>
    </div>
  );
};

const ListsPage = () => {
  return (
    <div className="min-h-screen bg-[#111316] text-gray-200 font-sans selection:bg-green-500 selection:text-white">

      {/* --- HEADER --- */}
      <header className="flex items-center justify-between px-6 py-4 bg-[#111316] border-b border-gray-800/50">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <a href="#" className="flex items-center text-xl font-bold text-white tracking-wide">
            <LogoIcon />
            <span>Letterbook</span>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-400">
            <a href="#" className="hover:text-white transition-colors">Ranking</a>
            <a href="#" className="hover:text-white transition-colors">Livros</a>
            <a href="#" className="hover:text-white transition-colors">Comunidade</a>
            <a href="#" className="hover:text-white transition-colors">Resenhas</a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="flex items-center bg-gray-200 rounded-md px-3 py-1.5 w-64">
            <Search size={16} className="text-gray-500 mr-2" />
            <input
              type="text"
              className="bg-transparent border-none outline-none text-gray-800 text-sm w-full placeholder-gray-500"
            />
            <X size={16} className="text-gray-500 cursor-pointer hover:text-gray-800" />
          </div>

          {/* Add Button */}
          <button className="bg-[#00d664] hover:bg-[#00b553] text-black font-bold text-sm px-4 py-1.5 rounded-md flex items-center gap-1 transition-colors">
            <Plus size={16} strokeWidth={3} /> Add
          </button>

          {/* Profile Dropdown */}
          <div className="flex items-center gap-2 cursor-pointer text-gray-400 hover:text-white">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
              <User size={16} />
            </div>
            <span className="text-sm font-medium">fulano</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <div className="flex flex-col items-center justify-center py-16 text-center px-4">
        <h2 className="text-xl md:text-2xl text-gray-200 font-normal mb-6 max-w-2xl leading-relaxed">
          Colecione, organize e compartilhe. Listas são a maneira perfeita de agrupar livros...
        </h2>
        <button className="bg-[#4b5563] hover:bg-[#374151] text-gray-200 font-medium px-6 py-2 rounded-full text-sm transition-colors shadow-lg">
          Comece sua própria lista
        </button>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="max-w-7xl mx-auto px-6 pb-20">

        {/* SECTION: MINHAS LISTAS */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-2 border-b border-gray-700 pb-2">
            <h3 className="text-lg font-bold text-white">Minhas Listas</h3>
            <div className="flex items-center text-xs text-gray-400 cursor-pointer hover:text-white">
              <Activity size={12} className="mr-1" /> All Activity
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">

            {/* Card 1 */}
            <div className="group">
              <div className="bg-[#1a1d21] rounded-lg p-4 hover:bg-[#22252a] transition-colors duration-300">
                <BookStack />
              </div>
              <h4 className="mt-3 text-white font-bold text-base group-hover:underline cursor-pointer">Meus favoritos de 2025</h4>
            </div>

            {/* Card 2 */}
            <div className="group">
              <div className="bg-[#1a1d21] rounded-lg p-4 hover:bg-[#22252a] transition-colors duration-300">
                <BookStack />
              </div>
              <h4 className="mt-3 text-white font-bold text-base group-hover:underline cursor-pointer">Lidos auto-ajuda</h4>
            </div>

            {/* Card 3 (Com meta dados) */}
            <div className="group">
              <div className="bg-[#1a1d21] rounded-lg p-4 hover:bg-[#22252a] transition-colors duration-300">
                <BookStack />
              </div>
              <h4 className="mt-3 text-white font-bold text-base group-hover:underline cursor-pointer">Coleção mauricio de sousa</h4>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-gray-600 flex items-center justify-center"><User size={8} /></div>
                  <span>fulano</span>
                </div>
                <span>20 Livros</span>
                <span className="flex items-center gap-0.5"><Heart size={10} /> 0</span>
                <span className="flex items-center gap-0.5"><MessageSquare size={10} /> 0</span>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION: LISTAS EM DESTAQUE */}
        <section>
          <div className="flex items-center justify-between mb-2 border-b border-gray-700 pb-2">
            <h3 className="text-lg font-bold text-white">Listas em Destaque</h3>
            <div className="flex items-center text-xs text-gray-400 cursor-pointer hover:text-white">
              <Activity size={12} className="mr-1" /> All Activity
            </div>
          </div>

          <div className="mt-6 max-w-md">
            <div className="group">
              <div className="bg-[#1a1d21] rounded-lg p-4 hover:bg-[#22252a] transition-colors duration-300 mb-3">
                <BookStack />
              </div>

              <h4 className="text-white font-bold text-base group-hover:underline cursor-pointer">Best Sellers 2025 - Ficção</h4>

              <div className="flex items-center gap-3 mt-1 mb-2 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <div className="w-5 h-5 rounded-full bg-blue-900 flex items-center justify-center text-[8px] text-white">T</div>
                  <span className="text-gray-300">tico01</span>
                </div>
                <span>79 Livros</span>
                <span className="flex items-center gap-0.5"><Heart size={10} /> 93</span>
                <span className="flex items-center gap-0.5"><MessageSquare size={10} /> 868</span>
              </div>

              Os best-sellers de ficção de 2025 incluem obras de autores como Colleen Hoover (&quot;<span className="underline cursor-pointer text-gray-300">Verity</span>&quot; e &quot;<span className="underline cursor-pointer text-gray-300">É Assim Que Acaba</span>&quot;), Rebecca Yarros (&quot;<span className="underline cursor-pointer text-gray-300">Quarta Asa</span>&quot;, &quot;<span className="underline cursor-pointer text-gray-300">Tempestade de Onix</span>&quot;).
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default ListsPage;