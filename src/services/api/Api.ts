import axios, { AxiosRequestConfig } from "axios"

import http from "./http-common.ts";


  
  interface ITutorialData {

  }

class Api{
    async get(method:string, params = {}){
        return http.get('checker/', {
            headers: { Authorization:'123', "Content-type": "application/json" },
            params:{ method, ...params }
        });
    }
    async post(method:string, params = {}){
        return http.post('checker/', params , {
            headers: { Authorization:'123', 'Content-Type': 'multipart/form-data' },
            
        });
    }
    
    async login(login: string, password: string) {
        return await this.get('login', { login, password });
    }

    async getRequests() {
        return await this.get('get-requests');
    }

    async getRequest(id:number) {
        return await this.get('get-request', {id});
    }

    async getNotifications() {
        return await this.get('get-notifications');
    }

    async getCountNewNotifications() {
        return await this.get('get-count-new-notifications');
    }

    async createRequest(param: any) {
        return await this.post('create-request', param);
    }

  
}

export default new Api()