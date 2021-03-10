import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../class/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  registerUser(user: User): Promise<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user).toPromise();
  }

  loginUser(user: User): Promise<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, user).toPromise();
  }

  loggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
