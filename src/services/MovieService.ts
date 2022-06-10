import BaseService from "./BaseService";
import loadMovies from "../utils/loadMovies";

interface MoviesFromApiDTO{
    id:number;
    title:string;
    directed_by:string;
    duration:number;
}

interface ResponseApiMovies{
    data: MoviesFromApiDTO[]
}

class MovieService extends BaseService{
    constructor(){
        super()
    }

    async list5(){
        const result = await this.getInstance().get<ResponseApiMovies>("/movies?page=1&limit=5");
        const movies = result.data.data;
        return loadMovies(movies);        
    }
    async listAll(){
        const result = await this.getInstance().get<ResponseApiMovies>("/movies");
        const movies = result.data.data;
        return loadMovies(movies); 
    }
}

export default MovieService;