import { Component, OnInit } from '@angular/core';
import { ImagesService } from '../../services/images.service';
import { ToastService } from '../../services/toast.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommunicationService } from '../../services/communication.service';

@Component({
  selector: 'app-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {


  // form register
  personName: string = '';
  imageFiles: File[] = [];
  currentImage: string | ArrayBuffer | null = '/assets/img/image-3@2x.jpg';
  currentFileName: string = 'Upload image';
  currentIndex: number = 0;


  // propiedad para manejar el estado de carga
  isLoading: boolean = false; 


  // form register errors properties
  nameError: boolean = false;
  fileError: boolean = false;


  constructor(
    private imagesService: ImagesService,
    private toastService: ToastService,
    private communicationService: CommunicationService
  ) {}
  
  ngOnInit(): void {
  }


  sendImages() {
    this.isLoading = true;
    // Validar nombre
    this.validateName();
    if (this.nameError) {
      this.toastService.showToast(
        'El campo nombre es invalido. El campo debe tener de 3-50 caracteres.',
        'warning'
      );
      this.isLoading = false;
      return;
    }

    // Validar archivos
    if (this.imageFiles.length === 0) {
      this.fileError = true;
      this.toastService.showToast(
        'Es necesario cargar por lo menos una imagen',
        'warning'
      );
      this.isLoading = false;
      return;
    }

    // Preparar los datos para enviar
    const formData = new FormData();
    formData.append('personName', this.personName);
    this.imageFiles.forEach((file) => formData.append('files', file));

    // Consumir el servicio de subida
    try {
      this.imagesService.uploadImages(formData).subscribe({
        next: (response) => {
          this.toastService.showToast(
            'Imagenes cargadas y procesadas correctamente!',
            'success'
          );
          this.resetForm(); // Resetear formulario después de la subida
        },
        error: (error) => {
          console.error('Error uploading images:', error);
          this.toastService.showToast(
            'Fallo al cargar imagenes. Intente nuevamente.',
            'warning'
          );
        },
        complete: () =>{
          this.isLoading = false;
          this.communicationService.triggerReload();
        }
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      this.toastService.showToast('Error inesperado', 'error');
      this.isLoading = false;
    }
  }

  // Manejar el cambio de archivo
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.fileError = false; // Resetear error de archivo
    if (input.files) {
      const files = Array.from(input.files);

      // Validar tipo de archivo
      const validFiles = files.filter((file) =>
        /\.(jpeg|jpg|png)$/i.test(file.name)
      );
      if (validFiles.length !== files.length) {
        this.fileError = true;
        return;
      }

      this.imageFiles = validFiles;
      this.currentIndex = 0;
      this.updatePreview();
    }
  }

  // Validar nombre
  validateName(): void {
    this.nameError = !(
      this.personName &&
      this.personName.length >= 3 &&
      this.personName.length <= 50
    );
  }

  // Actualizar previsualización
  updatePreview(): void {
    if (this.imageFiles.length > 0) {
      const file = this.imageFiles[this.currentIndex];
      const reader = new FileReader();
      reader.onload = () => {
        this.currentImage = reader.result;
        this.currentFileName = file.name;
      };
      reader.readAsDataURL(file);
    }
  }

  // Mostrar imagen anterior
  prevImage(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updatePreview();
    }
  }

  // Mostrar imagen siguiente
  nextImage(): void {
    if (this.currentIndex < this.imageFiles.length - 1) {
      this.currentIndex++;
      this.updatePreview();
    }
  }

  // Reiniciar formulario
  resetForm(): void {
    // Limpiar campos de entrada
    this.personName = '';
    this.imageFiles = [];
    this.currentImage = '/assets/img/image-3@2x.jpg';
    this.currentFileName = 'Upload image';
    this.currentIndex = 0;

    // Limpiar mensajes de error
    this.nameError = false;
    this.fileError = false;

    // Opcional: Reiniciar el input de archivos
    const fileInput = document.getElementById(
      'multiple_files'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Restablece el estado del input
    }
  }

}
