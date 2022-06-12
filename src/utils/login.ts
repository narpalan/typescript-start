import User from "../interfaces/user";
import { testUsers } from "../interfaces/user";

function login(id: number):User{    
    return getUserDetail(id);
}

function getUserDetail(id: number){        
    for(let i = 0; i < testUsers.length; i++){
        if(testUsers[i].id == id){
            return testUsers[i];            
        }                
    }
    return testUsers[0];    
}

export default login;