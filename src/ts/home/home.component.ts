import {Component} from "@angular/core";
import "rxjs/add/operator/pluck";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";

@Component({
  selector: 'vacinas-home',
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content padding>
      <vacina-opcao [chave]="chaveHome"></vacina-opcao>
      <home-crie-sua-caderneta></home-crie-sua-caderneta>
    </ion-content>

    <ion-footer>
      <vacinas-footer></vacinas-footer>
    </ion-footer>
  `
})
export class HomeComponent {

  chaveHome: string = "fixa-home";

}
