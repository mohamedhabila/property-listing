import { Component, Input, HostListener } from '@angular/core';
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

  constructor(private _lightbox: Lightbox) {}

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
        this.currentSlideIndex = 1;
      });
    }
  }

  closeLightbox(): void {
    this._lightbox.close();
  }

  navigate(event: Event, direction: number): void {
    event.preventDefault();
    const activeElement = document.querySelector('.carousel-item.active');
    if (activeElement) {
      let newActiveElement;
      let children = Array.from(activeElement.parentElement!.children);
      console.log(children);
      let nxtIndex = (this.currentSlideIndex + direction + this.images.length)%this.images.length;
      newActiveElement = children[nxtIndex];
      if (newActiveElement) {
        activeElement.classList.remove('active');
        newActiveElement.classList.add('active');
        this.currentSlideIndex = nxtIndex;
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

    if (diffX > 100) {
      // Swiped left
      this.navigate(event, 1);
      this.startX = 0;
    } else if (diffX < -100) {
      // Swiped right
      this.navigate(event, -1);
      this.startX = 0;
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      // Left arrow key pressed
      this.navigate(event, -1);
    } else if (event.key === 'ArrowRight') {
      // Right arrow key pressed
      this.navigate(event, 1);
    }
  }
}
