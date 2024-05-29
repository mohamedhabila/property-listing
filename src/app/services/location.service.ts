import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Location } from '../model/location';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  locations: Location[];
  private baseUrl = environment.apiUrl;

  constructor(public http: HttpClient) {
    this.locations = [];
  }

  setLocations() {
    this.http
      .get<Location[]>('${this.baseUrl}/cities')
      .subscribe((data: Location[]) => {
        this.locations = data;
      });
  }
}
