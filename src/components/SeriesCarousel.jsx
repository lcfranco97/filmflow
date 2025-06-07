'use client';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

export default function SeriesCarousel({ shows }) {
    return (
        <motion.div>
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
            {shows.map((show) => (
                <SwiperSlide key={show.id}>
                    <motion.div className="group rounded overflow-hidden shadow-mg" whileHover={{
                        scale:  1.1,
                        transition: {
                            duration: .2
                        }
                    }}>
                        <Link href={`/tv/${show.id}`}>
                            <div className="relative rounded-lg overflow-hidden group">
                                <Image 
                                src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                                alt={show.name}
                                width={300}
                                height={450}
                                priority
                                className="w-full h-full object-cover rounded-lg group-hover:opacity-75 transition duration-300"
                            /> 
                            <p className="absolute top-2 md:top-7 right-2 text-xs text-white bg-black/70 px-2 py-1 shadow-md rounded-lg">
                                ⭐ {show.vote_average.toFixed(1)}
                            </p>

                            </div>   
                        </Link>

                    </motion.div>
                </SwiperSlide>
                    
            ))}

        </Swiper>





        </motion.div>
            
    );
}