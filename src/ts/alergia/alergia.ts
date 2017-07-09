import {Component} from "@angular/core";
import "rxjs/add/operator/pluck";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";

@Component({
  selector: 'alergia',
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content class="card-background-page">
      <h1>Alergias</h1>
      <ion-card>
        <img src="https://ionicframework.com/dist/preview-app/www/assets/img/card-saopaolo.png"/>
        <div class="card-title">Ovo</div>
        <div class="card-subtitle">Vacinas que contém ovo em sua composição</div>
      </ion-card>
      <ion-card>
        <img src="https://ionicframework.com/dist/preview-app/www/assets/img/card-amsterdam.png"/>
        <div class="card-title">Leite</div>
        <div class="card-subtitle">Vacinas que contém leite em sua composição</div>
      </ion-card>
    </ion-content>
  `
})
export class AlergiaComponent {
}
