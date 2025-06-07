//Detalhes dos filmes
import { getMovieDetails, getRecomendedMovies } from "@/lib/api";
import GeneroButton from "@/components/GeneroButton";
import Image from "next/image";
import Link from "next/link";


export async function generateMetadata({ params }) {
    const movie = await getMovieDetails(params.id);
    return {
        title: `${movie.title} | Detalhes`,
        description: movie.overwiew,
        icons: {
            icon: '/filmflow-ico.svg',
        }
    };
};

export default async function MovieDetails({ params }) {
    const movie = await getMovieDetails(params.id);
    const { results: recomendados } = await getRecomendedMovies(params.id);

    if (!movie) {
        return <p>Detalhes do filme não encontrado.</p>
    };

    const backgroundUrl = `https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`


    return (
        
         <div className="relative">
            <div className="fixed z-10 inset-0 bg-cover bg-center blur-md scale-105"
            style={{ backgroundImage: `url(${backgroundUrl})` }} />
            <div className="fixed z-10 inset-0 bg-black opacity-70" />


            <main className="relative z-10 p-6 max-w-6xl mx-auto text-black">
                
                <div className="flex flex-col gap-10 mt-12">
                    {movie.poster_path ? (
                        <Image 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title || 'Cartaz do filme'}
                        width={300}
                        height={450}
                        className="rounded-lg"
                    />
                    ) : (
                        <div className="w-[300px] h-[450px] bg-gray-800 rounded-lg flex items-center justify-center text-white">Sem imagem</div>
                    )}

                    <div>
                        <h1 className="text-4xl font-bold mb-2 text-white">
                            {movie.title}
                        </h1>
                        <p className="text-xl text-gray-400 mb-4">
                            {movie.release_date}
                        </p>
                        <p className="mb-4 text-white">{movie.overview}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <strong className="w-full text-white">Gêneros:</strong>
                            {movie.genres.map((g) => (
                                <GeneroButton key={g.id} genero={g} tipo="movie"/>
                            ))}
                        </div>

                        <p className="text-white"><strong>Nota: ⭐ </strong>
                            {typeof movie.vote_average === 'number' ? `${movie.vote_average.toFixed(1)} / 10` : 'Sem nota'}
                        </p>
                    </div>

                       {/*Recomendados */}
                    <section className="mt-10">
                        <h2 className="text-2xl font-bold mb-4 mt-4 text-white">Filmes recomendados</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                            {recomendados.slice(0, 6).map((rec) => (
                                <Link key={rec.id} href={`/movies/${rec.id}`}>
                                    <div className="hover:scale-105 transition relative">
                                        <Image 
                                            src={`https://image.tmdb.org/t/p/w300${rec.poster_path}`}
                                            alt={rec.title}
                                            width={200}
                                            height={300}
                                            className="rounded-lg"
                                        />  
                                        <p className="text-sm font-semibold text-center mt-1 text-white">{rec.title}</p>  

                                         <p className="absolute top-2 md:top-2 right-0 text-xs text-white bg-black/70 px-2 py-1 shadow-md rounded-lg">
                                         ⭐ {movie.vote_average.toFixed(1)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
        
                   


                </div>

                
              
            </main>
        </div>    
        
    );
}