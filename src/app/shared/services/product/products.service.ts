import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../core/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _httpClient: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/products`);
  }
  getProduct(id: string): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/products/${id}`);
  }
}
