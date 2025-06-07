//Lista de filmes com paginação
'use client';

import { useState, useEffect } from "react";
import { getMoviesByPage } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { motion } from 'framer-motion';

export default function MoviesPage() {
    const [movies, setMovies] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

     const backgroundUrl = 'https://img.freepik.com/fotos-gratis/variedade-de-elementos-de-cinema-em-fundo-vermelho-com-espaco-de-copia_23-2148457848.jpg?semt=ais_hybrid&w=740'

    useEffect(() => {
        async function fetchMovies() {
            setLoading(true);
            const newMovies = await getMoviesByPage(currentPage);

            setMovies((prevMovies) => {
                const existingIds = new Set(prevMovies.map(movie => movie.id));
                const uniqueNewMovies = newMovies.filter(movie => !existingIds.has(movie.id));
                return [...prevMovies, ...uniqueNewMovies];
            })


            setLoading(false);
        }
        
        fetchMovies();
    }, [currentPage]);

    function loadMore() {
        setCurrentPage((prev) => prev + 1);
    };


    return (

        <div className="relative">
            {/*BACKGROUND COM OVERLAY PRETO */}
            <div className="fixed z-10 inset-0 bg-cover bg-center blur-md scale-105"
            style={{ backgroundImage: `url(${backgroundUrl})` }} />
            <div className="fixed z-10 inset-0 bg-black opacity-70" />


            {/*CONTEUDO PRINCIPAL DA PAGINA */}
             <motion.main className="relative z-10 p-6 max-w-6xl mx-auto mt-12">
            <h1 className="text-3xl font-bold mb-6 text-white">Todos os filmes</h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {movies.map((movie) => (
                    <Link key={movie.id} href={`/movies/${movie.id}`}>
                        <motion.div className="group cursor-pointer relative" whileHover={{
                            scale: 1.1,
                            transition: {
                                duration: .2
                            }
                        }}>
                            <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                width={300}
                                height={450}
                                className="rounded-lg group-hover:opacity-75 transition duration-300"
                            />
                            
                            <div className="mt-2 text-sm text-white">
                                <h2 className="font-semibold truncate">{movie.title}</h2>
                                <p className="text-xs text-gray-400">
                                    ⭐ {movie.vote_average.toFixed(1)} / 10
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
       
    );




}