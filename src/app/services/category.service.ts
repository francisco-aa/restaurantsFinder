import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RestaurantModel} from "../models/restaurant.model";
import {map} from "rxjs/operators";
import {CategoryModel} from "../models/category.model";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  urlBase = environment.urlBase + '/categories';
  constructor(private http: HttpClient) { }

  getAll(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.urlBase).pipe(
      map(
        (jsonArray: Object[]) => jsonArray.map(jsonItem => CategoryModel.fromJson(jsonItem))
      )
    );
  }

  post(item): Observable<CategoryModel> {
    return this.http.post(this.urlBase, item)
      .pipe(
        map(a => CategoryModel.fromJson(a))
      )
  };

  put(item): Observable<CategoryModel> {
    return this.http.put(this.urlBase + '/' + item.id, item)
      .pipe(
        map(a => CategoryModel.fromJson(a))
      )
  }

  delete(item): Observable<CategoryModel> {
    return this.http.delete(this.urlBase + '/' + item.id)
      .pipe(
        map(a => CategoryModel.fromJson(a))
      )
  }
}
