//Configurações de requisição (fetch da TMDB)

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export async function getPopularMovies() {
    try {
        const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`);
        const data = await res.json();
        return data.results;
    
    } catch (error) {
        console.error('Erro ao buscar filmes populares:', error);
        return [];
    }

}


export async function getMovieDetails(id) {
    const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=pt-BR`);
    const data = await res.json();
    return data;
}

export async function searchMovies(query) {
    const res = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&language=pt-BR&query=${encodeURIComponent(query)}`);
    const data = await res.json();
    return data.results;
}

export async function getRecomendedMovies(id) {
    try {
        const res = await fetch(`${BASE_URL}/movie/${id}/recommendations?api_key=${API_KEY}&language=pt-BR`, { cache: 'no-store' })
        const data = await res.json()
        return data;

    } catch (error) {
        console.error('Erro ao buscar recomendações.', error)
        return { results: [] };
    };
}

//LISTAGEM DE FILMES NA PAGINA DE FILMES COM PAGINAÇÃO
export async function getMoviesByPage(page = 1) {
    try {
        const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`, { cache: 'no-store' });

        const data = await res.json();
        return data.results;

    }  catch (error) {
        console.error('Erro ao buscar filmes por página:', error);
        return [];
    }
}


//BUSCAR FILMES POR GENERO
export async function getMoviesByGenre(genreId, page = 1) {
    try {
        const res = await fetch(
            `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=pt-BR&with_genres=${genreId}&page=${page}`,
            { cache: 'no-store' }
        );
        const data = await res.json();
        return data.results || [];

    } catch (error) {
        console.error('Erro ao buscar filmes por gênero:', error)
        return [];
    }
}





//TOP FILMES

export async function getTopRatedMovies() {
    try {
        const res = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=pt-BR&page=1`, { cache: 'no-store' });
        const data = await res.json();
        return data.results || [];
        
    } catch (error) {
        console.error('Erro ao buscar filmes com melhores notas.', error);
        return [];
    }
}







//SÉRIES
export async function getPopularSeries() {
    try {
        const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=pt-BR`);
        const data = await res.json();
        return data.results;

    } catch (error) {
        console.error('Erro ao buscar séries populares', error);
        return [];
    }
}


//FUNÇÃO PARA CHAMAR DETALHES DAS SÉRIES
export async function getSeriesDetails(id) {
    try {
        const res = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=pt-BR`, {cache: 'no-store'});
        const data = await res.json();
        return data;
        
    } catch (error) {
        console.error('Erro ao buscar detalhes da série:', error);
        return null
    }
}


//FUNÇÃO PARA DE SERIES RECOMENDADAS NA PAGINA DE DETALHES DAS SÉRIES
export async function getRocomended(id) {
    try {
        const res = await fetch(`${BASE_URL}/tv/${id}/recommendations?api_key=${API_KEY}&language=pt-BR`, { cache: 'no-store' })
        const data = await res.json()
        return data;

    } catch (error) {
        console.error('Erro ao buscar recomendações.', error)
        return { results: [] };
    };
}


//FUNÇÃO PARA BUSCAR TODAS AS SÉRIES PARA A PÁGINA DE SÉRIES com paginação
export async function getSeriesByPage(page = 1) {
    try {
        const res = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`, { cache: 'no-store' });

        const data = await res.json();
        return data.results;

    }  catch (error) {
        console.error('Erro ao buscar séries por página:', error);
        return [];
    }
}