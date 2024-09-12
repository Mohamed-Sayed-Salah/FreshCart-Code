import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart/cart.service';
import { Cart } from '../../shared/interfaces/cart';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit, OnDestroy {
  cartInfo: Cart = {} as Cart;
  apiSubscription: Subscription = new Subscription();
  constructor(private _cartService: CartService,
    private _toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.getCartInfo();
  }
  getCartInfo(): void {
    this.apiSubscription.add(this._cartService.getCartInfo().subscribe(
      {
        next: (res) => {
          this.cartInfo = res;
          this._cartService.numberOfCartItems.next(res.numOfCartItems);
        }
      }
    ))

  }
  removeItem(id: string): void {
    this.apiSubscription.add(this._cartService.deleteSpecificItem(id).subscribe(
      {
        next: (res) => {
          this.cartInfo = res;
          this._toastr.success('Product removed from cart successfully', 'Success');
          this._cartService.numberOfCartItems.next(res.numOfCartItems);
        }
      }
    ))
  }
  updateProduct(id: string, count: number): void {
    this.apiSubscription.add(this._cartService.updateProductQuantity(id, `${count}`).subscribe(
      {
        next: (res) => {
          this.cartInfo = res;

        }
      }
    ))
  }
  clearCart() {
    this.apiSubscription.add(this._cartService.delete().subscribe(
      {
        next: (res) => {
          this.getCartInfo();
          this._cartService.numberOfCartItems.next(res.numOfCartItems);
        }
      }))
  }
  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();
  }
}
