import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankService } from 'src/app/service/blank.service';
import { product } from 'src/app/core/interface/auth';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { categories } from 'src/app/core/interface/categories';
import { CartService } from 'src/app/service/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, CarouselModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private _BlankService: BlankService, private _CartService: CartService, private _ToastrService: ToastrService, private _WishlistService: WishlistService) { }

  productData: product[] = []
  categories: categories[] = []
  wishlistId:string[]=[]

  ngOnInit(): void {
    this._BlankService.getProduct().subscribe({
      next: (response) => {
        this.productData = response.data
      }
    })

    this._BlankService.getCategories().subscribe({
      next: (response) => {
        this.categories = response.data
      }
    })

    this._WishlistService.getToWishlist().subscribe({
      next:(response)=>{
        const newData = response.data.map((item:any)=>item._id )
        this.wishlistId = newData
        this._CartService.wishNumber.next(response.count)
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



  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    navText: ['', ''],
    autoplay: true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  categoriesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 1000,
    navText: ['', ''],
    items: 1,
    nav: true,
    autoplay: true,
  }

}
