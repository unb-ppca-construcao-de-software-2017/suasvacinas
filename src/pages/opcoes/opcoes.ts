import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";

@Component({
  selector: 'page-opcoes',
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content padding>
      <vacina-opcao [chave]="selectedChave"></vacina-opcao>
    </ion-content>
  `
})
export class OpcoesComponent {

  selectedChave: string;

  constructor(public navParams: NavParams) {
    this.selectedChave = navParams.get('chave');
  }

}
