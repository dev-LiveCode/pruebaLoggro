import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private isDarkTheme = new BehaviorSubject<boolean>(false);

  constructor() {
    // Verifica si el tema actual es oscuro o claro
    this.isDarkTheme.next(document.body.classList.contains('dark'));
  }

  // Cambia el tema
  toggleTheme() {
    const isDark = !document.body.classList.contains('dark');
    document.body.classList.toggle('dark', isDark);
    this.isDarkTheme.next(isDark); // Actualiza el estado del tema
  }

  // Obtiene el estado del tema
  getTheme() {
    return this.isDarkTheme.asObservable();
  }
}
