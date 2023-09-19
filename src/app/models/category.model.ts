import {CategoryService} from "../services/category.service";

export class CategoryModel {

  public static fromJson(json: Object): CategoryModel {
    return new CategoryModel(
      json['name'],
      json['id']
    );
  }
  constructor(
    public name: string = null,
    public id?: number
  ) {
  }
}
