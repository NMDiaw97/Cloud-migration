import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pricing } from '../class/pricing';
import {environment} from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PricingStoreService {

apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getPricing(): Promise<any> {
    return this.http.get<any>(`${this.apiUrl}/providers/pricing`).toPromise();
  }

  setPricing(pricing: Pricing): Promise<any> {
    return this.http.post<Pricing>(`${this.apiUrl}/providers/pricing`, pricing).toPromise();
  }

  detailPricing(provider: string, category: string): Promise<Pricing> {
    return this.http.get<Pricing>(`${this.apiUrl}/providers/pricing/${provider}/${category}`).toPromise();
  }

  deletePricing(provider: string, category: string): Promise<Pricing> {
    return this.http.delete<Pricing>(`${this.apiUrl}/providers/pricing/${provider}/${category}`).toPromise();
  }

  updatePricing(pricing: Pricing): Promise<Pricing> {
    return this.http.get<Pricing>(`${this.apiUrl}/providers/pricing/${pricing.provider}/${pricing.category}`).toPromise();
  }
}
