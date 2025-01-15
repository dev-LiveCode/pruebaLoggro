import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { IImage, IRangeDate, IStats, IToast } from '../../interfaces/utils.interfaces';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../services/toast.service';
import { RouterModule } from '@angular/router';
import { FormComponent } from "../form/form.component";
import { CommunicationService } from '../../services/communication.service';
import { Modal } from 'flowbite';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, FormComponent],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit {
  images: IImage[] = [];

  // data ranges
  startDate: string = '2025-01-01';
  startTime: string = '00:00';
  endDate: string = '';
  endTime: string = '';

  // pagination
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;
  startIndex: number = 0;
  endIndex: number = this.itemsPerPage - 1;

  // pagination table stats
  currentPageStats = 1;
  itemsPerPageStats = 3;
  totalPagesStats = 0;
  startIndexStats: number = 0;
  endIndexStats: number = this.itemsPerPageStats;

  // Promedio
  averageHour: number = 0
  dataStats: IStats[] = []

  // Modal image
  modalUrl: string = ''
  modalPersonName: string = ''

  modalImage?: Modal
  modalForm?: Modal

  constructor(
    private imagesService: ImagesService,
    private toastService: ToastService,
    private communicationService: CommunicationService
  ) {}

  ngOnInit(): void {
    this.communicationService.reload$.subscribe(() => {
      console.log('Reload triggered!');
      this.getAllImages();
    });
    this.getAllImages();

    const $targetEl = document.getElementById('imageModal');
    this.modalImage = new Modal($targetEl);
    const $targetRegisterModal = document.getElementById('registerModal');
    this.modalForm = new Modal($targetRegisterModal);
  }

  getAllImages = () => {
    try {
      this.imagesService.getAllImages().subscribe({
        next: (response) => {
          this.images = response.data;
          this.totalPages = Math.ceil(this.images.length / this.itemsPerPage);
          this.updatePagination();
        },
        error: (error) => {
          throw new Error(error);
        },
        complete: () => {
          this.getStats()
        },
      });

    } catch (error) {
      console.log(error);
    }
  };

  getImagesByDateRange = () => {
    const range = this.validDataRange();
    if ((range as IToast).message) {
      this.toastService.showToast(
        (range as IToast).message,
        (range as IToast).type
      );
      return;
    }
    try {
      this.imagesService.getImagesByRangeDates(range as IRangeDate).subscribe({
        next: (response) => {
          this.images = response.data;
          this.totalPages = Math.ceil(this.images.length / this.itemsPerPage);
          this.updatePagination();
        },
        error: (error) => {
          console.error(error);
          this.toastService.showToast(error.error.message, 'warning');
        },
        complete: () => {
          this.getStats()
        }
      });
    } catch (error: any) {
      // this.toastService.showToast(error.message, 'warning');
    }
  };

  getStats = () => {
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
    const range: IRangeDate = {startDate: startDateTime, endDate: endDateTime}

    this.imagesService.getAverageByHour(range).subscribe({
      next: (response) =>{
        this.averageHour = response.data.averagePerHour
        this.dataStats = response.data.hourlyData
        this.totalPagesStats = Math.ceil(this.dataStats.length / this.itemsPerPageStats);

      },
      error: (error) =>{
        console.error(error)
      },
      complete: () => {
          
      },
    })
  }

  validDataRange = (): IRangeDate | IToast => {
    this.startDate = (
      document.getElementById('startDate') as HTMLInputElement
    ).value;
    this.endDate = (
      document.getElementById('endDate') as HTMLInputElement
    ).value;

    if (!this.startDate || !this.startTime) {
      return <IToast>{
        message: 'La fecha y hora inicio es requerida para la consulta',
        type: 'warning',
      }; // Detenemos la ejecución si hay error
    }

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

    if (new Date(startDateTime) > new Date(endDateTime)) {
      return <IToast>{
        message: 'La fecha inicio no puede ser mayor a la fecha fin',
        type: 'warning',
      }; // Detenemos la ejecución si hay error
    }

    // Aquí creas el rango de fechas con las horas seleccionadas
    return <IRangeDate>{ startDate: startDateTime, endDate: endDateTime };
  };

  updatePagination(): void {
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = this.startIndex + this.itemsPerPage;
  }

  nextPageStats(): void {
    if (this.currentPageStats < this.totalPagesStats) {
      this.currentPageStats++;
      this.startIndexStats = (this.currentPageStats - 1) * this.itemsPerPageStats;
      this.endIndexStats = this.startIndexStats + this.itemsPerPageStats;
    }
  }

  previousPageStats(): void {
    if (this.currentPageStats > 1) {
      this.currentPageStats--;
      this.startIndexStats = (this.currentPageStats - 1) * this.itemsPerPageStats;
      this.endIndexStats = this.startIndexStats + this.itemsPerPageStats;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  cleanFilters(): void {
    this.startDate = '2025-01-01';
    this.startTime = '00:00';
    this.endDate = `${new Date().toISOString().split('T')[0]}`;
    this.endTime = `${new Date().toISOString().split('T')[1].split('.')[0]}`;
    this.getAllImages();
  }

  getRangeDate(): string {
    let range = '';
    if (!this.startDate || this.startDate == '')
      range = `Despliegue de software - ${this.endDate} ${this.endTime}`;
    if (!this.endDate)
      range = `${this.startDate} ${this.startTime} - ${
        new Date().toISOString().split('T')[0]
      } ${new Date().toISOString().split('T')[1].split('.')[0]}`;
    if (this.startDate && this.endDate)
      range = `${this.startDate} ${this.startTime} - ${this.endDate} ${this.endTime}`;
    return range;
  }

  // ver imagene en modal // se asignan valores a propiedades a mostrar
  viewImage(image: IImage){
    this.modalUrl = image.url
    this.modalPersonName = image.personName
    this.modalImage?.show()
  }

  openForm(){
    this.modalForm?.show()
  }

}
