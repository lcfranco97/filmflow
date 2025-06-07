import HeroCarousel from "@/components/HeroCarousel";
import MovieCarousel from "@/components/MovieCarousel";
import SeriesCarousel from "@/components/SeriesCarousel";
import { getPopularMovies } from "@/lib/api";
import { getPopularSeries } from "@/lib/api";
import Header from "@/components/Header";
import TopRatedCarousel from "@/components/TopFilmesCarousel";

export default async function Home() {
  const movies = await getPopularMovies();
  const shows = await getPopularSeries();
  
  return (
        <div className="w-full h-full">

          <Header />

        
        <main className="bg-black">
          <HeroCarousel movies={movies.slice(0, 5)} />
          <div className="p-4">
                
              <div className="mb-26 mt-4">
                  <h1 className="text-3xl text-white font-bold mb-6 font-[family-name:var(--font-geist-sans)]">
                  Filmes em cartaz
                  </h1>
                <MovieCarousel movies={movies} />
              </div>


              <div className="mb-26 mt-4">
                  <h1 className="text-3xl text-white font-bold mb-6 font-[family-name:var(--font-geist-sans)]">
                  Melhores filmes
                  </h1>
                <TopRatedCarousel movies={movies} />
              </div>


              <div className="mb-20">
                <h1 className="text-3xl text-white font-bold mb-4 font-[family-name:var(--font-geist-sans)]">
                Séries populares
              </h1>
              <SeriesCarousel shows={shows} />
              </div>


          </div>
        </main>

        </div>


  );
}
