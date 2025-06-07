//Detalhes das séries
import { getSeriesDetails, getRocomended } from "@/lib/api";
import GeneroButton from "@/components/GeneroButton";
import Image from "next/image";
import Link from "next/link";


export async function generateMetadata({ params }) {
    const show = await getSeriesDetails(params.id);
    return {
        title: `${show.name} | Detalhes`,
        description: show.overwiew,
        icons: {
            icon: '/filmflow-ico.svg',
        }
    };
};

export default async function TVShowPage({ params }) {
    const show  = await getSeriesDetails(params.id)
    const { results: recomendados } = await getRocomended(params.id);

    if (!show) {
        return <p>Detalhes da série não encontrados.</p>
    };

    const backgroundUrl = `https://image.tmdb.org/t/p/original${show.backdrop_path || show.poster_path}`

    return (
        <div className="relative">
            <div className="fixed z-10 inset-0 bg-cover bg-center blur-md scale-105"
            style={{ backgroundImage: `url(${backgroundUrl})` }} />
            <div className="fixed z-10 inset-0 bg-black opacity-70 " />


            <main className="relative z-10 p-6 max-w-6xl mx-auto text-black">
                
                <div className="flex flex-col gap-10 mt-12">
                    {show.poster_path ? (
                        <Image 
                        src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                        alt={show.name || 'Capa da série'}
                        width={300}
                        height={450}
                        className="rounded-lg"
                    />
                    ) : (
                        <div className="w-[300px] h-[450px] bg-gray-800 rounded-lg flex items-center justify-center text-white">Sem imagem</div>
                    )}

                    <div>
                        <h1 className="text-4xl font-bold mb-2 text-white">
                            {show.name}
                        </h1>
                        <p className="text-xl text-gray-400 mb-4">
                            {show.first_air_date}
                        </p>
                        <p className="mb-4 text-white">{show.overview}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <strong className="w-full text-white">Gêneros:</strong>
                            {show.genres.map((g) => (
                                <GeneroButton key={g.id} genero={g} tipo="tv"/>
                            ))}
                        </div>

                        <p className="text-white"><strong>Nota: ⭐ </strong>
                            {typeof show.vote_average === 'number' ? `${show.vote_average.toFixed(1)} / 10` : 'Sem nota'}
                        </p>
                    </div>

                       {/*Recomendados */}
                    <section className="mt-10">
                        <h2 className="text-2xl font-bold mb-4 mt-4 text-white">Séries recomendadas</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                            {recomendados.slice(0, 6).map((rec) => (
                                <Link key={rec.id} href={`/tv/${rec.id}`}>
                                    <div className="hover:scale-105 transition relative">
                                        <Image 
                                            src={`https://image.tmdb.org/t/p/w300${rec.poster_path}`}
                                            alt={rec.name}
                                            width={200}
                                            height={300}
                                            className="rounded-lg"
                                        />  
                                        <p className="text-sm font-semibold text-center mt-1 text-white">{rec.name}</p>  

                                        <p className="absolute top-2 md:top-2 right-0 text-xs text-white bg-black/70 px-2 py-1 shadow-md rounded-lg">
                                         ⭐ {show.vote_average.toFixed(1)}
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