import {Component} from "@angular/core";
import "rxjs/add/operator/pluck";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";

@Component({
  selector: 'vacinas-extra-sus',
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content padding>
      <button ion-item *ngFor="let v of vacinas" (click)="alert('teste')">
        {{v.nome}}
      </button>
    </ion-content>
  `
})
export class VacinasExtraSUSPage {

  vacinas: any[] = [{nome: "teste"}];

}
