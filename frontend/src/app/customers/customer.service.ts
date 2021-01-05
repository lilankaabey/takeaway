import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subject } from 'rxjs';
import { Product } from '../products/product.model';
import { Restaurant } from '../restaurants/restaurant.model';
import { Cart } from './cart.model';
import { Customer } from './customer.model';
import { Order } from './order.model';


@Injectable()
export class CustomerService {
  searchedRestaurants: Restaurant[];
  changedSerchedRestuatants = new Subject<Restaurant[]>();
  viewProducts: Product[];

  cartChanged = new Subject<Cart>();

  private cart: Cart;


  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private cookieService: CookieService
  ) {

  }


  //// get search result() ///
  getSearchRestaurant(location: string) {
    return this.http.get<{ restaurants: Restaurant[]}>('http://localhost:3000/customer/search/' + location);
  }

  /// get products ///

  getProducts(restaurantId: string) {
    return this.http.get<{ products: Product[] }>('http://localhost:3000/customer/products/' + restaurantId);
  }

  // get restaurantDetails

  getRestaurantDetails(restaurantId: string) {
    return this.http.get<{ restaurant: Restaurant }>('http://localhost:3000/customer/getrestaurant/' + restaurantId);
  }


  // Add to cart

  addToCart(productId: string, cartId?: string) {
    this.http.post<{ message: string, cartId: string, cart: Cart }>('http://localhost:3000/customer/addtocart', { productId, cartId })
      .subscribe(result => {
        console.log(result.message);
        console.log(result.cart);
        if (!this.cookieService.get('cartId')) {
          this.cookieService.set('cartId', result.cartId);
        }
        this.cart = result.cart;
        this.cartChanged.next(this.cart);

      });
  }

  //// GetCart //////////
  getCart(cartId: string) {
    return this.http.get<{cart: Cart}>('http://localhost:3000/customer/getcart/' + cartId);
  }



  ////// Get Product ////////
  getProduct(prodId: string) {
    return this.http.get<{product: Product}>('http://localhost:3000/customer/getproduct/' + prodId);
  }

  //// Add Customer Details ////
  postCustomerDetails(
    address: string,
    town: string,
    customerName: string,
    email: string,
    contactNumber: string,
    deliveryTime: string,
    floor?: string,
    companyName?: string,
    remarks?: string,
    userId?: string
  ) {
    return this.http.post<{ customer: Customer}>('http://localhost:3000/customer/addcustomer',
    {
      address,
      town,
      customerName,
      email,
      contactNumber,
      deliveryTime,
      floor,
      companyName,
      remarks,
      userId
    }
    );
  }


  ////////////////////////////
  //////// Add Order  ////////
  ////////////////////////////

  addOrderDetails(
    products: { product: {}, quantity: number, productsCost: number}[],
    totalCost: number,
    customer: {},
    restaurantId: string
  ) {
    return this.http.post<{ order: Order }>('http://localhost:3000/customer/addorder',
    {
      products,
      totalCost,
      customer,
      restaurantId
    }
    );
  }

  //////////////////////////////
  ////////// Get Order /////////
  //////////////////////////////

  getOrder(orderId: string) {
    return this.http.get<{ order: Order }>('http://localhost:3000/customer/getorder/' + orderId);
  }

}
