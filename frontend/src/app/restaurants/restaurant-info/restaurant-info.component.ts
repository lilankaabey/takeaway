import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Restaurant } from '../restaurant.model';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurant-info',
  templateUrl: './restaurant-info.component.html',
  styleUrls: ['./restaurant-info.component.scss']
})
export class RestaurantInfoComponent implements OnInit {
  restaurantInfo: Restaurant;
  restaurantId: string;

  getRestaurantInfoSubs: Subscription;

  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('restaurantId')) {
        this.restaurantId = paramMap.get('restaurantId');
        this.getRestaurantInfoSubs = this.restaurantService.getRestaurant(this.restaurantId)
          .subscribe(restaurantData => {
            console.log(restaurantData);
            this.restaurantInfo = restaurantData;
          });
      }
    });
  }

  onEditInfo() {
    this.router.navigate(['../edit/', this.restaurantInfo._id], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.getRestaurantInfoSubs) {
      this.getRestaurantInfoSubs.unsubscribe();
    }
  }

}
