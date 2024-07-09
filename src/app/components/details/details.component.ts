import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BlankService } from 'src/app/service/blank.service';
import { CartService } from 'src/app/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, CarouselModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor(private _ActivatedRoute: ActivatedRoute, private _BlankService: BlankService, private _CartService: CartService, private _ToastrService: ToastrService) { }
  productDetails: any = {}
  productId: any

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (prams) => {
        this.productId = prams.get('id')
      }
    })

    this._BlankService.getDetails(this.productId).subscribe({
      next: (response) => {
        this.productDetails = response.data
      }
    })
  }

  addDetails(id: any): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message)
        this._CartService.cartNumber.next(response.numOfCartItems)
      }
    })
  }

  detailsOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    navText: ['', ''],
    autoplay: true,
    items: 1,
    nav: true
  }


}
