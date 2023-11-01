import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { User } from "../models/user";
import { Observable, catchError, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthService
{
  endpoint: string = 'http://localhost:4000/api'
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  currentUser = {}

  constructor(
    private readonly http: HttpClient,
    public router: Router
  ) {}

  // inscription
  signup(user: User) {
    let api = `${this.endpoint}/register-user`
    return this.http.post(api, user).pipe(catchError(this.handleError))
  }

  // connexion
  signin(user: User) {
    return this.http
          .post<any>(`${this.endpoint}/signin`, user)
          .subscribe(
            (res: any) => {
              localStorage.setItem('access_token', res.token)
              localStorage.setItem('sub', res._id)
              this.currentUser = this.getUserProfile(res._id)
              this.router.navigate(['/profile/' + res._id])
          })
  }


  getToken() {
    return localStorage.getItem('access_token')
  }

  get isLoggedIn(): boolean {
    let authToken = this.getToken()
    return authToken !== null
  }

  doLogout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('sub')
    this.router.navigate(['/home'])
  }


  // Récupère le profile utilisateur
  getUserProfile(id: any) {
    let api = `${this.endpoint}/user-profile/${id}`
    return this.http.get(api, {headers: this.headers})
  }



  handleError(error: HttpErrorResponse) {
    let msg: string
    if(error.error instanceof ErrorEvent){
      msg = error.error.message
    } else {
      msg = `Error code: ${error.status}\nMessage: ${error.message}`
    }
    return throwError(() => new Error(msg))
  }
}
