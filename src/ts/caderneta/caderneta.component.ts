import { Component } from '@angular/core';

@Component({
  selector: 'vacinas-caderneta',
  styles: [`
  `],
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content padding>
      <vacinas-caderneta-miolo></vacinas-caderneta-miolo>
    </ion-content>

    <ion-footer>
      <vacinas-footer></vacinas-footer>
    </ion-footer>
  `
})
export class CadernetaComponent {

}
