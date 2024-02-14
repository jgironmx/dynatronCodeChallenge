import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiRequest, DeleteResult } from '../models/api-request';
import { Customer, CustomerResult } from '../models/customer.model';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = environment.baseApiUrl;
  private readonly customerApiUrl = this.baseUrl + 'api/Customers';
  constructor(private http: HttpClient) {}

  getAll(apiRequest?: ApiRequest) {
    return this.http.get<CustomerResult>(this.customerApiUrl, {
      params: { ...apiRequest },
    });
  }

  getById(id: number) {
    const result = this.http.get<Customer>(`${this.customerApiUrl}/${id}`);
    return result.pipe(tap((a) => (a.id = id)));
  }

  create(model: Customer) {
    return this.http.post<Customer>(this.customerApiUrl, model);
  }

  update(id: number, model: Customer) {
    return this.http.put<Customer>(`${this.customerApiUrl}/${id}`, model);
  }

  delete(id: number) {
    return this.http.delete<DeleteResult>(`${this.customerApiUrl}/${id}`);
  }
}
