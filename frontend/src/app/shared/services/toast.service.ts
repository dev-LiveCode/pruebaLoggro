import { Injectable } from '@angular/core';
import { IToast } from '../interfaces/utils.interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastSubject = new BehaviorSubject<IToast | null>(null);

  toast$ = this.toastSubject.asObservable();

  constructor(){}

  showToast(message: string, type: 'success' | 'error' | 'info' | 'warning') {
    this.toastSubject.next({ message, type });

    // Hide after 5 seconds
    setTimeout(() => this.hideToast(), 6000);
  }

  hideToast() {
    this.toastSubject.next(null);
  }
}
