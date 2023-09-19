import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { RestaurantRoutingModule } from "./restaurant-routing.module";
import {RestaurantListComponent} from "./restaurant-list/restaurant-list.component";
import { RestaurantUpdateComponent} from "./restaurant-update/restaurant-update.component";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbRatingModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../shared/shared.module";
import {NgSelectModule} from "@ng-select/ng-select";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RestaurantRoutingModule,
    SharedModule,
    NgSelectModule,
  ],
  exports: [],
  declarations: [
    RestaurantListComponent,
    RestaurantUpdateComponent,
  ],
  providers: [],
})
export class RestaurantModule { }
