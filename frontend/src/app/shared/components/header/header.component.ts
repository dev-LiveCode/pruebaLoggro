import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IMenu } from '../../interfaces/utils.interfaces';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  visible: boolean = false;

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
  
  changeTheme(){
    // document.body.classList.toggle('dark');
    // this.logo = this.isDark ? './assets/img/logo-light.png' : './assets/img/logo-dark.png'

    this.themeService.toggleTheme();
  }

}
