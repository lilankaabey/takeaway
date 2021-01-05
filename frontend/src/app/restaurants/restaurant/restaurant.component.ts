import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CustomerService } from 'src/app/customers/customer.service';
import { Restaurant } from '../restaurant.model';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent implements OnInit {
  @Input() restaurant: Restaurant;
  @Input() index: number;

  searchRestaurants: Restaurant[];

  isAdminLogIn: boolean;

  searchRestaurntSubs: Subscription;

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.isAdminLogIn = (this.router.url === '/admin/restaurants') ? true : false;
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

  onRestaurantSelected(resId: string) {
    this.router.navigate(['products', resId]);
  }
}
