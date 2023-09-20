import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {RestaurantService} from "../../services/restaurant.service";
import {RestaurantModel} from "../../models/restaurant.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CategoryService} from "../../services/category.service";
import {CategoryModel} from "../../models/category.model";
import {Location} from "@angular/common";

@Component({
  selector: 'app-category-update',
  templateUrl: './category-update.component.html',
  styleUrls: ['./category-update.component.scss']
})
export class CategoryUpdateComponent implements OnInit {
  categoryForm: FormGroup;
  categort: CategoryModel;
  loading = false;
  submitted = false;
  title: any;
  category: CategoryModel;

  constructor(private categoryService: CategoryService,
              private fb: FormBuilder,
              private cdr: ChangeDetectorRef,
              private router: Router,
              public route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      'name': new FormControl(undefined, Validators.required),
    });

    console.log('route', this.route.snapshot.routeConfig.path)

    if (this.route.snapshot.routeConfig.path === 'category/new') {
      this.title = 'New category'
      this.category = new CategoryModel();
    } else {
      this.title = 'Update category'
      const id = +this.route.snapshot.paramMap.get('id');
      this.loadCategory(id);
    }
  }

  get controls() {
    return this.categoryForm.controls;
  }

  setcontrols() {
    this.categoryForm.patchValue({
      name: this.category.name,
    });
  }

  loadCategory(id) {
    this.loading = true;
    this.categoryService.get(id)
      .subscribe(
        c => {
          this.category = c;
          this.setcontrols();
          this.loading = false;
          this.cdr.detectChanges();
        },
        error => {
          this.loading = false;
          this.cdr.detectChanges();
        });
  }

  onSubmit() {
    this.loading = true;
    this.submitted = true;

    // stop here if form is invalid
    if (this.categoryForm.invalid) {
      this.loading = false;
      return;
    }

    this.category.name = this.controls.name.value;

    console.log('CATEGORIE', this.category)
    this.categoryService.update(this.category)
      .subscribe(
        c => {
          this.category = c;
          this.loading = false;
          this.router.navigate(['list']);
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

  locationBack() {
    this.location.back();
  }
}
