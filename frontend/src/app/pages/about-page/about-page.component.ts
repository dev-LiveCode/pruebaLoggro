import { Component, OnInit } from '@angular/core';
import { ICertifications } from '../../shared/interfaces/utils.interfaces';
import { Modal } from 'flowbite';
import { CommonModule } from '@angular/common';

const DetailsInformation: string = `Estoy motivado por la oportunidad de integrarme a un equipo de trabajo donde pueda aportar mis conocimientos para la mejora de procesos y el logro de objetivos comunes. Creo firmemente en la colaboración como una herramienta para la innovación y el crecimiento, tanto a nivel individual como colectivo. Unirme a un entorno dinámico y profesional me permitirá no solo contribuir al éxito del equipo, sino también continuar desarrollándome personal y profesionalmente, enfrentando nuevos desafíos que impulsen mi evolución.`;
const TextAboutMe: string = `Soy un joven apasionado por el aprendizaje y la tecnología, siempre en busca de nuevas formas de crecer y mejorar mis habilidades. Me entusiasma explorar cómo la innovación puede transformar nuestro entorno y facilitar la vida de las personas. Además, disfruto del ciclismo y el senderismo, actividades que me conectan con la naturaleza y me permiten mantenerme activo mientras descubro nuevos paisajes y retos.`;

const PDFS: ICertifications[] = [
  {
    text: 'Titulo Tecnología ADSI - SENA',
    image: './assets/img/certifications/Titulo tecnologo.png',
    pdf: './assets/pdf/certifications/Titulo tecnologo.pdf',
  },
  {
    text: 'Bootcamp Arquitectura en la nube - Mintic',
    image:
      './assets/img/certifications/Bootcamp Arquitectura en la Nube - MinTic TalentoTech.png',
    pdf: './assets/pdf/certifications/Bootcamp Arquitectura en la Nube - MinTic TalentoTech.pdf',
  },
  {
    text: 'Certificado Cloud Architect expert',
    image:
      './assets/img/certifications/certificado Cloud Architect expert - CertiPlus.png',
    pdf: './assets/pdf/certifications/certificado Cloud Architect expert - CertiPlus.pdf',
  },
  {
    text: 'Certificado Cloud Architect associate',
    image:
      './assets/img/certifications/certificado Cloud Architect associate - CertiPlus.png',
    pdf: './assets/pdf/certifications/certificado Cloud Architect associate - CertiPlus.pdf',
  },
  {
    text: 'Tecnico en programación de software - SENA',
    image: './assets/img/certifications/Titulo Tecnico.png',
    pdf: './assets/pdf/certifications/Titulo Tecnico.pdf',
  },
];

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
})
export class AboutPageComponent implements OnInit {
  textAboutMe: string = TextAboutMe;
  detailsInformation: string = DetailsInformation;

  
  modalImage?: Modal;
  
  pdfs: ICertifications[] = PDFS;
  image: ICertifications = this.pdfs[0];

  constructor() {
  }
  
  ngOnInit(): void {
    const $targetEl = document.getElementById('imageModal');
    this.modalImage = new Modal($targetEl);
  }

  viewImage(certification: ICertifications) {
    console.log(certification)
    this.image = certification;
    this.modalImage?.show();
  }
}
