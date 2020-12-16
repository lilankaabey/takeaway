import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
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
import { FoodsComponent } from './admin/foods/foods.component';
import { FoodListComponent } from './admin/foods/food-list/food-list.component';
import { FoodItemComponent } from './admin/foods/food-item/food-item.component';
import { FoodEditComponent } from './admin/foods/food-edit/food-edit.component';
import { FoodDetailComponent } from './admin/foods/food-detail/food-detail.component';
import { HeaderContainerComponent } from './customer/header/header-container/header-container.component';
import { HeaderSubComponent } from './customer/header/header-sub/header-sub.component';
import { HeaderTopComponent } from './customer/header/header-top/header-top.component';
import { TopbarComponent } from './customer/header/topbar/topbar.component';
import { FormsModule } from '@angular/forms';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { RestaurantsListComponent } from './restaurants-list/restaurants-list.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductComponent } from './product/product.component';
import { ProductInfoComponent } from './product-info/product-info.component';
import { RestaurantInfoComponent } from './restaurant-info/restaurant-info.component';

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
    FoodsComponent,
    FoodListComponent,
    FoodItemComponent,
    FoodEditComponent,
    FoodDetailComponent,
    HeaderContainerComponent,
    HeaderSubComponent,
    HeaderTopComponent,
    TopbarComponent,
    RestaurantComponent,
    RestaurantsListComponent,
    ProductsListComponent,
    ProductComponent,
    ProductInfoComponent,
    RestaurantInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
