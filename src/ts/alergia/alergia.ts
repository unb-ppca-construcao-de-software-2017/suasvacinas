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

    <ion-content padding>
      <h1>Alergias</h1>
    </ion-content>
  `
})
export class AlergiaComponent {
}
