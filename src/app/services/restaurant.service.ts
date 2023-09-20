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

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.urlBase).pipe(
      map(
        (jsonArray: Object[]) => jsonArray.map(jsonItem => jsonItem)
      )
    );
  }

  get(id): Observable<any> {
    return this.http.get<any>(this.urlBase + '/' + id)
      .pipe(
        map(
          a => a
        )
      );
  }

  update(item): Observable<any> {
    if (item?.id) {
      console.log('ITEM', item)

      return this.http.put(this.urlBase + '/' + item.id, item)
        .pipe(
          map(a => a)
        )
    } else {
      return this.http.post(this.urlBase, item)
        .pipe(
          map(a => a)
        )
    }
  }
  delete(item) {
    return this.http.delete(this.urlBase + '/' + item.id);
  }
}
