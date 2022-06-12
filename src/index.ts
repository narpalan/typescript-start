import inquirer from "inquirer";

import Movie from "./interfaces/movie";
import User, { getProfiles } from "./interfaces/user";
import MovieService from "./services/MovieService";
import addMovie from "./utils/addMovie";
import calcMoviesAverage from "./utils/calculateMoviesAverage";
import login from "./utils/login";
import removeMovieWithoutRatings from "./utils/removeMovieWithoutRatings";



const listOfMovies: Movie[] = [];

const questions = [{
    type:"number",
    name: "option",
    message: "Digite uma opção: \n 1 - Adicionar filme à minha lista \n 2 - Avaliar filme por ID \n 3 - Listar filmes avaliados \n 4 - Listar média de avaliações \n 5 - Listar filmes baixados \n 6 - Minha lista \n 7 - Trocar perfil \n 8 - Sair \n"
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

const chooseProfile = [{
    type: "number",
    name: "option",
    message: "Selecione um perfil para continuar..."
}]

const addMovieOptions = [{
    type: "number",
    name: "option",
    message: "Selecione um filme adiciona-lo à sua lista..."
}]


const possibleAnswers ={    
    ADD_MOVIE_TO_MYLIST: 1,
    RATE_MOVIE: 2,    
    RATED_MOVIES:3,
    RATED_AVERAGE_MOVIES: 4,
    LIST_DOWLOADED_MOVIES: 5,
    MY_LIST: 6,
    CHANGE_PROFILE: 7,    
    EXIT:8
}

async function start(){
    getProfiles().map(profile => console.log(`${profile.id} - nome: ${profile.name}`));
    const choosenProfile =  await inquirer.prompt(chooseProfile);    
    
    if((choosenProfile.option >= 0) && (choosenProfile.option <= 3)){
        const user: User = login(choosenProfile.option);
        console.log(`Logado como: ${user.name}`);
        run(user);
    } 
    else{
        start();
    }
}

async function run(user: User){   
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

        case possibleAnswers.ADD_MOVIE_TO_MYLIST:
            listOfMovies.map(movie => console.log(`${movie.id} - nome: ${movie.name}`));
            const moviesToAddMyList = await inquirer.prompt(addMovieOptions);
            user = addMovie(user, listOfMovies, moviesToAddMyList.option);
            console.log('Filme adicionado com sucesso!');
            run(user);


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
            run(user);
        break;       

        //Listar filmes avaliados
        case possibleAnswers.RATED_MOVIES:
            let ratedMovies = removeMovieWithoutRatings(listOfMovies);
            if (ratedMovies.length == 0){
                console.log('Por enquanto, nenhum filme foi avaliado.');
            }
            else{
                ratedMovies.map(movie => console.log(`${movie.id} - Nome: ${movie.name} Avaliações: ${movie.ratings}`));
            }
            run(user);
        break;
        
        //Listar média de avaliações
        case possibleAnswers.RATED_AVERAGE_MOVIES:
            let ratedAverageMovies = calcMoviesAverage(listOfMovies);
            if(ratedAverageMovies.length == 0){
                console.log('Por enquanto, não há nenhum filme com uma média de avaliações.');
            }
            else{
                ratedAverageMovies.map(movie => console.log(`${movie.id} - Nome: ${movie.name} Média de avaliações: ${movie.average}`));
            }
            run(user);
        break;

        //Listar filmes baixados      
        case possibleAnswers.LIST_DOWLOADED_MOVIES:            
            listOfMovies.map(movie => console.log(`${movie.id} - nome: ${movie.name}`));
            run(user);
        break;
        //Consultar minha lista
        case possibleAnswers.MY_LIST:
            console.log(user.myList);
            run(user);
        break;
        //Trocar de perfil (usuário)
        case possibleAnswers.CHANGE_PROFILE:
            start();
        break;       
        
        //Sair
        case possibleAnswers.EXIT:           
        break;
        
        default:
            run(user);
        break;
    }
}

start();











