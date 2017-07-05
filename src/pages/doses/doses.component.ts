import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'vacinas-dose',
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content>
      <h1>Doses</h1>
      <ion-list>
        <button ion-item *ngFor="let item of items" (click)="itemTapped($event, item)">
          <ion-icon [name]="item.icon" item-left></ion-icon>
          {{item.title}}
          <div class="item-note" item-right>
            {{item.note}}
          </div>
        </button>
      </ion-list>
      <div *ngIf="chaveDose" padding>
        Você chegou aqui por <b>{{chaveDose.title || chaveDose}}</b>
      </div>
    </ion-content>
  `
})
export class DosesComponent {

  chaveDose: string;
  origem: string;

  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // If we navigated to this page, we will have an item available as a nav param
    this.chaveDose = navParams.get('chave');
    this.origem = navParams.get('origem');

    // Let's populate this page with some filler content for funzies
    this.icons = ['flask', 'wifi', 'beer', 'football', 'basketball', 'paper-plane',
    'american-football', 'boat', 'bluetooth', 'build'];

    this.items = [];
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'Este é o item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }

  itemTapped(event, item) {
    this.navCtrl.push(DosesComponent, { chave: item });
  }
}
