import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/products/product.model';
import { Restaurant } from 'src/app/restaurants/restaurant.model';
import { Cart } from '../cart.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {

  isOrderFormView = false;

  cart: Cart;
  itemsDetails: { product: Product, quantity: number, productCost: number}[] = [];
  totalCost = 0;

  cartGetSubs: Subscription;

  restaurantDetails: Restaurant;

  cartChangeSubs: Subscription;

  constructor(
    private customerService: CustomerService,
    private cookieService: CookieService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.isOrderFormView = (this.router.url === '/order') ? true : false;

    if (this.cookieService.get('cartId')) {
      this. cartGetSubs = this.customerService.getCart(this.cookieService.get('cartId'))
          .subscribe(result => {
            this.cart = result.cart;
            let restaurantId = null;
            this.cart.items.forEach((value) => {
              this.customerService.getProduct(value.productId).subscribe(result => {
                const productCost = result.product.price * value.quantity;
                this.totalCost = this.totalCost + productCost;
                this.itemsDetails.push({product: result.product, quantity: value.quantity, productCost: productCost});
                if (restaurantId === null) {
                  restaurantId = result.product.restaurantId;
                  this.customerService.getRestaurantDetails(restaurantId)
                    .subscribe(result => {
                      this.restaurantDetails = result.restaurant;
                    });
                }
              });
            });
          });
    }
    this.cartChangeSubs = this.customerService.cartChanged
      .subscribe(result => {
        this.cart = result;
        let restaurantId = null;
        this.itemsDetails = [];
        this.cart.items.forEach((value) => {
          this.customerService.getProduct(value.productId).subscribe(result => {
            const productCost = result.product.price * value.quantity;
            this.totalCost = this.totalCost + productCost;
            this.itemsDetails.push({product: result.product, quantity: value.quantity, productCost: productCost});
            if (restaurantId === null) {
              restaurantId = result.product.restaurantId;
              this.customerService.getRestaurantDetails(restaurantId)
                .subscribe(result => {
                  this.restaurantDetails = result.restaurant;
                });
            }
          });
        });
      });
  }

  onItemRemove() {

  }

  onItemAdd() {

  }

  onItemDelete() {

  }

  onCartOrderSubmit() {
    this.router.navigate(['order']);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.cartChangeSubs){
      this.cartChangeSubs.unsubscribe();
    }
  }

}
