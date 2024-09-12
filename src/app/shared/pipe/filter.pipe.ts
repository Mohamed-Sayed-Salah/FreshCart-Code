import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(products: Product[], search: string): Product[] {
    console.log(search);
    if (search === '') {
      return products;
    }
    products = products.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
    console.log(products)
    return products;
  }

}
