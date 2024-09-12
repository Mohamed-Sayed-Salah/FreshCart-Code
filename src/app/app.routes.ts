import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { OrderComponent } from './pages/order/order.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { LoginComponent } from './core/pages/login/login.component';
import { RegisterComponent } from './core/pages/register/register.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { ForgerPasswordComponent } from './core/pages/forgotPassword/forgotPassword.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'products', component: ProductsComponent, canActivate: [authGuard] },
  { path: 'productDetails/:id', component: ProductDetailsComponent, canActivate: [authGuard] },
  { path: 'wishlist', component: WishlistComponent, canActivate: [authGuard] },
  { path: 'cart', component: CartComponent, canActivate: [authGuard] },
  { path: 'categories', component: CategoriesComponent, canActivate: [authGuard] },
  { path: 'allorders', component: OrderComponent, canActivate: [authGuard] },
  { path: 'brands', component: BrandsComponent, canActivate: [authGuard] },
  { path: 'checkout/:cartId', component: CheckoutComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent, canActivate: [loggedGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [loggedGuard] },
  { path: 'forgotPassword', component: ForgerPasswordComponent },
  { path: '**', component: NotFoundComponent },
];
