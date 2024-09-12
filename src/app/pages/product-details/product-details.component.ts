import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../shared/services/product/products.service';
import { ProductDetails } from '../../shared/interfaces/product-details';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from '../../shared/services/cart/cart.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, CarouselModule, ToastrModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  productId!: string;
  productDetails!: ProductDetails;
  apiSubscription: Subscription = new Subscription();
  isCallingApi = false;
  constructor(private _activatedRoute: ActivatedRoute,
    private _productsService: ProductsService,
    private _cartService: CartService,
    private _toastr: ToastrService
  ) { }
  ngOnInit(): void {
    this.apiSubscription.add(this._activatedRoute.params.subscribe({
      next: (params: any) => {
        this.productId = params.id;
      }
    }));
    this.getProductDetails();
  }

  getProductDetails(): void {
    this.apiSubscription.add(this._productsService.getProduct(this.productId).subscribe({
      next: (res) => {
        this.productDetails = res.data;
      },
    }));
  }

  addProductToCart(productId: string): void {
    if (this.isCallingApi) return;
    this.isCallingApi = true;
    this.apiSubscription.add(this._cartService.addProductToCart(productId).subscribe(
      {
        next: (res) => {
          this._cartService.numberOfCartItems.next(res.numOfCartItems)
          this._toastr.success('Product added to cart successfully', 'Success');
          this.isCallingApi = false;
        }
      }
    ));
  }
  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();
  }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: false
  }
}
