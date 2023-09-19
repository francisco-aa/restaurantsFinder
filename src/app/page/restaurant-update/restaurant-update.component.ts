import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RestaurantService} from "../../services/restaurant.service";
import {RestaurantModel} from "../../models/restaurant.model";
import {NgbToast} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {CategoryModel} from "../../models/category.model";

@Component({
  selector: 'app-restaurant-update',
  templateUrl: './restaurant-update.component.html',
  styleUrls: ['./restaurant-update.component.scss']
})
export class RestaurantUpdateComponent implements OnInit {
  restaurantForm: FormGroup;
  restaurant: any;
  categories: CategoryModel[];
  loading = false;
  loadingCategories = false;
  submitted = false;
  title: any;

  constructor(private restaurantService: RestaurantService,
              private categoryService: CategoryService,
              private fb: FormBuilder,
              private cdr: ChangeDetectorRef,
              private router: Router,
              public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.restaurantForm = this.fb.group({
      'name': new FormControl(undefined, Validators.required),
      'address': new FormControl(undefined, Validators.required),
      'city': new FormControl(undefined, Validators.required),
      'category': new FormControl(undefined, Validators.required),
      'rating': new FormControl(undefined, Validators.required),
    });

    if (this.route.snapshot.routeConfig.path === 'new') {
      this.title = 'Ajouter restaurant'
      this.restaurant = new RestaurantModel();
      this.setcontrols();
    } else {
      this.title = 'Mise à jour restaurant'
      const id = +this.route.snapshot.paramMap.get('id');
      this.loadRestaurant(id);
    }
    this.loadCategories();
  }

  get controls() {
    return this.restaurantForm.controls;
  }

  setcontrols() {
    this.restaurantForm.patchValue({
      name: this.restaurant.name,
      address: this.restaurant.address,
      city: this.restaurant.city,
      category: this.restaurant.category,
      rating: this.restaurant.rating,
    });
  }

  loadRestaurant(id) {
    this.loading = true;
    this.restaurantService.get(id)
      .subscribe(
        r => {
          this.restaurant = r;
          this.setcontrols();
          this.loading = false;
          this.cdr.detectChanges();
        },
        error => {
          this.loading = false;
          this.cdr.detectChanges();
        });
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

  onSubmit() {
    this.loading = true;
    this.submitted = true;

    // stop here if form is invalid
    if (this.restaurantForm.invalid) {
      return;
    }

    this.restaurant = {
      name: this.controls.name.value,
      address: this.controls.address.value,
      city: this.controls.city.value,
      categoryId: this.controls.category.value,
      rating: this.controls.category.value
    }

    this.restaurantService.update(this.restaurant)
      .subscribe(
        a => {
          this.restaurant = a;
          this.router.navigate(['/list']);
          this.loading = false;
        },
        error => {
          console.log(error);
          this.loading = false;
        },
        () => {
          this.loading = false;
        }
      );
  }

  deleteRestaurant(restaurant) {
    this.loading = true;
    this.restaurantService.delete(restaurant)
      .subscribe(() => {
        this.loading = false;
        this.cdr.detectChanges();
      }, error => {
        this.loading = false;
        this.cdr.detectChanges();
      })
  }
}
