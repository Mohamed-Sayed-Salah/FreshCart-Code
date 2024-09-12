import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private _httpClient: HttpClient) { }

  sendPasswordResetEmail(data: object): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/auth/forgotPasswords`, data);
  }
  verifyResetPasswordCode(data: object): Observable<any> {
    return this._httpClient.post(`${environment.baseUrl}/auth/verifyResetCode`, data);
  }
  resetPassword(data: object): Observable<any> {
    return this._httpClient.put(`${environment.baseUrl}/auth/resetPassword`, data);
  }

}
