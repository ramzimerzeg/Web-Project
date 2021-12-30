import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, shareReplay, tap, throwError } from 'rxjs';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private webService : WebRequestService, private router : Router, private http: HttpClient) { }

  acesstoken : string ="";
  refreshtoken : string ="";
  userid: string ="";
  Newrefreshtoken : string ="";
  NewAccessToken: string ="";

  createUseracesstoken : string ="";
  createUserrefreshtoken : string ="";
  
  login(username:string,password:string){
    return this.webService.login(username,password).pipe(
      shareReplay(),
      tap((res:HttpResponse<any>)=>{
        //auth tokens will be in the header of this response 
        const acesstoken = res.headers.get('x-access-token');
        if(acesstoken != null){
          this.acesstoken = acesstoken;
        }
        const refreshtoken = res.headers.get('x-refresh-token');
        if(refreshtoken != null){
          this.refreshtoken = refreshtoken;
        }
        this.setSession(res.body._id, this.acesstoken, this.refreshtoken);
        console.log("LOGGED IN!");
      }),
      catchError( (error: HttpErrorResponse) => {
        alert("Nom d'utilisateur ou mot de passe incorrect");
        return throwError(error);
      })
    )
  }

  createuser(username: string, password: string) {
    return this.webService.createuser(username, password).pipe(
      shareReplay(),
      tap((res: HttpResponse<any>) => {
        // the auth tokens will be in the header of this response

        // const acesstoken = res.headers.get('x-access-token');
        // if(acesstoken != null){
        //   this.createUseracesstoken = acesstoken;
        // }
        // const refreshtoken = res.headers.get('x-refresh-token');
        // if(refreshtoken != null){
        //   this.createUserrefreshtoken = refreshtoken;
        // }

        // this.setSession(res.body._id, this.createUseracesstoken, this.createUserrefreshtoken);
        //console.log("Successfully signed up and now logged in!");
        console.log("user Successfully created!");
      })
    )
  }

  updateUser(UserId:string, username: string, password: string){
    //send web request to update user
    return this.webService.patch(`users/${UserId}`,{username,password});
  }

  deletUser(UserId:string){
    //send web request to delete user
    return this.webService.delete(`users/${UserId}`);
  }

  logout() {
    this.removeSession();

    this.router.navigate(['/login']);
  }

  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }

  getUserId() {
    return localStorage.getItem('user-id');
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken)
  }

  private setSession(userId: string, accessToken: string, refreshToken: string) {
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  private removeSession() {
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  getNewAccessToken() {
    const userid = this.getUserId();
        if(userid != null){
          this.userid = userid;
        }
        const refreshtoken = this.getRefreshToken();
        if(refreshtoken != null){
          this.Newrefreshtoken = refreshtoken;
        }
    return this.http.get(`${this.webService.ROOT_URL}/users/me/access-token`, {
      headers: {
        'x-refresh-token': this.Newrefreshtoken,
        '_id': this.userid
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        const NewAccessToken = res.headers.get('x-access-token');
        if(NewAccessToken != null){
          this.NewAccessToken = NewAccessToken;
        } 
        this.setAccessToken(this.NewAccessToken);
      })
    )
  }

}
