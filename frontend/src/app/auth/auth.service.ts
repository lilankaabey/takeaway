import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from './user.model';

@Injectable()
export class AuthService {

  private token: string;
  private userId: string;
  private userType: string;
  private restaurantId: string;
  private customerId: string;
  private tokenTimer: any;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getToken() {
    return this.token;
  }

  getUserId() {
    return this.userId;
  }

  getCustomerId() {
    return this.customerId;
  }

  getRestaurantId() {
    return this.restaurantId;
  }

  getUserType() {
    return this.userType;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  //////////////////////////////////
  //////// SignUp function /////////
  //////////////////////////////////

  signupUser(email: string, password: string, userType: string) {
    const user: User = { email: email, password: password, userType: userType};
    return this.http.put<{message: string, userId: string}>('http://localhost:3000/auth/signup', user);

  }

  //// End - SignUp Function /////


  /////////////////////////////
  //// logIn function /////////
  /////////////////////////////

  loginUser(email: string, password: string, userType: string) {
    const user: User = { email: email, password: password, userType: userType};
    this.http.post<{token: string, userId: string, userType: string, expiresIn: number, customerId?: string, restaurantId?: string}>('http://localhost:3000/auth/login', user)
      .subscribe(responseData => {
        this.token = responseData.token;
        if (this.token) {
          const userId  = responseData.userId;
          this.userId = userId;
          const userType = responseData.userType;
          this.userType = userType;
          const expiresInDuration = responseData.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);

          // To save authentication data in browser local storage
          // calculate expiration date
          const now = new Date();
          const expirationDate =  new Date(now.getTime() + expiresInDuration * 1000);


          // If userType === restaurant
          if (userType === 'restaurant') {
            this.saveAuthData(this.token, expirationDate, userType, responseData.restaurantId);

          } else if (userType === 'customer') {
            this.saveAuthData(this.token,  expirationDate, userType, responseData.customerId )
          } else {
            this.saveAuthData(this.token, expirationDate, userType);
          }

          // To Navigate the page
          if (this.userType === 'admin') {
            this.router.navigate(['admin']);
          } else if (this.userType === 'restaurant') {
            this.router.navigate(['system']);
          }
        }
      });
  }

  ////// End - logIn function ////////


  ////////////////////////////////////////////////////////////////////////////////////
  ///// get the auth details and provide for auto authentication by keeping status ///
  ////////////////////////////////////////////////////////////////////////////////////

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() -  now.getTime();

    // If the user has enough time before expiring the token
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userType = authInformation.userType;
      this.restaurantId = (authInformation.restaurantId) ? authInformation.restaurantId : null;
      this.customerId = (authInformation.customerId) ? authInformation.customerId : null;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next();
    }
  }

  ////////////////////////////////////// End //////////////////////////////////////

  /////////////////////////////
  //// logout function ////////
  /////////////////////////////

  logoutUser() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    // To clear expiration token time
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    if (this.userType === 'admin') {
      this.router.navigate(['admin/login']);
    } else if (this.userType === 'restaurant') {
      this.router.navigate(['system/login']);
    }
  }

  /////////////////////////////////////////
  /// Function for expiration the token ///
  /////////////////////////////////////////

  private setAuthTimer(expiresInDuration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logoutUser();
    }, expiresInDuration * 1000);
  }

  /// End - Function for expiration the token /////



  private saveAuthData(token: string, expirationDate: Date, userType: string, restOrCustoId?: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userType', userType);
    if (userType === 'restaurant') {
      localStorage.setItem('restaurantId', restOrCustoId);
    } else if (userType === 'customer') {
      localStorage.setItem('customerId',  restOrCustoId);
    }
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userType');
    if (localStorage.getItem('restaurantId')) {
      localStorage.removeItem('restaurantId');
    } else if (localStorage.getItem('customerId')) {
      localStorage.removeItem('customerId');
    }
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userType = localStorage.getItem('userType');
    let restaurantId: string;
    let customerId: string;
    if (localStorage.getItem('restaurantId')) {
      restaurantId = localStorage.getItem('restaurantId');
    } else if (localStorage.getItem('customerId')) {
      customerId = localStorage.getItem('customerId');
    }
    if (!token || !expirationDate || !userType) {
      return;
    }
    if (userType === 'admin') {
      return {
        token: token,
        expirationDate: new Date(expirationDate),
        userType: userType,
      };
    } else if (userType === 'restaurant') {
      return {
        token: token,
        expirationDate: new Date(expirationDate),
        userType: userType,
        restaurantId: restaurantId
      };
    } else if (userType === 'customer' && customerId) {
      return {
        token: token,
        expirationDate: new Date(expirationDate),
        userType: userType,
        customerId: customerId
      };
    }

  }
}
