import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {RestaurantService} from "../../services/restaurant.service";
import {CategoryService} from "../../services/category.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})

export class RestaurantListComponent implements OnInit {
  restaurants: any;
  goldenBalls: any;
  loading = false;
  loadingGoldenBalls = false;


  constructor(private restaurantService: RestaurantService,
              private router: Router,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.loadRestaurants();
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

  updateRestaurant(restaurant) {
    this.router.navigate(['/update/' + restaurant.id])
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
}
