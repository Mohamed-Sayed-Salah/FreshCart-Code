import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../core/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _httpClient: HttpClient) {

  }
  cashPayment(cartId: string, shippingAddress: any): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/orders/${cartId}`, { shippingAddress });
  }
  generateCheckout(cartId: string, shippingAddress: any): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/orders/checkout-session/${cartId}?url=http://localhost:4200`, { shippingAddress });
  }
  getOrders(userId: string): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/orders/user/${userId}`);
  }
}
