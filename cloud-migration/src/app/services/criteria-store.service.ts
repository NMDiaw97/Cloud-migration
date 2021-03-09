import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Criteria} from 'src/app/class/criteria';
@Injectable({
  providedIn: 'root'
})
export class CriteriaStoreService {

  apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient) { }

    getCriteria(): Promise<any> {
      return this.http.get<any>(`${this.apiUrl}/criteres`).toPromise();
    }

    detailCriteria(criteriaName: string): Promise<Criteria> {
      return this.http.get<Criteria>(`${this.apiUrl}/criteres/${criteriaName}`).toPromise();
    }

    setCriteria(newCriteria: Criteria): Promise<Criteria> {
      return this.http.post<Criteria>(`${this.apiUrl}/criteres`, newCriteria).toPromise();
    }

    updateCriteria(updatedCriteria: Criteria): Promise<Criteria> {
      return this.http.put<Criteria>(`${this.apiUrl}/criteres/${updatedCriteria.name}`, updatedCriteria).toPromise();
    }

    deleteCriteria(criteriaName: string): Promise<string> {
      return this.http.delete<string>(`${this.apiUrl}/criteres/${criteriaName}`).toPromise();
    }
}
