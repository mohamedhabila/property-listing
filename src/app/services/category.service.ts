import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../model/category';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categories: Category[];
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.categories = [];
  }

  setCategories() {
    this.http
      .get<Category[]>('${this.baseUrl}/categories')
      .subscribe((data: Category[]) => {
        this.categories = data;
      });
  }
}
