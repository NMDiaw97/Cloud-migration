import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PasswordResetService {

  apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  sendEmail(email: string): Promise<any> {
    return this.http.post<any>(`${this.apiUrl}/send-reset-token`, JSON.stringify({email})).toPromise();
  }

  resetPassword(password: string, token: string | null | undefined): Promise<any> {
    return this.http.post<any>(`${this.apiUrl}/reset-password/${token}`, JSON.stringify({password})).toPromise();
  }
}
