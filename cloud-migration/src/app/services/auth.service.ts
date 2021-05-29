import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from '../models/user.model'
import { Observable,throwError } from 'rxjs';
import {catchError} from 'rxjs/operators';


import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: User): Promise<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user, {headers: {skip: 'true'}}).toPromise();
  }

  loginUser(user: User): Promise<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user, {headers: {skip: 'true'}}).toPromise();
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

logOut(): void{
  return localStorage.clear();
 }
}
