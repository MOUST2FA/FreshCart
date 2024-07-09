import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(private _ActivatedRoute: ActivatedRoute, private _CartService: CartService) { }

  olderId: string | null = ''

  olderForm: FormGroup = new FormGroup({
    details: new FormControl(''),
    phone: new FormControl(''),
    city: new FormControl(''),
  })

  handelForm(): void {
    this._CartService.checkOut(this.olderId, this.olderForm.value).subscribe({
      next: (response) => {
        console.log(response);
        if (response.status == "success") {
          window.open(response.session.url ,"_self")

        }
      }
    })
  }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (prams) => {
        this.olderId = prams.get('id')
      }
    })
  }

}
