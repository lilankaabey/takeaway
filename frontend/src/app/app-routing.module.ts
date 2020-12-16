import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HomeComponent } from './customer/home/home.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { FoodsComponent } from './admin/foods/foods.component';
import { FoodListComponent } from './admin/foods/food-list/food-list.component';
import { FoodEditComponent } from './admin/foods/food-edit/food-edit.component';
import { FoodDetailComponent } from './admin/foods/food-detail/food-detail.component';
import { RestaurantsListComponent } from './restaurants-list/restaurants-list.component';


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
        path: 'search-reasult',
        component: RestaurantsListComponent
      }
    ]
  },
  {
    path: 'restaurant',
    component: AdminLayoutComponent,
    children: [
        {
          path: '',
          component: DashboardComponent
        },
        {
          path: 'foods',
          component: FoodsComponent,
          children: [
            {
              path: '',
              component: FoodListComponent
            },
            {
              path: 'additem',
              component: FoodEditComponent
            },
            {
              path: ':id',
              component: FoodDetailComponent
            },
            {
              path: ':id/edit',
              component: FoodEditComponent
            }
          ]
        }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
