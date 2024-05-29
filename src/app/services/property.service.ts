import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Property } from '../model/property';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  properties: Property[];
  private baseUrl = environment.apiUrl;

  property: Property = new Property();

  constructor(public http: HttpClient) {
    this.properties = [];
  }

  getPropertyById(id: number) {
    return this.http.get<any>('${this.baseUrl}/property/' + id);
  }

  getPropertiesAll() {
    return this.http.get<any[]>('${this.baseUrl}/propertyall/');
  }

  getPropertiesByLocation(locationId: number) {
    return this.http.get<any[]>(
      '${this.baseUrl}/propertybylocation/' + locationId,
    );
  }

  getPropertiesByCategory(categoryId: number) {
    return this.http.get<any[]>(
      '${this.baseUrl}/propertybycategory/' + categoryId,
    );
  }

  getPropertiesByName(name: string) {
    return this.http.get<any[]>('${this.baseUrl}/propertybyname/' + name);
  }

  getPropertiesByListFor(listFor: string) {
    return this.http.get<any[]>(
      '${this.baseUrl}/propertybylisttype/' + listFor,
    );
  }

  getPropertiesByFiltering(formData: any) {
    let locationId = formData.cities;
    let categoryId = formData.categories;
    let sortBy = formData.sortBy;
    let listFor = formData.listFor;

    let params = new HttpParams()
      .set('locationId', locationId)
      .set('categoryId', categoryId)
      .set('listFor', listFor)
      .set('sortBy', sortBy);

    return this.http.get<any[]>('${this.baseUrl}/propertybyfiltering', {
      params,
    });
  }

  getPropertyReviews(propId: number) {
    return this.http.get<any[]>('${this.baseUrl}/propertyreview/' + propId);
  }
}
