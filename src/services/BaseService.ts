import axios, { AxiosInstance } from "axios";


class BaseService{
    private axiosInstance:AxiosInstance;
    private baseApiUrl =  "https://mcuapi.herokuapp.com/api/v1";

    constructor(){
        this.axiosInstance = axios.create({
            baseURL: this.baseApiUrl
        });
    }

    getInstance(){
        return this.axiosInstance;
    }

}

export default BaseService;