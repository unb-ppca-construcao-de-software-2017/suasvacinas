import {Component} from "@angular/core";
import {App} from "ionic-angular";
import {HomeComponent} from "../home/home.component";
import {ContatoComponent} from "../contato/contato.component";
import {AutenticacaoService} from "../firebase/autenticacao.service";
import {Observable} from "rxjs/Observable";
import {VacinasExtraSUSComponent} from "../extra-sus/extra-sus";
import {GoogleAnalytics} from "../../app/google-analytics";

@Component({
  selector: 'vacinas-menu',
  styles: [`
    .email-contato {
      text-decoration: none;
      color: black;
      font-size: 80%;
    }
  `],
  template: `
    <ion-grid>
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
    
    <br><br>
    <div class="texto-centralizado">

      <button *ngIf="(autenticado | async)?.logado" ion-button color="dark" outline small (click)="sair()">Sair do vacine.org</button>
      <br><br>
      <a href="mailto:contato@vacine.org" class="email-contato">contato@vacine.org</a>
    
    </div>
  `
})
export class VacinasMenuComponent {

  pages: Array<{title: string, component: any}>;

  autenticado: Observable<any>;

  constructor(private appCtrl: App, private autenticacaoService: AutenticacaoService) {
    this.autenticado = autenticacaoService.isAutenticado();
    this.pages = [
      { title: 'Início', component: HomeComponent },
      // { title: 'Exemplo Crud', component: ExemploCrudPage },
      // { title: 'Lista', component: ListPage },
      { title: 'Caderneta de Vacinas', component: HomeComponent},
      { title: 'Ampliar Cobertura do SUS', component: VacinasExtraSUSComponent},
      // { title: 'Alergias', component: AlergiaComponent},
      // { title: 'Componente do Welder', component: WelderComponent},
      { title: 'Fale Conosco', component: ContatoComponent}
    ];

  }

  openPage(page) {
    GoogleAnalytics.sendEvent('click', "Menu", page.title);
    this.appCtrl.getRootNav().setRoot(page.component);
  }

  sair() {
    this.autenticacaoService.signOut().then(() => {
      window.location.reload();
    });
  }

}
