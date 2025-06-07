//Página das categorias
'use client';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';


export default function CategoriaPage() {
    const { tipo, id } = useParams();
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [genreName, setGenreName] = useState('');

    const backgroundUrl = 'https://img.freepik.com/fotos-gratis/variedade-de-elementos-de-cinema-em-fundo-vermelho-com-espaco-de-copia_23-2148457848.jpg?semt=ais_hybrid&w=740'

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            
            try{
                 const res = await fetch(
                `https://api.themoviedb.org/3/discover/${tipo}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=pt-BR&page=${page}&with_genres=${id}`
                );

                const data = await res.json();

                setItems((prev) => {
                const existingIds = new Set(prev.map(item => item.id));
                const newItems = data.results.filter(item => !existingIds.has(item.id));
                return [...prev, ...newItems];
            });
                
            } catch (error) {
                console.error('Erro ao carregar os dados por categoria:', error);
            }

            

            setLoading(false);
        }

        fetchData();
    }, [tipo, id, page]);


    //Buscar o nome da categoria(genero) atual
    useEffect(() => {
        async function fetchGenreName() {
           try {
            const res = await fetch(
                `https://api.themoviedb.org/3/genre/${tipo}/list?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=pt-BR`
            );
            const data = await res.json();

            if (data?.genres && Array.isArray(data.genres)) {
                const matchedGenre = data.genres.find(
                    (g) => g.id.toString() === id.toString()
                );

                if (matchedGenre) {
                    setGenreName(matchedGenre.name);
                } else {
                    console.warn("Gênero não encontrado para id:", id);
                }
            } else {
                console.warn("Resposta da API não contém 'genres'", data);
            }
        } catch (error) {
            console.error("Erro ao buscar o nome da categoria:", error);
        }
    }

    if (tipo && id) {
        fetchGenreName();
    }

    }, [tipo, id]);

     function loadMore() {
        setPage((prev) => prev + 1);
    };

    function resolvePath(tipo) {
        return tipo === 'movie' ? 'movies' : 'tv';
    }

    return (
         <div className="relative">
            {/*BACKGROUND COM OVERLAY PRETO */}
            <div className="fixed z-10 inset-0 bg-cover bg-center blur-md scale-105"
            style={{ backgroundImage: `url(${backgroundUrl})` }} />
            <div className="fixed z-10 inset-0 bg-black opacity-70" />


            {/*CONTEUDO PRINCIPAL DA PAGINA */}
             <motion.main className="relative z-10 p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-white">
                {tipo === 'movie' ? 'Filmes' : 'Séries'} da categoria {genreName && `"${genreName}"`}
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {items.map((item) => (
                    <Link key={item.id} href={`/${resolvePath(tipo)}/${item.id}`}>
                        <motion.div className="group cursor-pointer relative" whileHover={{
                            scale: 1.1,
                            transition: {
                                duration: .2
                            }
                        }}>
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
                                    ⭐ {item.vote_average.toFixed(1)} / 10
                                </p>
                            </div>



                        </motion.div>
                    </Link>
                        
                ))}
            </div>


            <div className="flex justify-center mt-8">
                <button
                    onClick={loadMore}
                    disabled={loading}
                    className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition hover:cursor-pointer">
                        {loading ? 'Carregando...' : 'Carregar mais'}
                    </button>
            </div>    



        </motion.main>





        </div>
    )
}