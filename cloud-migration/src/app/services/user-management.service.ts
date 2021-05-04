import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Promise<any> {
    return this.http.get<any>(`${this.apiUrl}/users`).toPromise();
  }

  deleteUser(name: string): Promise<string> {
    return this.http.delete<string>(`${this.apiUrl}/users/${name}`).toPromise();
  }
}
