import { Component, Input } from '@angular/core';
import { IImage } from '../../interfaces/utils.interfaces';

@Component({
  selector: 'app-card-image',
  imports: [],
  templateUrl: './card-image.component.html',
  styleUrl: './card-image.component.scss'
})
export class CardImageComponent {

  @Input() image?: IImage;

}
