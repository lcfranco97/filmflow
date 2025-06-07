'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { IoSearch } from "react-icons/io5";

export default function BuscaPage() {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);

  const backgroundUrl = 'https://img.freepik.com/fotos-gratis/variedade-de-elementos-de-cinema-em-fundo-vermelho-com-espaco-de-copia_23-2148457848.jpg?semt=ais_hybrid&w=740';

  async function buscar() {
    if (!query.trim()) return;

    setLoading(true);
    setResultados([]);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=pt-BR&query=${query}`
      );
      const data = await res.json();

      // Filtra para incluir apenas filmes e séries com imagem
      const filtrados = data.results.filter(item =>
        (item.media_type === 'movie' || item.media_type === 'tv') &&
        item.poster_path
      );

      setResultados(filtrados);
    } catch (error) {
      console.error('Erro ao buscar:', error);
    }

    setLoading(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    buscar();
  }

  function resolvePath(tipo) {
    return tipo === 'movie' ? 'movies' : 'tv';
  }

  return (
    <div className="relative">
      {/* BACKGROUND COM OVERLAY */}
      <div className="fixed z-10 inset-0 bg-cover bg-center blur-md scale-105"
        style={{ backgroundImage: `url(${backgroundUrl})` }} />
      <div className="fixed z-10 inset-0 bg-black opacity-70" />

      {/* CONTEÚDO PRINCIPAL */}
      <main className="relative z-10 p-6 max-w-6xl mx-auto text-white mt-12">
        <h1 className="text-3xl font-bold mb-6">Buscar Filmes ou Séries</h1>

        {/* FORMULÁRIO DE BUSCA */}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Digite o nome do filme ou série"
            className="flex-1 px-4 py-3 rounded text-white border-2"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded text-white font-semibold cursor-pointer text-2xl w-[70px]  sm:w-[70px]"
           
          >
             <IoSearch />
          </button>
        </form>

        {/* RESULTADOS */}
        {resultados.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {resultados.map((item) => (
              <Link key={item.id} href={`/${resolvePath(item.media_type)}/${item.id}`}>
                <motion.div className="group cursor-pointer relative" whileHover={{ scale: 1.05 }}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    alt={item.title || item.name}
                    width={300}
                    height={450}
                    className="rounded-lg group-hover:opacity-75 transition duration-300"
                  />
                  <div className="mt-2 text-sm text-white">
                    <h2 className="font-semibold truncate">{item.title || item.name}</h2>
                    <p className="text-xs text-gray-400">
                      ⭐ {item.vote_average?.toFixed(1) || 'N/A'} / 10
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}

        {/* NENHUM RESULTADO */}
        {!loading && resultados.length === 0 && query && (
          <p className="text-gray-300">Nenhum resultado encontrado.</p>
        )}
      </main>
    </div>
  );
}