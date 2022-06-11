import inquirer from "inquirer";
import Movie from "./interfaces/movie";
import User from "./interfaces/user";
import MovieService from "./services/MovieService";
import calcMoviesAverage from "./utils/calculateMoviesAverage";
import removeMovieWithoutRatings from "./utils/removeMovieWithoutRatings";

const user: User[]=[
    {
        name: "Thiago Fumega", 
        age: 29, 
        myList:[]
    },
    {
        name:"Bruno Benicio",
        age: 27,
        myList:[]
    },
    {
        name:"Seu Zé",
        age: 79,
        myList:[]
    }
]

const listOfMovies: Movie[] = [];

const questions = [{
    type:"number",
    name: "option",
    message: "Digite uma opção: \n 1 - Avaliar filme por ID \n 2 - Listar filmes avaliados \n 3 - Listar média de avaliações \n 4 - Listar filmes baixados \n 5 - Sair \n"
}]

const chooseMovieQuestions = [{
    type:"number",
    name:"option",
    message:"Qual filme?"
}]

const rateQuestions = [{
    type:"number",
    name:"option",
    message:"Qual a avaliação de 0 a 5?"
}]


const possibleAnswers ={
    RATE_MOVIE: 1,
    RATED_MOVIES:2,
    RATED_AVERAGE_MOVIES: 3,
    LIST_DOWLOADED_MOVIES: 4,
    EXIT:5
}

async function run(){   
    const movieService =  new MovieService();
    if(listOfMovies.length == 0){
        try{
                //Baixando 5 primeiros filmes da api fornecida
                let movies = await movieService.list(5);
                movies.forEach(movie=>{    
                //Pesquisando duplicatas e pulando essa iteração, caso encontrada.
                if(listOfMovies.find(needle => needle.id == movie.id)){
                    return
                }
                //Filme não encontrado na lista de filmes baixados, então é inserido na lista
                else{
                    listOfMovies.push(movie);
                }                
            })
        }
        catch(e){
            console.log("Problema ao baixar a lista de filmes.");    
        }        
    }         
    
    const answers = await inquirer.prompt(questions);
    switch(answers.option){   
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
        case possibleAnswers.RATED_AVERAGE_MOVIES:
            let ratedAverageMovies = calcMoviesAverage(listOfMovies);
            if(ratedAverageMovies.length == 0){
                console.log('Por enquanto, não há nenhum filme com uma média de avaliações.');
            }
            else{
                console.log(ratedAverageMovies);
            }
            run();
        break;

        //Listar filmes baixados      
        case possibleAnswers.LIST_DOWLOADED_MOVIES:            
            listOfMovies.map(movie => console.log(`${movie.id} - nome: ${movie.name}`));
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











