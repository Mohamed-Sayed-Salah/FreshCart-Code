import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from './../../shared/services/brands/brands.service';
import { Brand } from '../../shared/interfaces/brand';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit, OnDestroy {
  brands!: Brand[];
  apiSubscription: Subscription = new Subscription();
  constructor(private _brandsService: BrandsService) { }
  ngOnInit(): void {
    this.getAllBrands()
  }
  getAllBrands() {
    this.apiSubscription.add(this._brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brands = res.data;
      }
    }))
  }
  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();
  }
}
