import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Register, SignIn } from '../../interfaces/auth';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  userData: BehaviorSubject<any> = new BehaviorSubject(null);

  constructor(private _router: Router, private _httpClient: HttpClient, @Inject(PLATFORM_ID) private platform: object) {
    if (isPlatformBrowser(this.platform)) {
      if (localStorage.getItem('token')) {
        this.saveUserData();
      }
    }
  }
  signUp(data: Register): Observable<any> {
    return this._httpClient.post(
      `${environment.baseUrl}/auth/signup`,
      data
    );
  }
  signIn(data: SignIn): Observable<any> {
    return this._httpClient.post(
      `${environment.baseUrl}/auth/signin`,
      data
    );
  }
  saveUserData() {
    let data = jwtDecode(JSON.stringify(localStorage.getItem('token')));
    this.userData.next(data);
  }
  signOut() {
    localStorage.removeItem('token');
    this.userData.next(null);
    this._router.navigate(['/login']);
  }
}
