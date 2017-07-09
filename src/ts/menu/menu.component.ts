import {Component} from "@angular/core";
import {App} from "ionic-angular";
import {InicialComponent} from "../home/inicial.component";
import {VacinasExtraSUSPage} from "../extra-sus/extra-sus";
import {ContatoComponent} from "../contato/contato";

@Component({
  selector: 'vacinas-menu',
  template: `
    <ion-grid class="jogar-pro-centro-verticalmente">
      <ion-row>
        <ion-col col-12 style="text-align: center">
          <img src="assets/icon/vaccine.png">
          <h1>Vacine.org</h1>
        </ion-col>
      </ion-row>
    </ion-grid>
    <ion-list>
      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
        {{p.title}}
      </button>
    </ion-list>
    <h6 style="text-align: center"><a href="mailto:contato@vacine.org" style="text-decoration: none">contato@vacine.org</a></h6>
  `
})
export class VacinasMenuComponent {

  pages: Array<{title: string, component: any}>;

  constructor(public appCtrl: App) {
    this.pages = [
      { title: 'Início', component: InicialComponent },
      // { title: 'Exemplo Crud', component: ExemploCrudPage },
      // { title: 'Lista', component: ListPage },
      { title: 'Ampliar Cobertura do SUS', component: VacinasExtraSUSPage},
      // { title: 'Componente do Welder', component: WelderComponent},
      { title: 'Fale Conosco', component: ContatoComponent}
    ];

  }

  openPage(page) {
    this.appCtrl.getRootNav().setRoot(page.component);
  }

}
