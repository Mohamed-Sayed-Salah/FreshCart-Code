import { Component } from '@angular/core';
import { ProductsService } from '../../shared/services/product/products.service';
import { Subscription } from 'rxjs';
import { Product } from '../../shared/interfaces/product';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../shared/services/wishlist/wishlist.service';
import { CartService } from '../../shared/services/cart/cart.service';
import { ProductItemComponent } from "../../shared/components/ui/product-item/product-item.component";
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../shared/pipe/filter.pipe';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductItemComponent, FormsModule, FilterPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
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
  ) {

  }
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
