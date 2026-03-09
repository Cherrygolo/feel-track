import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  imports: [
    NgStyle
  ],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss'
})
export class SpinnerComponent {
  // Taille du spinner en pixels (largeur et hauteur)
  @Input() size: number = 50;
  // Message optionnel à afficher sous le spinner
  @Input() message: string = 'Chargement en cours';
}