
import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let platform: object = inject(PLATFORM_ID);
  if (isPlatformBrowser(platform)) {
    if (req.url.includes('cart') || req.url.includes('orders') || req.url.includes('wishlist')) {
      req = req.clone({
        setHeaders: {
          token: localStorage.getItem('token') || '',
        }
      });
    }
  }
  return next(req);
};
