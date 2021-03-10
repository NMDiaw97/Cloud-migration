import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Rule } from '../class/rule';

@Injectable({
  providedIn: 'root'
})
export class RulesService {
  apiUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  getRules(): Promise<any> {
    return this.http.get<any>(`${this.apiUrl}/rulesappcloudready`).toPromise();
  }

  detailRule(ruleName: string): Promise<Rule> {
    return this.http.get<Rule>(`${this.apiUrl}/rulesappcloudready/${ruleName}`).toPromise();
  }

  setRule(data: Rule): Promise<Rule> {
    return this.http.post<Rule>(`${this.apiUrl}/ruleappcloudready`, data).toPromise();
  }

  updateRule(rule: any): Promise<any> {
    return this.http.put<any>(`${this.apiUrl}/ruleappcloudready/${rule.name}`, rule).toPromise();
  }

  deleteRule(ruleName: string): Promise<string> {
    return this.http.delete<string>(`${this.apiUrl}/ruleappcloudready/${ruleName}`).toPromise();
  }
}
