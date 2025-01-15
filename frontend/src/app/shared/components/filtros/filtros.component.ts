import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { IRangeDate } from '../../interfaces/utils.interfaces';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-filtros',
  imports: [FormsModule],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.scss',
})
export class FiltrosComponent implements OnInit {
  // data ranges
  startDate: string = '2025-01-01';
  startTime: string = '00:00';
  endDate: string = '';
  endTime: string = '';

  range?: IRangeDate

  constructor(
    private communicationService: CommunicationService
  ) {}

  ngOnInit(): void {
  }

  sendForm = () => {

    this.startDate = (
      document.getElementById('startDate') as HTMLInputElement
    ).value;
    this.endDate = (
      document.getElementById('endDate') as HTMLInputElement
    ).value;

    // Si no hay fecha de fin, la asignamos a la fecha actual
    if (!this.endDate) {
      this.endDate = new Date().toISOString().split('T')[0]; // Asigna la fecha de hoy
    }

    // Si no hay hora de fin, la asignamos a la hora actual
    if (!this.endTime) {
      this.endTime = new Date().toISOString().split('T')[1].split('.')[0]; // Asigna la hora actual
    }

    const startDateTime = `${this.startDate}T${this.startTime}`;
    const endDateTime = `${this.endDate}T${this.endTime}`;
    const range: IRangeDate = {
      startDate: startDateTime,
      endDate: endDateTime,
    };
    
    this.communicationService.updateRange(range);
  };

  cleanFilters(): void {
    this.startDate = '2025-01-01';
    this.startTime = '00:00';
    this.endDate = `${new Date().toISOString().split('T')[0]}`;
    this.endTime = `${new Date().toISOString().split('T')[1].split('.')[0]}`;
    
    const startDateTime = `${this.startDate}T${this.startTime}`;
    const endDateTime = `${this.endDate}T${this.endTime}`;
    const range: IRangeDate = {
      startDate: startDateTime,
      endDate: endDateTime,
    };
    
    this.communicationService.updateRange(range);
  }

  // changeInput($event: Event){
  //   console.log("ey maniii")
  //   if(($event.target as HTMLInputElement).id == "startDate") this.startDate = ($event.target as HTMLInputElement).value
  //   if(($event.target as HTMLInputElement).id == "endDate") this.endDate = ($event.target as HTMLInputElement).value
  //   console.log("this.startDate", this.startDate)
  //   console.log("this.endDate", this.endDate)
  // }
}
