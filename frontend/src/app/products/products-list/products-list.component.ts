import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  products: Product[];

  isAdminLogIn: boolean;
  isSystemLogIn: boolean;

  private productChangeSubs: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.isAdminLogIn = (this.router.url === '/admin/products') ? true : false;
    this.isSystemLogIn = (this.router.url === '/system/products') ? true : false;
    console.log(this.isSystemLogIn)
    this.productService.getProducts();
    this.productChangeSubs = this.productService.productsChanged
      .subscribe((products: Product[]) => {
        this.products = products;
        console.log(this.products);
      });
  }

  onAddProduct(){
    this.router.navigate(['../product/add'], {relativeTo: this.route});
  }

  onDeleteProduct(productId: string, index: number) {
    this.products.splice(index, 1);
    // this.productService.deleteProduct(productId)
    //   .subscribe((result) => {
    //     console.log(result);
    //     this.productService.getProducts();
    //   }, err => {
    //     console.log(err);
    //   });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.productChangeSubs.unsubscribe();
  }
}
