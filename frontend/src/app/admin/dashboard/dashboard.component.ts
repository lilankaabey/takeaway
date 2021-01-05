import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Product } from 'src/app/products/product.model';
import { ProductService } from 'src/app/products/product.service';
import { Restaurant } from 'src/app/restaurants/restaurant.model';
import { RestaurantService } from 'src/app/restaurants/restaurant.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  isAdmin: boolean;
  restaurants: Restaurant[];
  products: Product[];
  restaurantChangedSubscription: Subscription;

  constructor(
    private restaurantService: RestaurantService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    this.isAdmin = (this.authService.getUserType() === 'admin') ? true :  false;
    if (this.isAdmin) {
      this.restaurantService.getRestaurants();
      this.restaurantChangedSubscription = this.restaurantService.restaurantsChanged
          .subscribe((restaurants: Restaurant[]) => {
            this.restaurants = restaurants;
          } );
    } else  {
      this.productService.getProducts();
      this.productService.productsChanged.subscribe(result => {
        this.products = result;
      });
    }

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.restaurantChangedSubscription) {
      this.restaurantChangedSubscription.unsubscribe();
    }
  }

}
