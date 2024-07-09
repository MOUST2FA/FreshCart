import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { WishlistService } from 'src/app/service/wishlist.service';


@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit {

  constructor(private _Router: Router, private _CartService: CartService, private _Renderer2:Renderer2,private _WishlistService:WishlistService ) { }

  cartCount: number = 0;
  wishCount: number = 0;

  cartCountWishlist:number =0

  @ViewChild('navbar') navElement!: ElementRef

  @HostListener('window:scroll')
  scroll(): void {
    if (scrollY > 100) {
      this._Renderer2.addClass(this.navElement.nativeElement, 'p-3')
    } else {
      this._Renderer2.removeClass(this.navElement.nativeElement, 'p-3')
    }
  }

  singOut(): void {
    localStorage.removeItem('token')
    this._Router.navigate(['/login'])
  }

  ngOnInit(): void {
    this._CartService.cartNumber.subscribe({
      next: (data) => {
        this.cartCount = data
      }
    })


    this._CartService.getToCart().subscribe({
      next: (response) => {
        this.cartCount = response.numOfCartItems
      }
    })

    this._CartService.wishNumber.subscribe({
      next:(data)=>{
        this.wishCount = data
      }
    })

    this._WishlistService.getToWishlist().subscribe({
      next:(response)=>{
        this.wishCount = response.count
      }
    })
  }

}
