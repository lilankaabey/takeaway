import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  productsChanged = new Subject<Product[]>();

  private products: Product[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ){}

  //////////// To get Products ///////////////
  getProducts() {
    this.http.get<{ products: Product[] }>('http://localhost:3000/system/products')
      .subscribe((productsData) => {
        this.products = productsData.products;
        this.productsChanged.next([...this.products]);
      });
  }

  ///////////////////
  /// Add Product ///
  ///////////////////

  addProduct(
    name: string,
    category: string,
    price: number,
    description: string
  ) {
    this.http.post('http://localhost:3000/system/product/add', {name, category, price, description})
      .subscribe(responseData => {
        console.log(responseData);
      }, error => {
        console.log(error);
      });
  }

  ///////////////////////////

  ///////////////////////////
  //// Update Product ///////
  ///////////////////////////

  updateProduct(
    _id: string,
    name: string,
    category: string,
    price: number,
    description: string
  ) {
    this.http.put('http://localhost:3000/system/product/edit/' + _id , {name, category, price, description})
      .subscribe(responseData => {
        console.log(responseData);
        this.router.navigate(['system/product/', _id]);
      }, error => {
        console.log(error);
      });
  }

  //////////////////////////

  //////////////////////////////
  //// Get a single product ////
  //////////////////////////////

  getProduct(productId: string) {
    return this.http.get<{product: Product}>('http://localhost:3000/system/product/' + productId);
  }

  //////////////////////////////

  //////////////////////////
  //// Delete Product //////
  //////////////////////////

  deleteProduct(productId: string) {
    return this.http.delete<{ message: string }>('http://localhost:3000/system/product/delete/' + productId);
  }

  //////////////////////////

  //////////////////////////
  /// Get Restaurant ID ////
  /////////////////////////

  getRestaurantId() {
    return this.http.get<{id: string}>('http://localhost:3000/system/product/getId');
  }
}
