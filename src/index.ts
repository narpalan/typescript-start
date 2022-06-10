import inquirer from "inquirer";
import Movie from "./interfaces/movie";
import User from "./interfaces/user";
import MovieService from "./services/MovieService";
import removeMovieWithoutRatings from "./utils/removeMovieWithoutRatings";

const user: User={
    name: "Thiago Fumega", 
    age: 29, 
    myList: []
}

const listOfMovies: Movie[] = [];

const questions = [{
    type:"input",
    name: "option",
    message: "Digite uma opção: \n 1 - Baixar todos os Filmes \n 2 - Baixar 5 primeiros filmes \n 3 - Dar avaliação \n 4 - Listar filmes avaliados \n 5 - Listar filmes baixados \n 6 - Sair \n"
}]

const chooseMovieQuestions = [{
    type:"input",
    name:"option",
    message:"Qual filme?"
}]

const rateQuestions = [{
    type:"input",
    name:"option",
    message:"Qual a avaliação de 0 a 5?"
}]


const possibleAnswers ={
    DOWNLOAD: '1',
    DOWNLOAD_5: '2',
    RATE_MOVIE: '3',
    RATED_MOVIES:'4',
    LIST_DOWLOADED_MOVIES: '5',
    EXIT:'6'

}

async function run(){
    
    const answers = await inquirer.prompt(questions);
    const movieService =  new MovieService();

    switch(answers.option){
        
        //Baixar todos os filmes
        case possibleAnswers.DOWNLOAD:
            let movies = await movieService.listAll();
            movies.forEach(movie=>{
                if(listOfMovies.find(needle => needle.id == movie.id)){
                    return
                }
                else{
                    listOfMovies.push(movie);
                }
                
            })
            console.log(listOfMovies);
            run();
        break;

        //Baixar 5 primeiros filmes
        case possibleAnswers.DOWNLOAD_5:
            let movies5 = await movieService.list5();
            movies5.forEach(movie=>{
                if(listOfMovies.find(needle => needle.id == movie.id)){
                    return
                }
                else{
                    listOfMovies.push(movie);
                }                
            })
            console.log(listOfMovies);
            run();
        break;

        //Avaliar filme por id
        case possibleAnswers.RATE_MOVIE:
            let movieId;
            let rate;
            const chooseMovieAnswers = await inquirer.prompt(chooseMovieQuestions);
            movieId = chooseMovieAnswers.option;
            const rateAnswers = await inquirer.prompt(rateQuestions);
            rate = rateAnswers.option;

            //Varre o array de filmes baixados (listOfMovies) até encontrar o id escolhido pelo usuário e insere sua avaliação
            for(let i = 0; i < listOfMovies.length; i++){
                if(listOfMovies[i].id == movieId){
                    listOfMovies[i].ratings.push(rate);
                    break;
                }
            }           
            run();
        break; 

        //Listar filmes avaliados
        case possibleAnswers.RATED_MOVIES:
            let ratedMovies = removeMovieWithoutRatings(listOfMovies);
            if (ratedMovies.length == 0){
                console.log('Por enquanto, nenhum filme foi avaliado.');
            }
            else{
                console.log(ratedMovies);
            }
            run();
        break; 

        //Listar filmes baixados      
        case possibleAnswers.LIST_DOWLOADED_MOVIES:
            if(listOfMovies.length > 0 ){
                console.log(listOfMovies);
            }
            else{
                console.log('Você precisa baixar a lista de filmes!')
            }
            
            run();
        break;
        //Sair
        case possibleAnswers.EXIT:
        break;
        default:
            run();
        break;
    }
}

run();











