import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login( User: { email: any; password:any; }){
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, User)
    .pipe(
      tap(this.setToken)
    )
  }

  private setToken(response: any){
    if (typeof localStorage !== 'undefined') {
      if (response) {
        const expData = new Date(new Date().getTime() + +response.expiresIn * 1000)
        localStorage.setItem('fb-token-exp', expData.toString())
        localStorage.setItem('fb-token', response.idToken)
      } else {
        localStorage.clear()
      }
    }
  }
  get Token(){
    if (typeof localStorage !== 'undefined') {
      const expDate = new Date(localStorage.getItem('fb-token-exp') as string)
      if (new Date > expDate) {
        this.logout();
        return null;
      }
      return localStorage.getItem('fb-token') as any
    }
    return null;
  }

  logout(){
    this.setToken(null);
  }

  isAuthenicated(){
    return !!this.Token;
  }
}
