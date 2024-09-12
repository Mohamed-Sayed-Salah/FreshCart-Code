import { Component, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../../shared/services/wishlist/wishlist.service';
import { Subscription } from 'rxjs';
import { Product } from '../../shared/interfaces/product';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent implements OnInit, OnDestroy {
  apiSubscription: Subscription = new Subscription();
  wishlistProducts: Product[] = [];
  constructor(private wishList: WishlistService,
    private _toastr: ToastrService) { }
  ngOnInit() {
    this.getWishlist();
  }
  getWishlist() {
    this.apiSubscription.add(this.wishList.getWishlist().subscribe({
      next: (res) => {
        this.wishlistProducts = res.data;
      }
    }));
  }
  deleteProductFromWishlist(productId: string) {
    this.apiSubscription.add(this.wishList.deleteProductFromWishlist(productId).subscribe({
      next: (res) => {
        this.getWishlist();
        this._toastr.success('Product removed from wishlist successfully', 'Success');
      }
    }))
  }
  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();
  }
}
