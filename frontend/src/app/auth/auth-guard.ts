import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor( private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isAuth = this.authService.getIsAuthenticated();
    const userType = this.authService.getUserType();

    if (!isAuth) {
      if (state.url.split('/')[1] === 'admin') {
        this.router.navigate(['admin/login']);
      } else if (state.url.split('/')[1] === 'retaurant') {
        this.router.navigate(['system/login']);
      } else {
        this.router.navigate(['/']);
      }
      // if (userType === 'admin') {
      //   this.router.navigate(['admin/login']);
      // } else if (userType === 'restaurant') {
      //   this.router.navigate(['system/login']);
      // } else if (userType === 'customer') {
      //   this.router.navigate(['/login']);
      // }
    }

    return isAuth;
  }

}
