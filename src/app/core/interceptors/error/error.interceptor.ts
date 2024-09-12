import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, finalize, throwError } from 'rxjs';
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  let toaster = inject(ToastrService);
  return next(req).pipe(catchError((err) => {
    console.log(err)
    toaster.error('An Error Occurred', 'Error');
    return throwError(() => {
      return err;
    });
  }));
};
