import {CategoryService} from "../services/category.service";
import {CategoryModel} from "./category.model";

export class RestaurantModel {

  public static fromJson(json: Object): RestaurantModel {
    return new RestaurantModel(
      json['name'],
      json['address'],
      json['city'],
      json['category'],
      json['rating'],
      json['id'],
    );
  }
  constructor(
    public name: string = null,
    public address: string = null,
    public city: string = null,
    public category: CategoryModel = null,
    public rating: string = null,
    public id?: number,
  ) {
  }
}
