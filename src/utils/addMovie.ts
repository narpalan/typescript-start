import Movie from "../interfaces/movie";
import User from "../interfaces/user";

function addMovie(user:User, movies:Movie[], ...ids:number[]):User{
    const newList: Movie[] = [];   
        
    movies.forEach(movie=>{
        
        const isMovieInList = ids.includes(movie.id);
        
        if(isMovieInList){
            newList.push(movie);
        }      
    })
    
    return {
        ...user,
        myList:[
            ...user.myList,
            ...newList
        ]
    }
}

export default addMovie;