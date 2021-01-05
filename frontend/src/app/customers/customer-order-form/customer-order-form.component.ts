import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/products/product.model';
import { Restaurant } from 'src/app/restaurants/restaurant.model';
import { Cart } from '../cart.model';
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import { Order } from '../order.model';

@Component({
  selector: 'app-customer-order-form',
  templateUrl: './customer-order-form.component.html',
  styleUrls: ['./customer-order-form.component.scss']
})
export class CustomerOrderFormComponent implements OnInit {

  default = "as soon as possible";
  orderForm: FormGroup;

  customer: Customer;
  order: Order;

  cart: Cart;
  totalCost = 0;
  itemsDetails: { product: Product, quantity: number, productsCost: number}[] = [];
  restaurantDetails: Restaurant;

  private cartGetSubs: Subscription;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private cookieService: CookieService
  ) { }

  ngOnInit(): void {
    this.orderForm = new FormGroup({
      'address': new FormControl(null, Validators.required),
      'town': new FormControl(null, Validators.required),
      'floor': new FormControl(null),
      'customerName': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'contactNumber': new FormControl(null, Validators.required),
      'companyName': new FormControl(null),
      'deliveryTime': new FormControl(this.default, Validators.required),
      'remarks': new FormControl(null)
    });

    if (this.cookieService.get('cartId')) {
      this. cartGetSubs = this.customerService.getCart(this.cookieService.get('cartId'))
          .subscribe(result => {
            this.cart = result.cart;
            let restaurantId = null;
            this.cart.items.forEach((value) => {
              this.customerService.getProduct(value.productId).subscribe(result => {
                const productCost = result.product.price * value.quantity;
                this.totalCost = this.totalCost + productCost;
                this.itemsDetails.push({product: result.product, quantity: value.quantity, productsCost: productCost});
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
  }

  onOrderSubmit() {
    const value = this.orderForm.value;
    this.customerService.postCustomerDetails(
      value.address,
      value.town,
      value.customerName,
      value.email,
      value.contactNumber,
      value.deliveryTime,
      value.floor,
      value.companyName,
      value.remarks
    ).subscribe(result => {
      this.customer = result.customer;
      console.log(this.customer);
      this.customerService.addOrderDetails(
        this.itemsDetails,
        this.totalCost,
        this.customer,
        this.restaurantDetails._id.toString()
      ).subscribe(result => {
        this.order = result.order;
        const orderId = this.order._id.toString()
        console.log(orderId);
        this.router.navigate(['order-confirmed', orderId]);
      });
    });

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.cartGetSubs) {
      this.cartGetSubs.unsubscribe();
    }
  }

}
