import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './customer/home/home.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { RestaurantsListComponent } from './restaurants/restaurants-list/restaurants-list.component';
import { RestaurantInfoComponent } from './restaurants/restaurant-info/restaurant-info.component';
import { EditRestaurantComponent } from './restaurants/edit-restaurant/edit-restaurant.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { ProductInfoComponent } from './products/product-info/product-info.component';
import { AuthGuard } from './auth/auth-guard';
import { CustomerProductsViewComponent } from './customers/customer-products-view/customer-products-view.component';
import { CustomerOrderFormComponent } from './customers/customer-order-form/customer-order-form.component';
import { OrderConfirmComponent } from './customers/order-confirm/order-confirm.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'search/:location',
        component: RestaurantsListComponent
      },
      {
        path: 'products/:restaurantId',
        component: CustomerProductsViewComponent
      },
      {
        path: 'order',
        component: CustomerProductsViewComponent
      },
      {
        path: 'order-confirmed/:orderId',
        component: OrderConfirmComponent
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
        {
          path: '',
          component: DashboardComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'restaurants',
          component: RestaurantsListComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'restaurant/add',
          component: EditRestaurantComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'restaurant/:restaurantId',
          component: RestaurantInfoComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'restaurant/edit/:restaurantId',
          component: EditRestaurantComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'signup',
          component: SignupComponent
        },
        {
          path: 'login',
          component: LoginComponent
        }
      ]
  },
  {
    path: 'system',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'products',
        component: ProductsListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'product/add',
        component: EditProductComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'product/:productId',
        component: ProductInfoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'product/edit/:productId',
        component: EditProductComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profile/:restaurantId',
        component: RestaurantInfoComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'profile/edit/:restaurantId',
        component: EditRestaurantComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  },
  // {
  //   path: 'not-found',
  //   component: PageNotFoundComponent
  // },
  // {
  //   path: '**',
  //   redirectTo: '/not-found'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
