import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../model/property';
import { AuthService } from '../services/auth.service';
import { CategoryService } from '../services/category.service';
import { DataSharingService } from '../services/data-sharing.service';
import { LocationService } from '../services/location.service';
import { PropertyService } from '../services/property.service';
import { Image } from '../model/image';

@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
  reviews: string[]=[];

  constructor(public auth: AuthService,
    public locationService: LocationService,
    public categoryService: CategoryService,
    public propService: PropertyService,
    public dataSharing: DataSharingService,
    public route: ActivatedRoute,
    public router: Router) { }



  ngOnInit(): void {

    this.propService.property = new Property();
    this.setProperty();

  }

  setProperty() {
    const propertyId = Number(this.route.snapshot.paramMap.get('propertyId'));
    let img1 = new Image();
    let img2 = new Image();
    img1.id = 1;
    img1.imageurl = "https://propertystock.s3.eu-central-1.amazonaws.com/chalet_Grand_Hills_1.jpeg";
    img2.id = 2;
    img2.imageurl = "https://propertystock.s3.eu-central-1.amazonaws.com/chalet_Grand_Hills_2.jpeg";
    this.propService.property.images = [img1, img2];
    // this.propService.getPropertyById(propertyId).subscribe((data: Property) => { this.propService.property = data });
    // this.propService.getPropertyReviews(propertyId).subscribe((data: string[]) => { this.reviews = data });
  }

  userReview(reviewForm: any) {
    
  }
  
}
