import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Provider } from '../class/provider';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getProviders(): Promise<any> {
    return this.http.get<any>(`${this.apiUrl}/providers`).toPromise();
  }

  setProvider(newProvider: Provider): Promise<Provider> {
    return this.http.post<Provider>(`${this.apiUrl}/providers`, newProvider).toPromise();
  }

  updateProvider(updateProvider: Provider): Promise<Provider> {
    return this.http.put<Provider>(`${this.apiUrl}/providers/${updateProvider.name}`, updateProvider).toPromise();
  }

  deleteProvider(name: string): Promise<string> {
    return this.http.delete<string>(`${this.apiUrl}/providers/${name}`).toPromise();
  }
}
