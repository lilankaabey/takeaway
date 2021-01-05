import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AuthService } from './auth/auth.service';
import { RestaurantService } from './restaurants/restaurant.service';
import { ProductService } from './products/product.service';
import { CustomerService } from './customers/customer.service';
import { CookieService } from 'ngx-cookie-service';

import { AppComponent } from './app.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminFooterComponent } from './admin/admin-footer/admin-footer.component';
import { HeaderComponent } from './customer/header/header.component';
import { FooterComponent } from './customer/footer/footer.component';
import { SideNavComponent } from './admin/side-nav/side-nav.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './customer/home/home.component';
import { HeaderContainerComponent } from './customer/header/header-container/header-container.component';
import { HeaderSubComponent } from './customer/header/header-sub/header-sub.component';
import { HeaderTopComponent } from './customer/header/header-top/header-top.component';
import { TopbarComponent } from './customer/header/topbar/topbar.component';

import { RestaurantComponent } from './restaurants/restaurant/restaurant.component';
import { RestaurantsListComponent } from './restaurants/restaurants-list/restaurants-list.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductComponent } from './products/product/product.component';
import { ProductInfoComponent } from './products/product-info/product-info.component';
import { RestaurantInfoComponent } from './restaurants/restaurant-info/restaurant-info.component';

import { EditRestaurantComponent } from './restaurants/edit-restaurant/edit-restaurant.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { CustomerComponent } from './customers/customer/customer.component';
import { CustomerListComponent } from './customers/customer-list/customer-list.component';
import { OrderComponent } from './orders/order/order.component';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { CartComponent } from './customers/cart/cart.component';
import { CustomerProductsViewComponent } from './customers/customer-products-view/customer-products-view.component';
import { CustomerProductListComponent } from './customers/customer-product-list/customer-product-list.component';
import { CustomerOrderFormComponent } from './customers/customer-order-form/customer-order-form.component';
import { OrderConfirmComponent } from './customers/order-confirm/order-confirm.component';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AdminLayoutComponent,
    AdminHeaderComponent,
    AdminFooterComponent,
    HeaderComponent,
    FooterComponent,
    SideNavComponent,
    DashboardComponent,
    HomeComponent,
    HeaderContainerComponent,
    HeaderSubComponent,
    HeaderTopComponent,
    TopbarComponent,
    RestaurantComponent,
    RestaurantsListComponent,
    ProductsListComponent,
    ProductComponent,
    ProductInfoComponent,
    RestaurantInfoComponent,
    EditRestaurantComponent,
    EditProductComponent,
    PageNotFoundComponent,
    SignupComponent,
    LoginComponent,
    CustomerComponent,
    CustomerListComponent,
    OrderComponent,
    OrderListComponent,
    CartComponent,
    CustomerProductsViewComponent,
    CustomerProductListComponent,
    CustomerOrderFormComponent,
    OrderConfirmComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    AuthService,
    RestaurantService,
    ProductService,
    CustomerService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
