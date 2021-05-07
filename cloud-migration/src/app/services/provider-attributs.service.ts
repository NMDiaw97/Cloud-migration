import { HttpClient } from '@angular/common/http';
import { Attribute, Injectable } from '@angular/core';
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

  setAttribut(attribut: ProviderAttribut): Promise<any> {
    return this.http.post<Attribute>(`${this.apiUrl}/providers/criteria`, attribut).toPromise();
  }

  updateAttribut(attribut: ProviderAttribut): Promise<any> {
    return this.http.put<ProviderAttribut>(`${this.apiUrl}/providers/criteria/${attribut.name}`, attribut).toPromise();
  }

  deleteAttribut(name: string): Promise<any> {
    return this.http.delete<string>(`${this.apiUrl}/provider/criteria/${name}`).toPromise();
  }

}
