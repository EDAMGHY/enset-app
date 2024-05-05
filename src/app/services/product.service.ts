import { Injectable } from '@angular/core';
import { IProduct } from '../types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  search(keyword: string): Observable<IProduct[]> {
    return this.http.get<any>(
      `http://localhost:3000/products?name_like=${keyword}`
    );
  }
  deleteProduct(product: IProduct) {
    return this.http.delete<any>(
      `http://localhost:3000/products/${product.id}`
    );
  }

  editProduct(product: IProduct): Observable<IProduct> {
    return this.http.patch<IProduct>(
      `http://localhost:3000/products/${product.id}`,
      product
    );
  }
  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`http://localhost:3000/products`, product);
  }

  getProducts(
    page = 1,
    limit = 10
  ): Observable<{
    pages: number;
    items: number;
    data: IProduct[];
  }> {
    return this.http.get<{
      pages: number;
      items: number;
      data: IProduct[];
    }>(`http://localhost:3000/products?_page=${page}&_per_page=${limit}`);
  }
}
