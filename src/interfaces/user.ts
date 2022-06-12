import Movie from "./movie";

interface User{
    id: number;
    name: string;
    age: number;
    myList: Movie[]
}



const testUsers: User[]=[
    {  
        id: 0,
        name: 'Anonimo',
        age: 120,
        myList:[]
    },
    {
        id: 1,
        name: "Thiago Fumega", 
        age: 29, 
        myList:[]
    },
    {
        id: 2,
        name:"Bruno Benicio",
        age: 27,
        myList:[]
    },
    {   
        id: 3,
        name:"Seu Zé",
        age: 79,
        myList:[]
    }
]

export function getProfiles(){
    return testUsers.map(user=>({id:user.id,name:user.name, age:user.age, myList:user.myList}))
}

export default User;