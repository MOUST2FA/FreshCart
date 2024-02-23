import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankService } from 'src/app/service/blank.service';
import { categories } from 'src/app/core/interface/categories';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule , RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(private _BlankService: BlankService) { }
  categoriesItem: categories[] = []

  ngOnInit(): void {
    this._BlankService.getCategories().subscribe({
      next: (response) => {
        this.categoriesItem = response.data
      }
    })
  }

}
