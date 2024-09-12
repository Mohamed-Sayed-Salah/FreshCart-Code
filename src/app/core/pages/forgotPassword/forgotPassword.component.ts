import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ForgotPasswordService } from '../../services/auth/forgot-password.service';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgerPassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgotPassword.component.html',
  styleUrl: './forgotPassword.component.css'
})
export class ForgerPasswordComponent implements OnDestroy {
  step: number = 1;
  callingAPI: boolean = false;
  apiErrorMSG: string = '';
  apiSubscription: Subscription = new Subscription();
  constructor(private _forgotPasswordService: ForgotPasswordService,
    private _authService: AuthService,
    private _router: Router) { }


  verifyEmailForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email])
  });
  verifyResetCodeForm = new FormGroup({
    resetCode: new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6}$/)])
  });
  resetNewPasswordForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.minLength(5)])
  });

  verifyEmailSubmit() {
    this.callingAPI = true;
    this._forgotPasswordService.sendPasswordResetEmail(this.verifyEmailForm.value).subscribe(
      {
        next: (res) => {
          this.apiErrorMSG = '';
          this.callingAPI = false;
          if (res.statusMsg === 'success') {

            this.step = 2;
          }
        },
        error: (err) => {
          this.callingAPI = false;
          this.apiErrorMSG = err.error.message;
        },
      }
    );
  }
  verifyResetCodeSubmit() {
    this.callingAPI = true;
    this.apiSubscription.add(this._forgotPasswordService.verifyResetPasswordCode(this.verifyResetCodeForm.value).subscribe(
      {
        next: (res) => {
          this.apiErrorMSG = '';
          this.callingAPI = false;
          if (res.statusMsg === 'Success') {
            this.step = 3;
          }
        },
        error: (err) => {
          this.callingAPI = false;
          this.apiErrorMSG = err.message;
        },
      }
    ))
  }
  resetPasswordSubmit() {
    this.callingAPI = true;
    this.resetNewPasswordForm.patchValue({ email: this.verifyEmailForm.get('email')?.value });
    this.apiSubscription.add(this._forgotPasswordService.sendPasswordResetEmail(this.resetNewPasswordForm.value).subscribe(
      {
        next: (res) => {
          this.apiErrorMSG = '';
          this.callingAPI = false;
          this.verifyEmailForm.get('email')?.value;
          localStorage.setItem('token', res.token);
          this._authService.saveUserData();
          this._router.navigate(['/home']);
        },
        error: (err) => {
          this.callingAPI = false;
          this.apiErrorMSG = err.error.message;
        },
      }
    ))
  }
  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();
  }

}
