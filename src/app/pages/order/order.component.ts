import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../core/environments/environment';
import { Observable, Subscription } from 'rxjs';
import { OrderService } from '../../shared/services/order/order.service';
import { AuthService } from '../../core/services/auth/auth.service';
import { Order } from '../../shared/interfaces/order';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit, OnDestroy {
  userId!: string;
  allOrders!: Order[];
  apiSubscription: Subscription = new Subscription();
  constructor(private _orderService: OrderService, private _authService: AuthService) { }

  ngOnInit(): void {
    this.apiSubscription.add(this._authService.userData.subscribe(
      () => {
        this.userId = this._authService.userData.getValue().id;
      }
    ));
    this.getAllOrders(this.userId);
  }

  getAllOrders(userId: string): void {
    this.apiSubscription.add(this._orderService.getOrders(userId).subscribe({
      next: (res) => {
        this.allOrders = res;
      }
    }
    ))
  }

  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();
  }
}
