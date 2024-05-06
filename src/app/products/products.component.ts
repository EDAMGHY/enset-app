import { Component, OnInit } from '@angular/core';
import { IProduct } from '../types';
import { ProductService } from '../services/product.service';
import { calculatePagination } from '../utils';
import { Router } from '@angular/router';
import { AppStateService } from '../services/app-state.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  constructor(
    private ps: ProductService,
    private router: Router,
    public appState: AppStateService
  ) {}

  setPage(pageNumber: number) {
    this.appState.productState.isLoading = true;
    this.appState.productState.page = pageNumber;
    this.ps
      .getProducts(
        pageNumber,
        this.appState.productState.limit,
        this.appState.productState.keyword
      )
      .subscribe({
        next: (response) => {
          this.appState.productState.products = response.body as IProduct[];
          const { pages = [], count = 0 } = calculatePagination(
            this.appState.productState.limit!,
            response
          );

          this.appState.productState.pages = pages;
          this.appState.productState.total = count;
          this.appState.productState.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.appState.setProductState({
            isLoading: false,
            isError: true,
            errorMessage: err?.message || '',
          });
        },
      });
  }

  toggleChecked(product: IProduct) {
    product.checked = !product.checked;
    this.ps.editProduct(product).subscribe({
      next: (data) => {
        console.log('toggleChecked', data);
      },
      error: (err) => {
        console.log(err);
        this.appState.setProductState({
          isLoading: false,
          isError: true,
          errorMessage: err?.message || '',
        });
      },
    });
  }
  deleteProd(product: IProduct) {
    if (confirm('Are you sure?'))
      this.ps.deleteProduct(product).subscribe({
        next: (data) => {
          this.appState.productState.products =
            this.appState.productState.products!.filter(
              (p: IProduct) => p.id !== product.id
            );
          this.searchProducts();
        },
        error: (err) => {
          console.log(err);
          this.appState.setProductState({
            isLoading: false,
            isError: true,
            errorMessage: err?.message || '',
          });
        },
      });
  }

  searchProducts() {
    this.appState.productState.isLoading = true;
    this.ps
      .getProducts(
        this.appState.productState.page,
        this.appState.productState.limit,
        this.appState.productState.keyword
      )
      .subscribe({
        next: (response) => {
          this.appState.productState.products = response.body as IProduct[];
          const { pages = [], count = 0 } = calculatePagination(
            this.appState.productState.limit!,
            response
          );

          this.appState.productState.pages = pages;
          this.appState.productState.total = count;
          this.appState.productState.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.appState.setProductState({
            isLoading: false,
            isError: true,
            errorMessage: err?.message || '',
          });
        },
      });
  }
  editProduct(product: IProduct) {
    this.router.navigateByUrl(`/admin/edit-product/${product.id}`);
  }

  ngOnInit(): void {
    this.appState.productState.isLoading = true;
    this.ps
      .getProducts(
        this.appState.productState.page,
        this.appState.productState.limit,
        this.appState.productState.keyword
      )
      .subscribe({
        next: (response) => {
          this.appState.productState.products = response.body as IProduct[];
          const { pages = [], count = 0 } = calculatePagination(
            this.appState.productState.limit!,
            response
          );

          this.appState.productState.pages = pages;
          this.appState.productState.total = count;
          this.appState.productState.isLoading = false;
        },
        error: (err) => {
          console.log('err', err);
          this.appState.setProductState({
            isLoading: false,
            isError: true,
            errorMessage: err?.message || '',
          });
        },
      });
  }
}
