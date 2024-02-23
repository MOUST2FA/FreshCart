import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankService } from 'src/app/service/blank.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories-product',
  standalone: true,
  imports: [CommonModule ,RouterLink],
  templateUrl: './categories-product.component.html',
  styleUrls: ['./categories-product.component.scss']
})
export class CategoriesProductComponent implements OnInit{


  constructor(private _BlankService: BlankService, private _ActivatedRoute: ActivatedRoute , private _CartService:CartService , private __ToastrService:ToastrService) { }
  categoriesId: any
  categoriesProductId: any[] = []

  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next: (prams) => {
        this.categoriesId = prams.get('id');
      }
    })

    this._BlankService.addToCategoriesId(this.categoriesId).subscribe({
      next: (response) => {
        this.categoriesProductId = response.data;

      }
    })
  }

  addCart(id: any): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this.__ToastrService.success(response.message)
        this._CartService.cartNumber.next(response.numOfCartItems)
      },
      error: (err) => {
      }
    })
  }
}
