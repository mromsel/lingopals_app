import { Component } from '@angular/core';

@Component({
  selector: 'app-letters-scroll',
  templateUrl: './letters-scroll.component.html',
  styleUrls: ['./letters-scroll.component.scss'],
})
export class LettersScrollComponent {

  alphabet: string[] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

  constructor() { }

  scrollToElement(sectionId: string): void {
    const componente = document.getElementById(sectionId);

    if (componente != null) {
      componente.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
