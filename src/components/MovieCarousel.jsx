'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Link from 'next/link';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import { motion } from 'motion/react';

export default function MovieCarousel({ movies }) {
    return (
        <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={30}
            slidesPerView={3}
            breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 4 }
            }}
            
        >
            {movies.map(movie => (
                <SwiperSlide key={movie.id}>
                    <motion.div className="group rounded overflow-hidden shadow-mg" whileHover={{
                        scale: 1.1,
                        transition: {
                            duration: .2
                        }
                    }}>
                        <Link href={`/movies/${movie.id}`}>
                           <div className="relative rounded-lg overflow-hidden group">
                                 <Image
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                                width={300}
                                height={450}
                                priority
                                
                                className='w-full h-full object-cover rounded-lg group-hover:opacity-75 transition duration-300'
                            />  
                                <p className="absolute top-2 md:top-7 right-2 text-xs text-white bg-black/70 px-2 py-1 shadow-md rounded-lg">
                                ⭐ {movie.vote_average.toFixed(1)}
                                </p>
                           </div>


                        </Link>      
                    </motion.div>
                </SwiperSlide>
            ))}



        </Swiper>    
    );
};




