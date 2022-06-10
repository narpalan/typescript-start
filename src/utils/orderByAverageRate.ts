import calcMoviesAverage from "./calculateMoviesAverage";
import Movie from "../interfaces/movie";

function orderByAverageRate(movies:Movie[]){
    const moviesWithAverage = calcMoviesAverage(movies);

    const moviesOrdered = moviesWithAverage.sort((a,b)=>{
        if(a.average > b.average){
            return 1
        }
        if(a.average < b.average){
            return -1
        }
        return 0;
    })
    return moviesOrdered;    
}

export default orderByAverageRate;