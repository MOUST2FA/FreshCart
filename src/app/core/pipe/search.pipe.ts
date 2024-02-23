import { Pipe, PipeTransform } from '@angular/core';
import { product } from '../interface/auth';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(product:product[] , term:string): product[] {
    return product.filter((item)=> item.title.toLowerCase().includes(term.toLowerCase()));
  }

}
