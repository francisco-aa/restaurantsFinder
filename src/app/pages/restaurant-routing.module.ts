import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestaurantListComponent} from "./restaurant-list/restaurant-list.component";
import {RestaurantUpdateComponent} from "./restaurant-update/restaurant-update.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "../shared/auth/auth-guard.service";
import {CategoryUpdateComponent} from "./categorie-update/category-update.component";

const routes: Routes = [
  {
    path: 'list',
    component: RestaurantListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'new',
    component: RestaurantUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'update/:id',
    component: RestaurantUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'category/new',
    component: CategoryUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'category/update/:id',
    component: CategoryUpdateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RestaurantRoutingModule { }
