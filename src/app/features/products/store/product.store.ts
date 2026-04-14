import { Injectable, signal, computed, inject } from '@angular/core';
import { ProductApiService } from '../services/product-api.service';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductStore {

  private api = inject(ProductApiService);

  // STATE
  private productsSignal = signal<Product[]>([]);
  private loadingSignal = signal(false);

  private searchSignal = signal('');
  private sortSignal = signal<'price' | 'rating' | ''>('');
  private pageSignal = signal(1);
  private pageSize = 6;

  // SELECTORS
  loading = computed(() => this.loadingSignal());

  // 🔍 FILTER + SORT + PAGINATION PIPELINE
  private filteredProducts = computed(() => {
    let products = this.productsSignal();

    // SEARCH
    const search = this.searchSignal().toLowerCase();
    if (search) {
      products = products.filter(p =>
        p.title.toLowerCase().includes(search)
      );
    }

    // SORT
    const sort = this.sortSignal();
    if (sort === 'price') {
      products = [...products].sort((a, b) => a.price - b.price);
    }
    if (sort === 'rating') {
      products = [...products].sort((a, b) => b.rating - a.rating);
    }

    return products;
  });

  // 📄 PAGINATED DATA
  paginatedProducts = computed(() => {
    const start = (this.pageSignal() - 1) * this.pageSize;
    return this.filteredProducts().slice(start, start + this.pageSize);
  });

  totalPages = computed(() =>
    Math.ceil(this.filteredProducts().length / this.pageSize)
  );

  currentPage = computed(() => this.pageSignal());

  // ACTIONS
  loadProducts() {
    this.loadingSignal.set(true);

    this.api.getProducts().subscribe({
      next: (res) => {
        this.productsSignal.set(res.products);
        this.loadingSignal.set(false);
      },
      error: () => {
        this.loadingSignal.set(false);
      }
    });
  }

  setSearch(value: string) {
    this.searchSignal.set(value);
    this.pageSignal.set(1);
  }

  setSort(value: 'price' | 'rating' | '') {
    this.sortSignal.set(value);
  }

  setPage(page: number) {
    this.pageSignal.set(page);
  }
}