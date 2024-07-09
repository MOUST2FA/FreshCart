import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/service/cart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(private _CartService: CartService) { }

  getCartId: any = {}

  ngOnInit(): void {
    this._CartService.getToCart().subscribe({
      next: (response) => {
        this.getCartId = response.data
      }
    })
  }

  removeId(id: any): void {
    this._CartService.removeToCart(id).subscribe({
      next: (response) => {
        this.getCartId = response.data
        this._CartService.cartNumber.next(response.numOfCartItems)
      }
    })
  }

  upDataId(id: string, count: number): void {
    if (count >= 1) {
      this._CartService.upDataToCart(id, count).subscribe({
        next: (response) => {
          this.getCartId = response.data
        }
      })
    }
  }

  clearAll(): void {
    this._CartService.clearToCart().subscribe({
      next: (response) => {
        if (response.message === "success") {
          this.getCartId = {}
          this._CartService.cartNumber.next(0)
        }
      }
    })
  }

}
