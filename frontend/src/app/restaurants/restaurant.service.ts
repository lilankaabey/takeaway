import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Restaurant } from './restaurant.model';

@Injectable()
export class RestaurantService {
  restaurantsChanged = new Subject<Restaurant[]>();

  private restaurants: Restaurant[] = [];

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  getRestaurants() {
    this.http.get<{ restaurants: Restaurant[] }>('http://localhost:3000/admin/restaurants')
      .subscribe((restaurantsData) => {
        console.log(restaurantsData);
        this.restaurants = restaurantsData.restaurants;
        this.restaurantsChanged.next([...this.restaurants]);
      });

  }

  addRestaurant(
    ownerName: string,
    restName: string,
    email: string,
    imagePath: File,
    town: string,
    street: string,
    houseNum: string,
    contactNum: string,
    deliTime: string,
    deliStatus: string,
    minAmount: number,
    desc: string,
    userId?: string) {

      const restaurantData = new FormData();
      restaurantData.append('ownerName', ownerName);
      restaurantData.append('restaurantName', restName);
      restaurantData.append('email', email);
      restaurantData.append('imagePath', imagePath, restName);
      restaurantData.append('town', town);
      restaurantData.append('street', street);
      restaurantData.append('houseNumber', houseNum);
      restaurantData.append('contactNumber', contactNum);
      restaurantData.append('deliveryTime', deliTime);
      restaurantData.append('deliveryStatus', deliStatus);
      restaurantData.append('minAmount', minAmount.toString());
      restaurantData.append('description', desc);
      restaurantData.append('userId', userId);

      this.http.post(
        'http://localhost:3000/admin/restaurant/add', restaurantData
      ).subscribe(resposeData => {
        console.log(resposeData);
        if (this.authService.getUserType() === 'admin') {
          this.router.navigate(['admin/restaurants']);
        } else if (this.authService.getUserType() === 'restaurant') {
          // this.router.navigate(['']);
        }
        // this.restaurants.push(resposeData);
        // this.restaurantsChanged.next(this.restaurants.slice());
      }, error => {
        console.log(error);
      });
  }

  ////////////////////////////////////////////////
  ///// Update a single restaurant //////////////
  //////////////////////////////////////////////

  updateRestaurant(
    _id: string,
    ownerName: string,
    restName: string,
    email: string,
    imagePath: File | string,
    town: string,
    street: string,
    houseNum: string,
    contactNum: string,
    deliTime: string,
    deliStatus: string,
    minAmount: number,
    desc: string
  ) {
    let restaurantData: Restaurant | FormData;
    if (typeof(imagePath) === 'object') {
      restaurantData = new FormData();
      restaurantData.append('_id', _id);
      restaurantData.append('ownerName', ownerName);
      restaurantData.append('restaurantName', restName);
      restaurantData.append('email', email);
      restaurantData.append('imagePath', imagePath, restName);
      restaurantData.append('town', town);
      restaurantData.append('street', street);
      restaurantData.append('houseNumber', houseNum);
      restaurantData.append('contactNumber', contactNum);
      restaurantData.append('deliveryTime', deliTime);
      restaurantData.append('deliveryStatus', deliStatus);
      restaurantData.append('minAmount', minAmount.toString());
      restaurantData.append('description', desc);
    } else {
      restaurantData = {
        _id: _id,
        ownerName: ownerName,
        restaurantName: restName,
        email: email,
        imagePath: imagePath,
        town: town,
        street: street,
        houseNumber: houseNum,
        contactNumber: contactNum,
        deliveryTime: deliTime,
        deliveryStatus: deliStatus,
        minAmount: minAmount,
        description: desc,
        createrId: null,
        userId: null,
        products: null,
        orders: null,
      };
    }

    this.http.put('http://localhost:3000/admin/restaurant/edit/' + _id, restaurantData)
      .subscribe(responseData => {
        if (this.authService.getUserType() === 'admin') {
          this.router.navigate(['admin/restaurants']);
        } else if (this.authService.getUserType() === 'restaurant') {
          // this.router.navigate(['']);
        }
      });
  }

  ///////// End Update a Single Restaurant //////

  getRestaurant(resId: string) {
    return this.http.get<{
      _id: string,
      ownerName: string;
      restaurantName: string;
      email: string;
      imagePath: string;
      town: string;
      street: string;
      houseNumber: string;
      contactNumber: string;
      deliveryTime: string;
      deliveryStatus: string;
      minAmount: number;
      description: string;
      createrId: string;
      userId: string;
      products: string[];
      orders: string[];
    }>('http://localhost:3000/admin/restaurant/' + resId);


  }

  setRestaurantIdtoUser(email: string) {
    this.http.get<{ message: string }>('http://localhost:3000/admin/set-restaurant-id/' + email)
      .subscribe(message => {
        console.log(message);
      });
  }
}
