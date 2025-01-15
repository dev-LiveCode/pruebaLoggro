import { Component } from '@angular/core';
import { IMenu } from '../../interfaces/utils.interfaces';
import { RouterModule } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  logo!: string

  itemsMenu: IMenu[] = [
    {path: 'about', text: 'About'},
    {path: 'projects', text: 'Projects'},
    {path: 'blog', text: 'Blog'}
  ]

  constructor(private themeService: ThemeService) {}
  
  get isDark() {
    return document.body.classList.contains('dark')
  }
  
  ngOnInit(): void {
    // this.logo = this.isDark ? './assets/img/logo-light.png' : './assets/img/logo-dark.png'
    this.themeService.getTheme().subscribe(isDark => {
      this.logo = isDark ? './assets/img/logo-light.png' : './assets/img/logo-dark.png';
    });
  }

}
