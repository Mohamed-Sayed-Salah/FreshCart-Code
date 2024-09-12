import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../shared/services/categories/categories.service';
import { Subscription } from 'rxjs';
import { Category } from '../../shared/interfaces/category';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private readonly _categoriesService = inject(CategoriesService);
  apiSubscription: Subscription = new Subscription();
  categories!: Category[];
  ngOnInit(): void {
    this.getCategories();
  }
  getCategories(): void {
    this.apiSubscription.add(this._categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
      }
    }))
  }
  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();
  }
}
