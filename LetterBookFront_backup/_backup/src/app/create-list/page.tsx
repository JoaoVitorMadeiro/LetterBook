'use client';
import React from 'react';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const NewListPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
      {/* Container Principal do Modal/Página */}
      <div className="w-full max-w-4xl bg-[#1a1a1a] p-8 rounded-lg shadow-lg relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-white text-2xl font-medium">Nova lista</h1>
          <button 
            onClick={() => router.back()} 
            className="text-red-500 hover:text-red-400 transition-colors"
          >
            <X size={32} />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Coluna da Esquerda: Formulários Principais */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Campo: Nome */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <label htmlFor="name" className="text-white font-medium">Nome</label>
              </div>
              <input
                type="text"
                id="name"
                placeholder="Text"
                className="w-full p-3 rounded-md bg-white text-black border-none focus:ring-2 focus:ring-green-500 outline-none"
              />
            </div>

            {/* Campo: Etiquetas */}
            <div>
              <label htmlFor="tags" className="text-white font-medium block mb-2">Etiquetas</label>
              <input
                type="text"
                id="tags"
                placeholder="Text"
                className="w-full p-3 rounded-md bg-white text-black border-none focus:ring-2 focus:ring-green-500 outline-none"
              />
              <p className="text-gray-500 text-sm mt-1">#Suspense #Terror #Brasil</p>
            </div>

            {/* Campo: Tipo de lista (Radio Buttons) */}
            <div>
              <label className="text-white font-medium block mb-3">Tipo de lista</label>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input type="radio" name="listType" value="public" defaultChecked className="accent-green-500 w-5 h-5" />
                  Pública
                </label>
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input type="radio" name="listType" value="private_me" className="accent-green-500 w-5 h-5" />
                  Somente eu
                </label>
                <label className="flex items-center gap-2 text-white cursor-pointer">
                  <input type="radio" name="listType" value="private" className="accent-green-500 w-5 h-5" />
                  Privada
                </label>
              </div>
            </div>

            {/* Área de Adicionar Livros */}
            <div className="mt-4">
              <div className="flex gap-2 mb-4">
                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md font-medium transition-colors whitespace-nowrap">
                  Adicionar Livro
                </button>
                <input
                  type="text"
                  placeholder="Digite o nome do Livro...."
                  className="w-full p-3 rounded-md bg-white text-black border-none focus:ring-2 focus:ring-green-500 outline-none"
                />
              </div>
              
              {/* Placeholder da Lista de Livros */}
              <div className="border-2 border-[#2a2a2a] rounded-md h-64 flex items-center justify-center p-6 text-center">
                <p className="text-gray-400 leading-relaxed">
                  Adicione livros usando o campo acima ou através dos Links
                  <br />
                  no pôster ou na página do livro.
                </p>
              </div>
            </div>
          </div>

          {/* Coluna da Direita: Descrição */}
          <div className="flex-1 lg:max-w-sm flex flex-col">
            <label htmlFor="description" className="text-white font-medium block mb-2">Description</label>
            <textarea
              id="description"
              placeholder="Text"
              className="w-full h-full min-h-[300px] p-3 rounded-md bg-white text-black border-none focus:ring-2 focus:ring-green-500 outline-none resize-none"
            ></textarea>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NewListPage;