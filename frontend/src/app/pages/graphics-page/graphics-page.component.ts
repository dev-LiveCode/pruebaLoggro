import { Component, OnInit } from '@angular/core';
import { GraphicsBarComponent } from "../../shared/components/graphics-bar/graphics-bar.component";
import { IRangeDate, IStats } from '../../shared/interfaces/utils.interfaces';
import { ImagesService } from '../../shared/services/images.service';
import { CommonModule } from '@angular/common';
import { GraphicsCircleAverageComponent } from "../../shared/components/graphics-circle-average/graphics-circle-average.component";
import { FormsModule } from '@angular/forms';
import { FiltrosComponent } from "../../shared/components/filtros/filtros.component";
import { FormComponent } from "../../shared/components/form/form.component";
import { Modal } from 'flowbite';
import { ToastService } from '../../shared/services/toast.service';
import { CommunicationService } from '../../shared/services/communication.service';

@Component({
  selector: 'app-graphics-page',
  standalone: true,
  imports: [CommonModule, FormsModule, GraphicsBarComponent, GraphicsCircleAverageComponent, FiltrosComponent, FormComponent],
  templateUrl: './graphics-page.component.html',
  styleUrl: './graphics-page.component.scss'
})
export class GraphicsPageComponent implements OnInit {

  stats: IStats[] = []

  // data ranges
  startDate: string = '2025-01-01';
  startTime: string = '00:00';
  endDate: string = '';
  endTime: string = '';

  // Promedio
  averageHour: number = 0

  range!: IRangeDate

  graphicsBool: boolean = false

  modalForm?: Modal

  constructor(
    private imagesService: ImagesService,
    private toastService: ToastService,
    private communicationService: CommunicationService
  ) {
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
    this.range = {startDate: startDateTime, endDate: endDateTime}
  }

  ngOnInit(): void {
    this.communicationService.range$.subscribe((range) => {
      this.range = range
      console.log(this.range)
      this.getStats()
    });
    this.getStats()
    const $targetRegisterModal = document.getElementById('registerModal');
    this.modalForm = new Modal($targetRegisterModal);
  }

  getStats = () => {
    this.graphicsBool = false
    this.imagesService.getAverageByHour(this.range).subscribe({
      next: (response) =>{
        this.averageHour = response.data.averagePerHour
        this.stats = response.data.hourlyData
      },
      error: (error) =>{
        console.error(error)
      },
      complete: () => {
        this.graphicsBool = true
      },
    })
  }


  openForm(){
    this.modalForm?.show()
  }
}
