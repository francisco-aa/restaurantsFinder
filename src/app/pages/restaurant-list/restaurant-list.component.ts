import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RestaurantService} from "../../services/restaurant.service";
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";
import {CoreConfigService} from "../../../@core/services/config.service";


@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})

export class RestaurantListComponent implements OnInit {
  restaurants: any;
  categories: any;
  loading = false;
  loadingCategories = false;


  constructor(private restaurantService: RestaurantService,
              private categoryService: CategoryService,
              private router: Router,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadRestaurants();
    this.loadCategories();
  }

  loadRestaurants() {
    this.loading = true;
    this.restaurantService.getAll()
      .subscribe(r => {
        this.restaurants = r;
        this.loading = false;
        this.cdr.detectChanges()
      })
  }

  loadCategories() {
    this.loadingCategories = true;
    this.categoryService.getAll()
      .subscribe(c => {
          this.categories = c;
          this.loadingCategories = false;
          this.cdr.detectChanges();
        },
        error => {
          this.loading = false;
          this.cdr.detectChanges();
        }
      )
  }

  updateRestaurant(restaurant) {
    this.router.navigate(['/update/' + restaurant.id])
  }

  updateCategory(category) {
    this.router.navigate(['category/update/' + category.id])
  }

  deleteRestaurant(restaurant) {
    this.loading = true;
    this.restaurantService.delete(restaurant)
      .subscribe(() => {
        this.loading = false;
        this.cdr.detectChanges();
        this.loadRestaurants();
      }, error => {
        this.loading = false;
        this.cdr.detectChanges();
      })
  }

  deleteCategory(category) {
    this.loading = true;
    this.categoryService.delete(category)
      .subscribe(() => {
        this.loading = false;
        this.cdr.detectChanges();
        this.loadCategories();
      }, error => {
        this.loading = false;
        this.cdr.detectChanges();
      })
  }

  addRestaurant() {
    this.router.navigate(['new'])
  }

  addCategory() {
    this.router.navigate(['category/new'])
  }
}
