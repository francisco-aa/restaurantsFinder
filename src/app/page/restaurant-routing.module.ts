import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantListComponent} from "./restaurant-list/restaurant-list.component";
import {RestaurantUpdateComponent} from "./restaurant-update/restaurant-update.component";


const routes: Routes = [
  {
    path: 'list',
    component: RestaurantListComponent,
  },
  {
    path: 'new',
    component: RestaurantUpdateComponent,

  },
  {
    path: 'update/:id',
    component: RestaurantUpdateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantRoutingModule { }
