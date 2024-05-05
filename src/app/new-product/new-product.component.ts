import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { IProduct } from '../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrl: './new-product.component.css',
})
export class NewProductComponent implements OnInit {
  public productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ps: ProductService,
    private router: Router
  ) {}

  onSubmit() {
    const product: IProduct = this.productForm.value;

    this.ps
      .addProduct({
        ...product,
        price: +product.price,
      })
      .subscribe((data) => {
        console.log('dddddd', data);
        this.router.navigateByUrl('/products');
      });
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: this.fb.control('', [Validators.required]),
      price: this.fb.control(0, [Validators.required]),
      checked: this.fb.control(false),
    });
  }
}
