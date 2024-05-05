import { Injectable } from '@angular/core';
import { IPaginatedProducts, IProduct } from '../types';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  host: string = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  deleteProduct(product: IProduct) {
    return this.http.delete<any>(`${this.host}/products/${product.id}`);
  }

  editProduct(product: IProduct): Observable<IProduct> {
    return this.http.patch<IProduct>(
      `${this.host}/products/${product.id}`,
      product
    );
  }
  addProduct(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>(`${this.host}/products`, product);
  }

  getProducts(page: number = 1, limit: number = 5, keyword: string = '') {
    const URL: string = `${this.host}/products?name_like=${keyword}&_page=${page}&_limit=${limit}`;
    return this.http.get(URL, { observe: 'response' });
  }

  getProductById(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.host}/products/${id}`);
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
