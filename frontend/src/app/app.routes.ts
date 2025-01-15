import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ImagesPageComponent } from './pages/images-page/images-page.component';
import { GraphicsPageComponent } from './pages/graphics-page/graphics-page.component';
import { AboutPageComponent } from './pages/about-page/about-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent},
    { path: 'images', component: ImagesPageComponent},
    { path: 'about', component: AboutPageComponent},
    { path: 'graphics', component: GraphicsPageComponent},
    { path: '**', redirectTo: ''}
];
