import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Restaurant } from '../restaurant.model';
import { RestaurantService } from '../restaurant.service';
import { User } from '../../auth/user.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.scss']
})
export class EditRestaurantComponent implements OnInit, OnDestroy {
  defaultTime = '11:00';
  defaultDeliStatus = 'Free';
  confirmEmail: string;
  restaurant: Restaurant;
  private mode = 'create';
  buttonValue = 'Add';

  getRestaurantSubs: Subscription;

  private restaurantId: string;

  restaurantForm: FormGroup;

  constructor(
    private restaurantService: RestaurantService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.restaurantForm = new FormGroup({
      'owner_name': new FormControl(null, Validators.required),
      'restaurant_email': new FormControl(null, [Validators.required, Validators.email]),
      'restaurant_password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'restaurant_name': new FormControl(null, [Validators.required]),
      'imagePath': new FormControl(null, [Validators.required]),
      'town': new FormControl(null, [Validators.required]),
      'street': new FormControl(null, [Validators.required]),
      'house_number': new FormControl(null, [Validators.required]),
      'contact_number': new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      'deli_time': new FormControl(this.defaultTime),
      'deli_status': new FormControl(this.defaultDeliStatus),
      'min_amount': new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(4)]),
      'description': new FormControl(null, [Validators.required])
    });

    ///////////////////////////////
    // To edit restaurant Details /
    ///////////////////////////////
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('restaurantId')) {
        this.mode = 'edit';
        this.buttonValue = 'Update';
        this.restaurantId = paramMap.get('restaurantId');
        this.getRestaurantSubs = this.restaurantService.getRestaurant(this.restaurantId)
          .subscribe(restaurantData => {
            this.restaurant = {
              _id: restaurantData._id,
              ownerName: restaurantData.ownerName,
              restaurantName: restaurantData.restaurantName,
              email: restaurantData.email,
              imagePath: restaurantData.imagePath,
              town: restaurantData.town,
              street: restaurantData.street,
              houseNumber: restaurantData.houseNumber,
              contactNumber: restaurantData.contactNumber,
              deliveryTime: restaurantData.deliveryTime,
              deliveryStatus: restaurantData.deliveryStatus,
              minAmount: restaurantData.minAmount,
              description: restaurantData.description,
              createrId: 'restaurantData.createrId',
              userId: restaurantData.userId,
              products: restaurantData.products,
              orders: restaurantData.orders,
            };
            console.log(this.restaurant);
            this.restaurantForm.setValue({
              'owner_name': this.restaurant.ownerName,
              'restaurant_email': this.restaurant.email,
              'restaurant_password': null,
              'restaurant_name': this.restaurant.restaurantName,
              'imagePath': this.restaurant.imagePath,
              'town': this.restaurant.town,
              'street': this.restaurant.street,
              'house_number': this.restaurant.houseNumber,
              'contact_number': this.restaurant.contactNumber,
              'deli_time': this.restaurant.deliveryTime,
              'deli_status': this.restaurant.deliveryStatus,
              'min_amount': this.restaurant.minAmount,
              'description': this.restaurant.description
            });
            this.restaurantForm.controls['restaurant_password'].disable();
          });
      } else {
        this.mode = 'create';
        this.buttonValue = 'Add';
        this.restaurantId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.restaurantForm.patchValue({imagePath: file});
    this.restaurantForm.get('imagePath').updateValueAndValidity();
  }

  onAddRestaurant() {
    const value = this.restaurantForm.value;
    console.log(value);
    if (this.mode === 'create') {
      this.authService.signupUser(value.restaurant_email, value.restaurant_password, 'restaurant').subscribe(responseData => {
        this.restaurantService.addRestaurant(
          value.owner_name,
          value.restaurant_name,
          value.restaurant_email,
          value.imagePath,
          value.town,
          value.street,
          value.house_number,
          value.contact_number,
          value.deli_time,
          value.deli_status,
          value.min_amount,
          value.description,
          responseData.userId
        );

        // To set restaurant Id to user
        // this.restaurantService.setRestaurantIdtoUser(value.restaurant_email);
      });


    } else {
      this.restaurantService.updateRestaurant(
        this.restaurant._id,
        value.owner_name,
        value.restaurant_name,
        value.restaurant_email,
        value.imagePath,
        value.town,
        value.street,
        value.house_number,
        value.contact_number,
        value.deli_time,
        value.deli_status,
        value.min_amount,
        value.description
      );
    }

    // this.router.navigate(['../restaurants'], {relativeTo: this.route});

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.getRestaurantSubs) {
      this.getRestaurantSubs.unsubscribe();
    }
  }
}
