import { Component, OnInit } from '@angular/core';
import { CardImageComponent } from "../../shared/components/card-image/card-image.component";
import { IImage } from '../../shared/interfaces/utils.interfaces';
import { ImagesService } from '../../shared/services/images.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-images-page',
  standalone: true,
  imports: [CommonModule, CardImageComponent],
  templateUrl: './images-page.component.html',
  styleUrl: './images-page.component.scss'
})
export class ImagesPageComponent implements OnInit {

  images: IImage[] = []
  displayedImages: IImage[] = [];
  itemsPerPage = 8; // Número de imágenes que se cargan por clic.
  loading = false; // Para mostrar el Skeleton.

  constructor(private imagesService: ImagesService) {}

  ngOnInit(): void {
    this.getAllImages()
  }

  getAllImages = () => {
    try {
      this.loading = true;
      this.imagesService.getAllImages().subscribe({
        next: (response) => {
          this.images = response.data;
          this.loadMoreImages();
        },
        error: (error) => {
          throw new Error(error);
        },
        complete: () => {
          this.loading = false;
        },
      });

    } catch (error) {
      this.loading = false;
      console.log(error);
    }
  };

  loadMoreImages() {
    const currentLength = this.displayedImages.length;
    const newItems = this.images.slice(
      currentLength,
      currentLength + this.itemsPerPage
    );
    this.displayedImages = [...this.displayedImages, ...newItems];
  }

}
