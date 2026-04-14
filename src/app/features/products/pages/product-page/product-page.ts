import { Component, inject, OnInit } from '@angular/core';
import { ProductStore } from '../../store/product.store';

@Component({
  selector: 'app-product-page',
  imports: [],
  standalone: true,
  templateUrl: './product-page.html',
  styleUrl: './product-page.scss',
})
export class ProductPage implements OnInit{
  store = inject(ProductStore);

  ngOnInit() {
    this.store.loadProducts();
  }
  onSearch(event: any) {
    this.store.setSearch(event.target.value);
  }

  onSort(event: any) {
    this.store.setSort(event.target.value);
  }

  getPages(): number[] {
    return Array(this.store.totalPages()).fill(0).map((_, i) => i + 1);
  }
}
