import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { SignIn } from '../../interfaces/auth';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z0-9]{3,10}$/),
      ]),
    },
  );
  apiErrorMSG: string = '';
  callingAPI: boolean = false;
  router = inject(Router);
  apiSubscription: Subscription = new Subscription();
  constructor(private _authService: AuthService,
    @Inject(PLATFORM_ID) private platform: object
  ) { }


  signIn() {
    if (this.loginForm.valid) {
      this.apiErrorMSG = '';
      this.callingAPI = true;

      // Call API
      let loginData: SignIn = this.loginForm.value as SignIn;
      this.apiSubscription = this._authService.signIn(loginData).subscribe({
        next: (res) => {
          this.callingAPI = false;
          if (isPlatformBrowser(this.platform)) {
            localStorage.setItem('token', res.token);
            this._authService.saveUserData();
            this.router.navigate(['/home']);
          }

        },
        error: (err) => {
          this.callingAPI = false;
          this.apiErrorMSG = err.error.message;
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    this.apiSubscription.unsubscribe();
  }
}
