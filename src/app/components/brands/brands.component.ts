import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankService } from 'src/app/service/blank.service';
import { brands } from 'src/app/core/interface/brands';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {

  constructor(private _BlankService: BlankService) { }

  brandsItem: brands[] = []

  ngOnInit(): void {
    this._BlankService.getBrands().subscribe({
      next: (response) => {
        this.brandsItem = response.data
      }
    })
  }

}
