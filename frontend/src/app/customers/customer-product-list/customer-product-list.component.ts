import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/products/product.model';
import { Restaurant } from 'src/app/restaurants/restaurant.model';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-customer-product-list',
  templateUrl: './customer-product-list.component.html',
  styleUrls: ['./customer-product-list.component.scss']
})
export class CustomerProductListComponent implements OnInit {
  products: Product[];

  restaurant: Restaurant;
  private productsSubs: Subscription;

  restaurantId: string;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.productsSubs = this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('restaurantId')) {
        this.restaurantId = paramMap.get('restaurantId');
        this.customerService.getRestaurantDetails(this.restaurantId)
          .subscribe(result => {
            this.restaurant = result.restaurant;
          });

        this.customerService.getProducts(this.restaurantId)
          .subscribe(result => {
            this.products = result.products;
          });
      }
    });
  }

}
