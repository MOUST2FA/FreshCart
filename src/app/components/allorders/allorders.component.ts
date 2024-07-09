import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {

  constructor(private _CartService: CartService) { }

  older: any[] = []

  ngOnInit(): void {
    this._CartService.AllOlder().subscribe({
      next: (response) => {

        this.older = response.data
      }
    })
  }

}
