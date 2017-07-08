import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FirebaseProvider} from "../../firebase/firebase";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'page-exemplo-crud',
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content>
      <ion-row>
        <ion-col col-9>
          <ion-item>
            <ion-input type="text" [(ngModel)]="novaVacina" placeholder="Novo Item"></ion-input>
          </ion-item>
        </ion-col>
        <ion-col>
          <button ion-button (click)="addVacina()"><ion-icon name="add"></ion-icon></button>
        </ion-col>
      </ion-row>

      <ion-list>
        <ion-item-sliding *ngFor="let item of vacinas | async">
          <ion-item>
            {{ item.$value }}
          </ion-item>
          <ion-item-options side="right">
            <button ion-button color="danger" icon-only (click)="removeVacina(item.$key)"><ion-icon name="trash"></ion-icon></button>
          </ion-item-options>
        </ion-item-sliding>
      </ion-list>
    </ion-content>
  `
})
export class ExemploCrudPage {

  vacinas: Observable<any[]>;
  novaVacina = '';

  //noinspection JSUnusedGlobalSymbols
  constructor(public navCtrl: NavController, public firebaseProvider: FirebaseProvider) {
    this.vacinas = this.firebaseProvider.getVacinas();
  }

  addVacina(): void {
    this.firebaseProvider.addVacina(this.novaVacina);
    this.novaVacina = '';
  }

  removeVacina(id): void {
    this.firebaseProvider.removeVacina(id);
  }

}
