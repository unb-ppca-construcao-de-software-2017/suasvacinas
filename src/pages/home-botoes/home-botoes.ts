import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ListPage } from "../list/list";
import {Opcao, VacinasRepository, SubOpcao} from "../../providers/firebase/vacinas.repository";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/pluck';
import "rxjs/add/operator/filter";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/pluck';

@Component({
  selector: 'page-home-botoes',
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content padding>
      <h1 class="pergunta">{{ descricao | async }}</h1>
      <div *ngFor="let subOpcao of subOpcoes | async">
        <button ion-button large block class="botao-pessoa" (click)="abrirOpcao(subOpcao.chave)">{{ subOpcao.titulo }}</button>
      </div>
      <vacinas-login></vacinas-login>
    </ion-content>
  `
})
export class HomeBotoesPage {

  descricao: Observable<string>;
  subOpcoes: Observable<SubOpcao[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public vacinasRepository: VacinasRepository) {
    let opcao = this.vacinasRepository.getOpcao('home');
    opcao.subscribe(val => console.log('me!', val));
    this.descricao = opcao.pluck('descricao');
    this.subOpcoes = opcao.map((x: Opcao) => x.subOpcoes);
  }

  abrirOpcao(chaveSubOpcao: string) {
    // console.log('filha!');
    this.navCtrl.push(ListPage, {item: chaveSubOpcao});
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
