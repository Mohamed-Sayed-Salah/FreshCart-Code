import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.css'
})
export class ProductItemComponent {
  @Input({ required: true }) product!: Product;
  @Input({ required: true }) isCallingApi!: boolean;
  @Input({ required: true }) isAddedToWishlist!: boolean;
  @Input({ required: true }) clickedId!: string;
  @Output() productIdEmitterToCart = new EventEmitter<string>();
  @Output() productIdEmitterToWishlist = new EventEmitter<string>();
  apiSubscription: Subscription = new Subscription();
  constructor() { }
  addToWishlist(id: string) {
    this.productIdEmitterToWishlist.emit(id);
    this.isAddedToWishlist = !this.isAddedToWishlist;
  }
  addToCart(id: string) {
    this.productIdEmitterToCart.emit(id);
  }
}
