import Movie from "../interfaces/movie";

interface MoviesFromApiDTO {
    id: number,
    title: string;
    directed_by: string;
    duration: number;
}

function loadMovies(moviesFromApi : MoviesFromApiDTO[]): Movie[]{

    return moviesFromApi.map((movie)=>({
        id: movie.id,
        name: movie.title,
        ratings:[],
        directedBy: movie.directed_by,
        duration: movie.duration        
    }))
}

export default loadMovies;