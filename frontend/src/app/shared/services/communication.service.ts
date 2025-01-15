import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IRangeDate } from '../interfaces/utils.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CommunicationService {
  private reloadSubject = new Subject<void>();
  private rangeSubject = new Subject<IRangeDate>();

  // Observable al que otros componentes pueden suscribirse
  reload$ = this.reloadSubject.asObservable();
  range$ = this.rangeSubject.asObservable();

  // Método para emitir el evento
  triggerReload() {
    this.reloadSubject.next();
  }

  updateRange(range: IRangeDate) {
    this.rangeSubject.next(range);
  }
}