import React from 'react';
import { Search, Plus, User, Zap, Heart, AlignJustify, ChevronDown } from 'lucide-react';

// --- Componente: Logo (As 3 barrinhas coloridas) ---
const Logo = () => (
  <div className="flex items-center gap-3">
    <div className="flex gap-[2px]">
      <div className="w-3 h-4 bg-[#ff8000] rounded-sm"></div>
      <div className="w-3 h-4 bg-[#00e054] rounded-sm"></div>
      <div className="w-3 h-4 bg-[#40bcf4] rounded-sm"></div>
    </div>
    <span className="font-bold text-xl text-white tracking-tight">Latterbook</span>
  </div>
);

// --- Componente: Navbar ---
const Navbar = () => {
  return (
    <nav className="bg-background/95 backdrop-blur border-b border-surface py-3 px-6 sticky top-0 z-50">
      <div className="max-w-[1100px] mx-auto flex items-center justify-between">
        <Logo />

        {/* Menu Central */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-textMuted uppercase tracking-wide">
          <a href="#" className="hover:text-white transition-colors">Livros</a>
          <a href="#" className="hover:text-white transition-colors">Comunidade</a>
          <a href="#" className="hover:text-white transition-colors">Resenhas</a>
          <a href="#" className="hover:text-white transition-colors">Ranking</a>
        </div>

        {/* Ações da Direita */}
        <div className="flex items-center gap-4">
          <Search className="w-5 h-5 text-textMuted hover:text-white cursor-pointer" />
          
          <button className="bg-primary hover:bg-green-400 text-black font-bold py-1.5 px-5 rounded flex items-center gap-1 transition-colors text-sm">
            <Plus size={16} strokeWidth={3} /> Add
          </button>

          <div className="flex items-center gap-2 cursor-pointer group">
             <div className="w-7 h-7 bg-surface rounded-full flex items-center justify-center border border-transparent group-hover:border-textMuted transition-colors">
                <User size={14} className="text-textMuted" />
             </div>
             <div className="flex items-center gap-1 text-textMuted group-hover:text-white text-sm font-medium">
                <span>fulano</span>
                <ChevronDown size={12} />
             </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- Componente: Card de Livro ---
interface BookCardProps {
  title: string;
  coverUrl: string;
  user: string;
  date: string;
}

const BookCard = ({ title, coverUrl, user, date }: BookCardProps) => {
  return (
    <div className="flex flex-col group cursor-pointer">
      {/* Capa do Livro (com hover effect sutil) */}
      <div className="relative aspect-[2/3] bg-surface rounded-t-md overflow-hidden border border-transparent group-hover:border-primary transition-all shadow-lg">
        <img src={coverUrl} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Barra do Usuário (Azul acinzentado) */}
      <div className="bg-[#4b5563] py-1.5 px-3 flex items-center gap-2">
        <div className="w-4 h-4 bg-gray-300 rounded-full flex-shrink-0"></div>
        <span className="text-gray-200 text-xs font-medium">{user}</span>
      </div>

      {/* Barra de Ações (Fundo escuro) */}
      <div className="bg-background pt-2 flex items-center justify-between text-secondary">
        <div className="flex items-center gap-3">
          <Heart size={14} className="hover:text-red-500 transition-colors" />
          <AlignJustify size={14} className="hover:text-white transition-colors" />
        </div>
        <span className="text-xs font-medium">{date}</span>
      </div>
    </div>
  );
};

// --- Componente: Banner Pro ---
const ProBanner = () => {
  return (
    <div className="w-full mt-16 h-32 relative rounded overflow-hidden group cursor-pointer">
      {/* Imagem de fundo simulada/Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-600">
        <img 
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=cover" 
          className="w-full h-full object-cover opacity-80 mix-blend-multiply"
          alt="Banner bg" 
        />
      </div>
      
      {/* Conteúdo do Banner */}
      <div className="absolute inset-0 flex items-center justify-between px-10">
        <div className="max-w-lg">
           <h2 className="text-2xl font-bold text-white mb-1 uppercase italic tracking-tighter">
             Ever dreamt of a better version of yourself?
           </h2>
           <p className="text-gray-200 text-sm leading-tight drop-shadow-md">
             Get annual and all-time stats, filtering by your favorite streaming services, watchlist notifications, no third-party ads and more...
           </p>
        </div>
        
        <div className="flex items-center">
           <span className="text-white font-bold text-lg mr-2 italic">UPGRADE TO</span>
           <span className="bg-[#00e054] text-black font-black px-2 py-0.5 rounded text-sm uppercase">PRO</span>
        </div>
      </div>
    </div>
  );
};

// --- Dados Mockados ---
const BOOKS = [
  { id: 1, title: "Como Salvar a Amazônia", user: "Katie", date: "Apr 07", cover: "https://m.media-amazon.com/images/I/81AhK-XkLHL._SL1500_.jpg" },
  { id: 2, title: "Paixão por Israel", user: "Katie", date: "Apr 07", cover: "https://m.media-amazon.com/images/I/61y+Mv4y1IL._SL1360_.jpg" }, // Exemplo diferente
  { id: 3, title: "Como Salvar a Amazônia", user: "Katie", date: "Apr 07", cover: "https://m.media-amazon.com/images/I/81AhK-XkLHL._SL1500_.jpg" },
  { id: 4, title: "Como Salvar a Amazônia", user: "Katie", date: "Apr 07", cover: "https://m.media-amazon.com/images/I/81AhK-XkLHL._SL1500_.jpg" },
  { id: 5, title: "Como Salvar a Amazônia", user: "Katie", date: "Apr 07", cover: "https://m.media-amazon.com/images/I/81AhK-XkLHL._SL1500_.jpg" },
  { id: 6, title: "Como Salvar a Amazônia", user: "Katie", date: "Apr 07", cover: "https://m.media-amazon.com/images/I/81AhK-XkLHL._SL1500_.jpg" },
];

// --- Página Principal ---
export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background text-textMain font-sans pb-20">
      <Navbar />

      <main className="max-w-[1100px] mx-auto px-6 pt-12">
        
        {/* Texto de Boas Vindas */}
        <h1 className="text-center text-xl text-gray-200 mb-16 font-light">
          Olá Fulano, faça avaliação do último livro que você leu...
        </h1>

        {/* Seção: Livros Populares */}
        <div className="mb-4">
           {/* Cabeçalho da Seção */}
           <div className="flex justify-between items-end border-b border-surface pb-1 mb-4">
              <h2 className="text-sm text-textMuted font-medium hover:text-white cursor-pointer">
                Livros populares desse mês
              </h2>
              <div className="flex items-center gap-1 text-xs text-textMuted uppercase tracking-wider cursor-pointer hover:text-white">
                 <Zap size={12} fill="currentColor" />
                 <span>All Activity</span>
              </div>
           </div>

           {/* Grid de Livros */}
           <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {BOOKS.map((book) => (
                <BookCard 
                  key={book.id}
                  title={book.title}
                  coverUrl={book.cover}
                  user={book.user}
                  date={book.date}
                />
              ))}
           </div>
        </div>

        {/* Banner de Propaganda */}
        <ProBanner />

      </main>
    </div>
  );
}