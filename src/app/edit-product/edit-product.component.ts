import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { IProduct } from '../types';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css',
})
export class EditProductComponent implements OnInit {
  id!: number;
  product!: IProduct;
  productFG!: FormGroup;
  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private ps: ProductService,
    private fb: FormBuilder
  ) {}

  onSubmit() {
    const product: IProduct = {
      ...this.productFG.value,
      price: +this.productFG.value.price,
    };
    this.ps.editProduct(product).subscribe({
      next: (data) => {
        this.route.navigateByUrl('/products');
      },
    });
  }

  ngOnInit(): void {
    this.id = +this.router.snapshot.params['id'];
    this.ps.getProductById(this.id).subscribe({
      next: (data) => {
        this.product = data;
        this.productFG = this.fb.group({
          id: this.fb.control({ value: +data.id || +this.id, disabled: true }),
          name: this.fb.control(data.name, [Validators.required]),
          price: this.fb.control(+data.price, [
            Validators.required,
            Validators.min(100),
          ]),
          checked: this.fb.control(data.checked),
        });
      },
      error(err) {
        console.log(err);
      },
    });
  }
}
