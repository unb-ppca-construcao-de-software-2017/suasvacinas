import {Component} from "@angular/core";
import "rxjs/add/operator/pluck";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";

@Component({
  selector: 'alergia',
  styles: [`
    .card-background-page {
      ion-card {
        position: relative;
        text-align: center;
      }
  
      .card-title {
        position: absolute;
        top: 36%;
        font-size: 2.0em;
        width: 100%;
        font-weight: bold;
        color: #fff;
      }
  
      .card-subtitle {
        font-size: 1.0em;
        position: absolute;
        top: 52%;
        width: 100%;
        color: #fff;
      }
    }
  `],
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content class="card-background-page">
      <h1>Alergias</h1>
      <ion-card>
        <img src="img/ovo.png"/>
        <div class="card-title">Ovo</div>
        <div class="card-subtitle">Vacinas que contém ovo em sua composição</div>
      </ion-card>
    </ion-content>
  `
})
export class AlergiaComponent {
}
