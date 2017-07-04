import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListPage } from "../list/list";

@Component({
  selector: 'page-home-botoes',
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content padding>
      <h1 class="pergunta">Que vacinas deveria ter tomado...</h1>
      <button ion-button large block class="botao-pessoa" (click)="abrirFilha()">Minha filha</button>
      <button ion-button large block class="botao-pessoa" (click)="abrirFilho()">Meu filho</button>
      <button ion-button large block class="botao-pessoa" (click)="abrirEu()">Eu</button>
      
      <vacinas-login></vacinas-login>
    </ion-content>
  `
})
export class HomeBotoesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  abrirFilha() {
    // console.log('filha!');
    this.navCtrl.push(ListPage, {item: 'Filha'});
  }
  abrirFilho() {
    // console.log('filho!');
    this.navCtrl.push(ListPage, {item: 'Filho'});
  }
  abrirEu() {
    // console.log('eu!');
    this.navCtrl.push(ListPage, {item: 'Eu'});
  }

}
