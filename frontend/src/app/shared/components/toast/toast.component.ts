import { Component } from '@angular/core';

import { trigger, transition, style, animate } from '@angular/animations';
import { IToast } from '../../interfaces/utils.interfaces';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  animations: [
    trigger('toastAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('300ms ease-out', style({ opacity: 0.5, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class ToastComponent {
  toast: IToast | null = null;

  constructor(private toastService: ToastService) {
    this.toastService.toast$.subscribe((toast) => {
      this.toast = toast;
    });
  }
}
