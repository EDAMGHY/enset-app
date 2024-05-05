import { Component, OnInit } from '@angular/core';
import { IProduct } from '../types';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  public isLoading = false;
  public keyword = '';
  public page: number = 1;
  public limit: number = 5;
  public pages!: number[];
  public products: IProduct[] = [];

  constructor(private ps: ProductService) {}

  setPage(pageNumber: number) {
    this.page = pageNumber;
    this.ps.getProducts(pageNumber, this.limit).subscribe((data) => {
      this.products = data?.data;
    });
  }

  toggleChecked(product: IProduct) {
    product.checked = !product.checked;
    this.ps.editProduct(product).subscribe((data) => {
      console.log('toggleChecked', data);
    });
  }
  deleteProd(product: IProduct) {
    if (confirm('Are you sure?'))
      this.ps.deleteProduct(product).subscribe((data) => {
        this.products = this.products.filter(
          (p: IProduct) => p.id !== product.id
        );
      });
  }

  searchProducts() {
    this.ps.search(this.keyword).subscribe((data) => {
      console.log('datadata', data);
      this.products = data;
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.ps.getProducts(this.page, this.limit).subscribe((data) => {
      console.log('arrarr', data);
      this.products = data?.data;
      this.pages = Array.from({ length: data?.pages }).map((x, i) => i + 1);
      this.isLoading = false;
    });
  }
}
