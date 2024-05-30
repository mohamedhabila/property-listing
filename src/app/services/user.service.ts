import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  reviews: string[][];
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.reviews = [];
  }

  setWebsiteReviews() {
    this.http
      .get<string[][]>(`${this.baseUrl}/websitereviews`)
      .subscribe((data: string[][]) => {
        this.reviews = data;
      });
  }
}
