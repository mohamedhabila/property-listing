import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../model/property';
import { AuthService } from '../services/auth.service';
import { CategoryService } from '../services/category.service';
import { DataSharingService } from '../services/data-sharing.service';
import { LocationService } from '../services/location.service';
import { PropertyService } from '../services/property.service';
import { Image } from '../model/image';
import { Enquiry } from '../model/enquiry';
import { EnquiryService } from '../services/enquiry.service';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  sliderValue: number = 1;
  enquiry: Enquiry;
  errorFlag: Boolean = false;
  successFlag: Boolean = false;

  constructor(public auth: AuthService,
    public locationService: LocationService,
    public categoryService: CategoryService,
    public propService: PropertyService,
    public dataSharing: DataSharingService,
    public enquiryService : EnquiryService,
    public route: ActivatedRoute,
    public router: Router) { 
      this.enquiry = new Enquiry();
    }



  ngOnInit(): void {
    this.propService.property = new Property();
    this.dataSharing.propertyFlag = true;
    this.sliderValue = 1;
    this.setProperty();

  }

  setProperty() {
    const propertyId = Number(this.route.snapshot.paramMap.get('propertyId'));
    this.propService.getPropertyById(propertyId).subscribe((data: Property) => { this.propService.property = data });
  }

  sendBuyEnquiry(enquiryForm: any) {
    this.successFlag = false;
    this.errorFlag = false;
    if (this.isValidEnquiry()) {
      this.enquiryService.sendEnquiry(this.enquiry).subscribe({
        next: value => {
          if (value) {
            this.enquiry = new Enquiry();
            enquiryForm.form.markAsPristine();
            this.successFlag = true;
          } else {
            this.errorFlag = true;
          }
        },
        error: err => this.errorFlag = true
      });
    } else {
      this.errorFlag = true;
    }
  }

  isValidEnquiry() : Boolean {
    return this.enquiry.numberOfShares <= this.propService.property.remShares;
  }
  formatPrice(price: number) : string{
    return price.toLocaleString(undefined, {
        style: 'currency',
        currency: 'EGP',
        maximumFractionDigits: 0
    });
  }

  onSliderChange(event: any) {
    this.sliderValue = event.target.value;
    console.log(this.sliderValue);
  }

  computeDashArray(value: number): string {
    const circumference = 2 * Math.PI * 45;
    const dashArray = (value / this.propService.property.remShares) * circumference;
    return `${dashArray} ${circumference}`;
  }

}
