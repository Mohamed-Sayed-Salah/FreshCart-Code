import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../core/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _httpClient: HttpClient) { }
  getWishlist(): Observable<any> {
    return this._httpClient.get(`${environment.baseUrl}/wishlist`);
  }
  addProductToWishlist(productId: string): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/wishlist`, { productId });
  }
  deleteProductFromWishlist(productId: string): Observable<any> {
    return this._httpClient.delete(`${environment.baseUrl}/wishlist/${productId}`);
  }
}
