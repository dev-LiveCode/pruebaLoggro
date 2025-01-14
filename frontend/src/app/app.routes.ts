import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ImagesPageComponent } from './pages/images-page/images-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent},
    { path: 'images', component: ImagesPageComponent},
    { path: '**', redirectTo: ''}
];
