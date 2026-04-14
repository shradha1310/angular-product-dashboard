import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductResponse } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  private http = inject(HttpClient);
  private baseUrl = 'https://dummyjson.com/products';

  getProducts(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.baseUrl);
  }
}