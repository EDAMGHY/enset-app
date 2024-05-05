import { Component, OnInit } from '@angular/core';
import { IProduct } from '../types';
import { ProductService } from '../services/product.service';
import { calculatePagination } from '../utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  public isLoading = false;
  public keyword = '';
  public page: number = 1;
  public limit: number = 5;
  public pages!: number[];
  public products: IProduct[] = [];

  constructor(private ps: ProductService, private router: Router) {}

  setPage(pageNumber: number) {
    this.isLoading = true;
    this.page = pageNumber;
    this.ps
      .getProducts(pageNumber, this.limit, this.keyword)
      .subscribe((response) => {
        this.products = response.body as IProduct[];
        this.pages = calculatePagination(this.limit, response);
        this.isLoading = false;
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
    this.isLoading = true;
    this.ps.getProducts(this.page, this.limit, this.keyword).subscribe({
      next: (response) => {
        this.products = response.body as IProduct[];
        this.pages = calculatePagination(this.limit, response);
        this.isLoading = false;
      },
    });
  }
  editProduct(product: IProduct) {
    this.router.navigateByUrl(`/edit-product/${product.id}`);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.ps.getProducts(this.page, this.limit, this.keyword).subscribe({
      next: (response) => {
        this.products = response.body as IProduct[];
        this.pages = calculatePagination(this.limit, response);
        this.isLoading = false;
      },
    });
  }
}
