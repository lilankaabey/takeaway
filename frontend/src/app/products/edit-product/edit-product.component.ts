import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  buttonValue = 'Add Product';
  defaultCategory = 'Rise';
  private mode = 'create';
  productId: string;

  productForm: FormGroup;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'category': new FormControl(this.defaultCategory),
      'price': new FormControl(null, [Validators.required, Validators.minLength(2)]),
      'description': new FormControl(null, [Validators.required]),
    });

    ////////////////////////////
    // To Edit Product Details //
    ////////////////////////////
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('productId')) {
        this.mode = 'edit';
        this.buttonValue = 'Update';
        this.productId = paramMap.get('productId');
        this.productService.getProduct(this.productId)
          .subscribe(productData => {
            console.log(productData);
            const product: Product = productData.product;

            this.productForm.setValue({
              'name': product.name,
              'category': product.category,
              'price': product.price,
              'description': product.description
            });
          });
      } else {
        this.mode = 'create';
        this.productId = null;
        this.buttonValue = 'Add Product';
      }
    });
  }

  onAddProduct(){
    const value = this.productForm.value;
    if (this.mode === 'create') {
      this.productService.addProduct(
        value.name,
        value.category,
        value.price,
        value.description
      );
    } else if (this.mode === 'edit') {
      this.productService.updateProduct(
        this.productId,
        value.name,
        value.category,
        value.price,
        value.description
      );
    }
    this.productForm.reset();
  }

}
