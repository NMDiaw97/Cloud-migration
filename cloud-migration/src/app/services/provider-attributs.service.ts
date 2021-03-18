import { HttpClient } from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProviderAttribut } from '../class/provider-attribut';

@Injectable({
  providedIn: 'root'
})
export class ProviderAttributsService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getAttributes(): Promise<any> {
    return this.http.get<any>(`${this.apiUrl}/providers/criteria`).toPromise();
  }

  setAttribut(newAttribut: ProviderAttribut): Promise<ProviderAttribut> {
  return this.http.post<ProviderAttribut>(`${this.apiUrl}/providers/criteria`, newAttribut).toPromise();
  }

  updateAttribut(updateAttribut: ProviderAttribut): Promise<ProviderAttribut> {
    return this.http.put<ProviderAttribut>(`${this.apiUrl}/providers/criteria/${updateAttribut.name}`, updateAttribut).toPromise();
  }

  deleteAttribut(name: string): Promise<string> {
    return this.http.delete<string>(`${this.apiUrl}/providers/criteria/${name}`).toPromise();
  }
}
