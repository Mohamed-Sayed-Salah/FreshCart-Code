import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderService } from '../../shared/services/order/order.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnDestroy, OnInit {
  shippingDetails = new FormGroup(
    {
      details: new FormControl('', [Validators.required]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern(/^01[0125][0-9]{8}$/),
      ]),
      city: new FormControl('', [Validators.required]),
    },
  );
  apiErrorMSG: string = '';
  callingAPI: boolean = false;
  _router = inject(Router);
  cartId!: string;
  apiSubscription: Subscription = new Subscription();
  constructor(private _activatedRoute: ActivatedRoute, private _orderService: OrderService) { }
  ngOnInit(): void {
    this.cartId = this._activatedRoute.snapshot.params?.['cartId'];
  }
  continue() {
    this.apiSubscription.add(this._orderService.generateCheckout(this.cartId, this.shippingDetails.value).subscribe(
      {
        next: (res) => {
          window.location.href = res.session.url;
        }
      }))
  }
  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();
  }
}
