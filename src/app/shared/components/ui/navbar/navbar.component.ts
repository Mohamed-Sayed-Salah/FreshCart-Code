import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { CartService } from '../../../services/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  isLoggedIn = false;
  CartItemsCount: number = 0;
  platform: object = inject(PLATFORM_ID);
  constructor(private _authService: AuthService,
    private _cartService: CartService) { }
  ngOnInit(): void {
    this._authService.userData.subscribe((res) => {
      if (res) {
        this.isLoggedIn = true;
        this._cartService.numberOfCartItems.subscribe((res) => {
          this.CartItemsCount = res;
        });
        if (isPlatformBrowser(this.platform)) {
          this._cartService.getCartInfo().subscribe({
            next: (res) => {
              this._cartService.numberOfCartItems.next(res.numOfCartItems);
            }
          })
        }
      } else {
        this.isLoggedIn = false;
      }
    });

  }

  logOut() {
    this._authService.signOut();
  }

}
