import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RestaurantModel} from "../models/restaurant.model";
import {map} from "rxjs/operators";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {
  urlBase = environment.urlBase + '/restaurants';

  constructor(private http: HttpClient) { }

  getAll(): Observable<RestaurantModel[]> {
    return this.http.get<RestaurantModel[]>(this.urlBase).pipe(
      map(
        (jsonArray: Object[]) => jsonArray.map(jsonItem => RestaurantModel.fromJson(jsonItem))
      )
    );
  }

  get(id): Observable<RestaurantModel> {
    return this.http.get<RestaurantModel>(this.urlBase + '/' + id)
      .pipe(
        map(
          a => RestaurantModel.fromJson(a)
        )
      );
  }

  update(item): Observable<RestaurantModel> {
    if (item?.id) {
      return this.http.put(this.urlBase + '/' + item.id, item)
        .pipe(
          map(a => RestaurantModel.fromJson(a))
        )
    } else {
      return this.http.post(this.urlBase, item)
        .pipe(
          map(a => RestaurantModel.fromJson(a))
        )
    }
  }
  delete(item) {
    return this.http.delete(this.urlBase + '/' + item.id);
  }
}
