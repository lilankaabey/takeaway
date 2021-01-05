import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CustomerService } from 'src/app/customers/customer.service';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Input() index: number;
  @Output() productDeleted: EventEmitter<string> = new EventEmitter();

  isAdminLogIn: boolean;
  isSystemLogIn: boolean;

  constructor(
    private router: Router,
    private productService: ProductService,
    private customerService: CustomerService,
    private cookieService: CookieService
    ) { }

  ngOnInit(): void {
    this.isAdminLogIn = (this.router.url === '/admin/restaurants') ? true : false;
    this.isSystemLogIn = (this.router.url === '/system/products') ? true : false;
  }

  ///////////////////////////////
  ///// System-Productt-Area /////
  ///////////////////////////////
  onDeleteProduct(id: string) {
    this.productDeleted.emit(id);
  }


  //////////////////////////////////////////////////

  onProductSelected(prodId: string) {
    if (this.cookieService.get('cartId')) {
      this.customerService.addToCart(prodId, this.cookieService.get('cartId'));
    } else {
      this.customerService.addToCart(prodId);
    }
    console.log('button click');
  }

}
