import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/service/wishlist.service';
import { product } from 'src/app/core/interface/auth';
import { CartService } from 'src/app/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  constructor(private _WishlistService: WishlistService, private _CartService: CartService, private _ToastrService: ToastrService) { }

  productData: product[] = []
  wishlistId: string[] = []


  ngOnInit(): void {
    this._WishlistService.getToWishlist().subscribe({
      next: (response) => {
        this.productData = response.data;
        const newData = response.data.map((item: any) => item._id)
        this.wishlistId = newData
      }
    })
  }

  addWishlist(prodId: string | undefined): void {
    this._WishlistService.addToWishlist(prodId).subscribe({
      next: (response) => {
        this.wishlistId = response.data
        this._CartService.wishNumber.next(response.data.length)
        this._ToastrService.success('❤', response.message)
      }
    })
  }

  removeWishlist(prodId: string | undefined): void {
    this._WishlistService.removeToWishlist(prodId).subscribe({
      next: (response) => {
        this._ToastrService.success('❌', response.message)
        this.wishlistId = response.data
        this._CartService.wishNumber.next(response.data.length)
        const newDataWish = this.productData.filter((item:any)=> this.wishlistId.includes(item._id))
        this.productData = newDataWish
      }
    })
  }

  addCart(id: any): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message)
        this._CartService.cartNumber.next(response.numOfCartItems)
      },
      error: (err) => {
      }
    })
  }

}
