import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { CustomerService } from 'src/app/customers/customer.service';
import { ProductService } from 'src/app/products/product.service';
import { Restaurant } from '../restaurant.model';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurants-list',
  templateUrl: './restaurants-list.component.html',
  styleUrls: ['./restaurants-list.component.scss']
})
export class RestaurantsListComponent implements OnInit, OnDestroy {
  restaurants: Restaurant[];

  searchRestaurants: Restaurant[];

  // checked whether user login or admin login
  isAdminLogIn: boolean;

  private restaurantChangedSubscription: Subscription;

  private searchRestaurntSubs: Subscription;

  constructor(
    private restaurantService: RestaurantService,
    private customerService: CustomerService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.isAdminLogIn = (this.router.url === '/admin/restaurants') ? true : false;
    if (this.isAdminLogIn) {
      this.restaurantService.getRestaurants();
      this.restaurantChangedSubscription = this.restaurantService.restaurantsChanged
        .subscribe((restaurants: Restaurant[]) => {
          this.restaurants = restaurants;
        } );
    } else {
      this.searchRestaurntSubs = this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.has('location')) {
          const location = paramMap.get('location');
          // this.searchRestaurntSubs =
          this.customerService.getSearchRestaurant(location)
            .subscribe(restaurants => {
              this.searchRestaurants = restaurants.restaurants;
            });
        }
      });


    }

  }

  /////////////////////////////////////
  //// Admin-Restaurants-List-Area  ///
  /////////////////////////////////////
  onAddRestaurant() {
    this.router.navigate(['../restaurant/add'], {relativeTo: this.route});
  }

  ////////////////////////////////////

  onRestaurantSelected(resId: string) {

  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    if (this.restaurantChangedSubscription) {
      this.restaurantChangedSubscription.unsubscribe();
    }
    if (this.restaurantChangedSubscription) {
      this.restaurantChangedSubscription.unsubscribe();
    }

    if (this.searchRestaurntSubs) {
      this.searchRestaurntSubs.unsubscribe();
    }
  }

}
