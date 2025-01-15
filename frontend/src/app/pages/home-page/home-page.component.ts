import { Component } from '@angular/core';
import { TableComponent } from '../../shared/components/table/table.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {

}
