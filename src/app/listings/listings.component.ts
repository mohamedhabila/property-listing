import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../model/property';
import { AuthService } from '../services/auth.service';
import { CategoryService } from '../services/category.service';
import { DataSharingService } from '../services/data-sharing.service';
import { LocationService } from '../services/location.service';
import { PropertyService } from '../services/property.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styleUrls: ['./listings.component.css']
})
export class ListingsComponent implements OnInit {

  propName: string = '';

  constructor(public locationService: LocationService,
    public categoryService: CategoryService,
    public propService: PropertyService,
    public dataSharing: DataSharingService,
    public auth: AuthService,
    public route: ActivatedRoute,
    public router: Router) {
  }

  searchByName(searchForm: any) {
    let name = searchForm.value.propName;
    this.router.navigateByUrl("/listingsbyname/" + name);
  }

  ngOnInit(): void {

    this.dataSharing.homeFlag = false;
    this.dataSharing.listingFlag = true;
    this.dataSharing.bookingsFlag = false;
    this.dataSharing.propertyFlag = false;
    this.dataSharing.signinFlag = false;
    this.dataSharing.signupFlag = false;
    this.dataSharing.wishlistFlag = false;

    this.propService.properties =[];
    this.propService.getPropertiesByFiltering(this.dataSharing.formData).subscribe((data: Property[]) => { this.propService.properties = data });

  }

  formatPrice(price: number) : string{
    return price.toLocaleString(undefined, {
        style: 'currency',
        currency: 'EGP',
        maximumFractionDigits: 0
    });
  }

  buildCaption(url : string) : string {
    // Use URL constructor to handle the URL
    const urlObject = new URL(url);

    // Get the pathname from the URL (e.g., "/imagename.jpeg")
    const pathname = urlObject.pathname;

    // Split the pathname by '/' and get the last part
    const fullImageName = pathname.substring(pathname.lastIndexOf('/') + 1);

    // Split the full image name by '.' and remove the last part (the extension)
    const imageNameWithoutExtension = fullImageName.split('.').slice(0, -1).join('.');

    return imageNameWithoutExtension;
  }
}
