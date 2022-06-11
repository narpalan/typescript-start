import BaseService from "./BaseService";
import loadMovies from "../utils/loadMovies";
import { AxiosResponse } from "axios";

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

    
    async list(numberOfMovies = 0){
        let result: AxiosResponse<ResponseApiMovies, any>;
        if(numberOfMovies == 0){
            result = await this.getInstance().get<ResponseApiMovies>("/movies");
        }
        else{
            result = await this.getInstance().get<ResponseApiMovies>(`/movies?page=1&limit=${numberOfMovies}`);
        }
        
        const movies = result.data.data;
        return loadMovies(movies); 
    }
}

export default MovieService;