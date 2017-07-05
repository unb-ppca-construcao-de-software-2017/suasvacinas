import {Component} from "@angular/core";
import "rxjs/add/operator/pluck";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";

@Component({
  selector: 'page-home-botoes',
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content padding>
      <vacina-opcao [chave]="chaveHome"></vacina-opcao>
      <vacinas-login></vacinas-login>
    </ion-content>
  `
})
export class HomeBotoesPage {

  chaveHome: string = "home";

}
