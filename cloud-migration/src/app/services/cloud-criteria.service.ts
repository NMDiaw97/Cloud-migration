import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CloudCriteria } from '../models/cloud-criteria.model';

@Injectable({
  providedIn: 'root'
})
export class CloudCriteriaService {

  private baseUrl = " http://localhost:8085"

  constructor(private http: HttpClient) { }

  //get all
  getCloudCriteriaList(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/providers`);


  }

  addCloudCriteria(cloudCriteria: CloudCriteria): Observable<object> {
    return this.http.post<any>(`${this.baseUrl}/providers`, cloudCriteria);
  }

  updatCloudCriteria() {

  }

  deleteCloudCriteria() {

  }
}
