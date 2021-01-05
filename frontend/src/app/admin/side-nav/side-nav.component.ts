import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { ProductService } from 'src/app/products/product.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  isAdminLogedIn: boolean;

  restaurantId: string;

  constructor(
    private authService: AuthService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isAdminLogedIn = (this.authService.getUserType() === 'admin') ? true : false;
    this.restaurantId = this.authService.getRestaurantId();
    console.log(this.restaurantId);
  }
  ////////////////////
  // System Area//////
  onViewProfile() {
    this.restaurantId = this.authService.getRestaurantId();
    this.router.navigate(['system/profile/', this.restaurantId]);
    console.log(this.restaurantId);
  }

  onEditProfile() {
    this.restaurantId = this.authService.getRestaurantId();
    this.router.navigate(['/profile/edit', this.restaurantId]);
  }


  //// End System Area ////

}
