import Movie from "../interfaces/movie";

function removeMovieWithoutRatings(movies: Movie[]){
    return movies.filter(movie=> movie.ratings.length !==0)
}

export default removeMovieWithoutRatings;