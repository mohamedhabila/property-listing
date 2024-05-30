import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  currentUser: User;
  private baseUrl = environment.apiUrl;

  constructor(
    public http: HttpClient,
    public router: Router,
  ) {
    this.currentUser = new User();
  }

  signUp(user: any) {
    return this.http.post<User>(`${this.baseUrl}/signup`, user);
  }

  signIn(user: any) {
    return this.http.post<User>(`${this.baseUrl}/login`, user);
  }

  signOut() {
    this.currentUser = new User();
  }
}
