import { Component } from '@angular/core';

@Component({
  selector: 'vacinas-login-com-email',
  styles: [`
  `],
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content padding>
      <ion-grid>
        <ion-row>
          <ion-col offset-2 col-8 class="texto-centralizado">
          
            <h1>Caderneta</h1>

          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>

    <ion-footer>
      <vacinas-footer></vacinas-footer>
    </ion-footer>
  `
})
export class CadernetaComponent {

}
