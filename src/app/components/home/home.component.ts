import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/classes/product';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allProducts: Product[] | undefined;

  constructor(private productsService: FavouriteService) { }

  async getProducts() {
    this.allProducts = await this.productsService.fetchProducts();
  }

  ngOnInit(): void {
    this.getProducts()
  }
}
