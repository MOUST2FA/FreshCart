import { RouterLink } from '@angular/router';
import { product } from './../../core/interface/auth';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankService } from 'src/app/service/blank.service';
import { CartService } from 'src/app/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchPipe } from 'src/app/core/pipe/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-product',
  standalone: true,
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  imports: [CommonModule, RouterLink, NgxPaginationModule, FormsModule, SearchPipe]
})
export class ProductComponent implements OnInit {

  constructor(private _BlankService: BlankService, private _CartService: CartService, private _ToastrService: ToastrService , private _WishlistService:WishlistService) { }

  term: string = ''

  productItem: product[] = []
  pageSize: number = 0
  p: number = 1
  total: number = 0

  wishlistId: string[] = []


  ngOnInit(): void {
    this._BlankService.getProduct().subscribe({
      next: (response) => {
        this.productItem = response.data
        this.pageSize = response.metadata.limit
        this.p = response.metadata.currentPage
        this.total = response.results
      }
    })

    this._WishlistService.getToWishlist().subscribe({
      next:(response)=>{
        const newData = response.data.map((item:any)=>item._id )
        this.wishlistId = newData
      }
    })
  }

  addProduct(id: any): void {
    this._CartService.addToCart(id).subscribe({
      next: (response) => {
        this._ToastrService.success(response.message)
        this._CartService.cartNumber.next(response.numOfCartItems)
      }
    })
  }

  pageChanged(event: any): void {
    this._BlankService.getProduct(event).subscribe({
      next: (response) => {
        this.productItem = response.data
        this.pageSize = response.metadata.limit
        this.p = response.metadata.currentPage
        this.total = response.results
      }
    })
  }

  addWishlist(prodId: string | undefined): void {
    this._WishlistService.addToWishlist(prodId).subscribe({
      next: (response) => {
        this.wishlistId = response.data
        this._CartService.wishNumber.next(response.data.length)
        this._ToastrService.success( '❤' , response.message )
      }
    })
  }

  removeWishlist(prodId: string | undefined): void {
    this._WishlistService.removeToWishlist(prodId).subscribe({
      next: (response) => {
        this.wishlistId = response.data
        this._CartService.wishNumber.next(response.data.length)
        this._ToastrService.success( '❌' ,response.message)
      }
    })
  }


}
