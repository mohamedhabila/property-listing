import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Enquiry } from '../model/enquiry';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnquiryService {
  private baseUrl = environment.apiUrl;

  constructor(public http: HttpClient) {}

  sendEnquiry(enquiry: Enquiry) {
    return this.http.post<Enquiry>(`${this.baseUrl}/enquiry`, enquiry);
  }
}
