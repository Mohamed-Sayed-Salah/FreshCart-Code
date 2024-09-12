import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../../services/product/products.service';
import { Product } from '../../../interfaces/product';
import { ProductItemComponent } from "../../ui/product-item/product-item.component";
import { CartService } from '../../../services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { WishlistService } from '../../../services/wishlist/wishlist.service';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../../pipe/filter.pipe';

@Component({
  selector: 'app-recent-products',
  standalone: true,
  imports: [ProductItemComponent, FormsModule, FilterPipe],
  templateUrl: './recent-products.component.html',
  styleUrl: './recent-products.component.css'
})
export class RecentProductsComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  wishlistProducts: Product[] = [];
  isCallingApi: boolean = false;
  clickedId: string = '';
  search: string = '';
  apiSubscription: Subscription = new Subscription();
  constructor(private _productsService: ProductsService,
    private _cartService: CartService,
    private _wishlist: WishlistService,
    private _toastr: ToastrService,
  ) { }
  ngOnInit(): void {
    this.getProducts();
    this.getWishlistProducts();
  }

  getWishlistProducts() {
    this.apiSubscription.add(this._wishlist.getWishlist().subscribe({
      next: (res) => {
        this.wishlistProducts = res.data;
      }
    }));
  }
  addProductToWishlistToggle(id: string) {
    if (this.wishlistProducts.some((product) => product.id === id)) {
      this.apiSubscription.add(this._wishlist.deleteProductFromWishlist(id).subscribe({
        next: () => {
          this.getWishlistProducts();
          this._toastr.success('Product removed from  wishlist successfully 💖', 'Success');
        }
      }));
    } else {
      this.apiSubscription.add(this._wishlist.addProductToWishlist(id).subscribe({
        next: () => {
          this.getWishlistProducts();
          this._toastr.success('Product added to wishlist successfully 💖', 'Success');
        }
      }));
    }
  }
  isAddedToWishlist(id: string): boolean {
    if (this.wishlistProducts.find((p) => p.id === id)) {
      return true;
    } else {
      return false;
    }
  }
  getProducts() {
    this.apiSubscription.add(this._productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products = res.data;
      }
    }));
  }
  addProductToCart(id: string) {
    this.isCallingApi = true;
    this.clickedId = id;
    this.apiSubscription.add(this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.isCallingApi = false;
        this._cartService.numberOfCartItems.next(res.numOfCartItems)
        this._toastr.success('Product added to cart successfully', 'Success');
      }
    }))
  }
  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();
  }
}
