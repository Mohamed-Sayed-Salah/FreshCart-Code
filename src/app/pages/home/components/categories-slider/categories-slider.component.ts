import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../shared/services/categories/categories.service';
import { Category } from '../../../../shared/interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-categories-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './categories-slider.component.html',
  styleUrl: './categories-slider.component.css'
})
export class CategoriesSliderComponent implements OnInit, OnDestroy {
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
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    animateOut: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 2000,
    navSpeed: 700,
    margin: 10,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 5
      },
      940: {
        items: 8
      }
    },
    nav: false
  }
  ngOnDestroy(): void {
    this.apiSubscription.unsubscribe();
  }
}
