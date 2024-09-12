import { Component, inject, OnDestroy } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Subscription } from 'rxjs';
import { Register } from '../../interfaces/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnDestroy {
  registerForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z0-9]{3,10}$/),
      ]),
      rePassword: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
    },
    this.confirmRePassword
  );
  private readonly _authService: AuthService = inject(AuthService);
  private readonly router: Router = inject(Router);
  apiErrorMSG: string = '';
  callingAPI: boolean = false;
  apiSubscription: Subscription = new Subscription();
  confirmRePassword(form: AbstractControl) {
    if (form.get('password')?.value === form.get('rePassword')?.value) {
      return null;
    } else {
      return { misMatch: true };
    }
  }
  register() {
    if (this.registerForm.valid) {
      this.apiErrorMSG = '';
      this.callingAPI = true;

      // Call API
      let formData: Register = this.registerForm.value as Register;
      this.apiSubscription = this._authService.signUp(formData).subscribe({
        next: (res) => {
          this.callingAPI = false;
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.callingAPI = false;
          this.apiErrorMSG = err.error.message;
        },
      });
    } else {
      this.registerForm.setErrors({ misMatch: true })
      this.registerForm.markAllAsTouched();
    }
  }

  ngOnDestroy() {
    this.apiSubscription.unsubscribe();
  }
}
