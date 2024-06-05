import { Component, Input, ElementRef, HostListener } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { Image } from '../model/image';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  @Input() images: Image[] = [];
  currentSlideIndex: number = 0;
  private startX: number = 0;

  constructor(private _lightbox: Lightbox, private el: ElementRef) {}

  openLightbox(index: number): void {
    const album = this.images.map(image => ({ src: image.imageurl, caption: this.buildCaption(image.imageurl), thumb: image.imageurl }));
    this._lightbox.open(album, index);
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
  ngAfterViewInit(): void {
    const carouselElement = document.getElementById('carouselExampleIndicators');
    if (carouselElement) {
      carouselElement.addEventListener('slid.bs.carousel', () => {
        this.currentSlideIndex = this.getActiveIndex();
      });
    }
  }

  getActiveIndex(): number {
    const activeElement = document.querySelector('.carousel-item.active');
    if (activeElement) {
      return Array.from(activeElement.parentElement!.children).indexOf(activeElement);
    }
    return 0;
  }

  closeLightbox(): void {
    this._lightbox.close();
  }

  navigate(event: Event, direction: number): void {
    event.preventDefault();
    const activeElement = document.querySelector('.carousel-item.active');
    if (activeElement) {
      let newActiveElement;
      if (direction === -1) {
        newActiveElement = activeElement.previousElementSibling || activeElement.parentElement?.lastElementChild;
      } else {
        newActiveElement = activeElement.nextElementSibling || activeElement.parentElement?.firstElementChild;
      }
      if (newActiveElement) {
        activeElement.classList.remove('active');
        newActiveElement.classList.add('active');
        this.currentSlideIndex = this.getActiveIndex();
      }
    }
  }
  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.startX = event.touches[0].clientX;
  }

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (!this.startX) {
      return;
    }

    const currentX = event.touches[0].clientX;
    const diffX = this.startX - currentX;

    if (diffX > 50) {
      // Swiped left
      this.navigate(this.el.nativeElement.Event, 1);
    } else if (diffX < -50) {
      // Swiped right
      this.navigate(this.el.nativeElement.Event, -1);
    }

    this.startX = 0;
  }
}
