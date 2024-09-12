import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withHashLocation, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { headerInterceptor } from './core/interceptors/header/header.interceptor';
import { errorInterceptor } from './core/interceptors/error/error.interceptor';
import { loaderInterceptor } from './core/interceptors/loader/loader.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions(), withHashLocation()),
    provideAnimations(),
    provideToastr(),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor, errorInterceptor, loaderInterceptor])),
    importProvidersFrom(NgxSpinnerModule.forRoot()),
  ],
};
