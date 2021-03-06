import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  readonly ROOT_URL;

  constructor(private http: HttpClient) { 
    this.ROOT_URL=environment.ROOT_URL+":"+environment.PORT;
   }

  get(uri: string) {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  post(uri: string, payload: Object) {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  patch(uri: string, payload: Object) {
    return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);
  }

  delete(uri: string) {
    return this.http.delete(`${this.ROOT_URL}/${uri}`);
  }

  login(username:string, password: string){
    return this.http.post(`${this.ROOT_URL}/users/login`,{
      username,
      password
    },{observe:'response'})
  }

  createuser(username: string, password: string) {
    return this.http.post(`${this.ROOT_URL}/users`, {
      username,
      password
    }, {
        observe: 'response'
      });
  }
}
