import User, {testUsers} from "./user";

interface protoUser extends Partial<User>{
    id: number;
}

export function getProfiles(){
    return testUsers.map(user=>({id:user.id,name:user.name}))
}




export default protoUser;