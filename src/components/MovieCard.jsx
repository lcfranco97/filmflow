import Link from "next/link";
import Image from "next/image";


export default function MovieCard({ movie }) {
    return (
        <Link href={`/movies/${movie.id}`}>
            <div className="cursor-pointer hover:scale-105 transition-transform duration-200">
                <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    width={300}
                    height={450}
                    priority
                    style={{ height: 'auto', width: 'auto' }}
                    className="rounded w-full h-auto"
                />
                <h2 className="text-sm mt-2 text-center">{movie.title}</h2>    
            </div>
        </Link>
    );
}