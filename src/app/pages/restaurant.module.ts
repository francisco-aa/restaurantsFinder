import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RestaurantRoutingModule} from './restaurant-routing.module';
import {RestaurantListComponent} from './restaurant-list/restaurant-list.component';
import {RestaurantUpdateComponent} from './restaurant-update/restaurant-update.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {LoginComponent} from './login/login.component';
import {CategoryUpdateComponent} from './categorie-update/category-update.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RestaurantRoutingModule,
    SharedModule,
  ],
  exports: [],
  declarations: [
    RestaurantListComponent,
    RestaurantUpdateComponent,
    LoginComponent,
    CategoryUpdateComponent
  ],
  providers: [],
})
export class RestaurantModule {
}
