import { CanActivateFn, Router } from '@angular/router';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const authGuard: CanActivateFn = (route, state) => {
  let platForm: object = inject(PLATFORM_ID);
  let router: Router = inject(Router);
  if (isPlatformBrowser(platForm)) {
    if (localStorage.getItem('token')) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  } else {
    return false;
  }
};
