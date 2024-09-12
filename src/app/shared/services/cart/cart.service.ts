import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../core/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  numberOfCartItems: BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(private readonly _httpClient: HttpClient) { }

  addProductToCart(productId: string): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/cart`,
      { productId },
    );
  }
  getCartInfo(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/cart`);
  }
  delete(): Observable<any> {
    return this._httpClient.delete(`${environment.baseUrl}/cart`);
  }
  deleteSpecificItem(id: string): Observable<any> {
    return this._httpClient.delete(`${environment.baseUrl}/cart/${id}`);
  }
  updateProductQuantity(id: string, count: string): Observable<any> {
    return this._httpClient.put(`${environment.baseUrl}/cart/${id}`, { count });
  }
}
