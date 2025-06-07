'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import 'swiper/css';

export default function HeroCarousel({ movies }) {
    return (
        <div className="relative w-full h-[85vh]">
            <Swiper
                modules={[Autoplay]}
                autoplay={{ delay: 5000 }}
                loop
                slidesPerView={1}
                className="w-full h-full"
            >

                {movies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                        <div className="relative w-full h-full">
                            <Image
                                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                                alt={movie.title}
                                fill
                                className="object-cover"
                            />
                            {/*Gradiente escuro */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />  

                             {/*Conteudo sobreposto */}
                             <div className="absolute bottom-10 left-10 text-white max-w-[70%] z-10">
                                <h2 className="text-4xl font-bold mb-2">{movie.title}</h2>
                                <p className="text-md mb-4 line-clamp-3">{movie.overview}</p>
                                <Link href={`/movies/${movie.id}`}
                                    className="px-5 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                                >
                                    Ver detalhes
                                </Link>    
                             </div>

                        </div>
                    </SwiperSlide>
                        
                ))}

            </Swiper>    
        </div>
    );
}