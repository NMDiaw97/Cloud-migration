import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from './models/user.model'
import { Observable,throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = " http://localhost:8085";

  constructor(private http: HttpClient) { }

  registerUser(user: User):Observable<object>{
    return this.http.post<any>(`${this.apiUrl}/register`,user)

  }
  loginUser(user:User):Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/login`,user)
    .pipe(catchError(this.errorHandler))

  }

  errorHandler(error:HttpErrorResponse){
    return throwError(error);
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }
}
