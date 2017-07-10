import {Component} from "@angular/core";
import "rxjs/add/operator/pluck";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {AutenticacaoService} from "../firebase/autenticacao.service";
import {VacinasLogInComponent} from "../login/vacinas-login.component";
import {NavController} from "ionic-angular";
import {TourComponent} from "./tour.component";

@Component({
  selector: 'vacinas-tour-home',
  styles: [`
    h1.pergunta {
      white-space: pre-line;
      text-align: center;
    }
    .botao-pessoa {
      margin-bottom: 15px;
    }
    .login {
      margin-top: 10%;
      text-align: center;
    }
    .login * { font-size: 96%; }
  `],
  template: `
    <h1 class="pergunta">Que vacinas deveria ter tomado...</h1>

    <div *ngFor="let tour of tours">
      <button ion-button large block class="botao-pessoa" (click)="abrirOpcao(tour)">{{ tour.titulo }}</button>
    </div>

    <div class="login">
      <h1>Cadastre as vacinas do seu filho, filha ou familiar</h1>
      <button ion-button outline large (click)="irParaLogin()">
        Crie sua caderneta!
        &nbsp;&nbsp;
        <ion-icon name="logo-facebook" class="branco"></ion-icon>
        &nbsp;<ion-icon name="logo-google" class="branco"></ion-icon>
        &nbsp;<ion-icon name="logo-twitter" class="branco"></ion-icon>
      </button>
      <h1 style="margin-top: 0.5em;">e administre seu histórico automaticamente.</h1>
    </div>
  `
})
export class TourHomeComponent {

  autenticado: Observable<any>;

  tours: any[];

  constructor(private autenticacaoService: AutenticacaoService, private navCtrl: NavController) {
    this.autenticado = autenticacaoService.isAutenticado();
    this.tours = [
      {titulo: "Minha filha",  args: {msg: "caderneta da sua filha",        chave: "minha-filha"}},
      {titulo: "Meu filho",    args: {msg: "caderneta do seu filho",        chave: "meu-filho"}},
      {titulo: "Eu",           args: {msg: "sua caderneta, a do seu filho", chave: "meu-filho"}}, // isto estah duplicado em vacinas-footer.component.ts e vacinas-login.component.ts
      {titulo: "Meu familiar", args: {msg: "caderneta do seu familiar",     chave: "meu-familiar"}}
    ];
  }

  irParaLogin(): void {
    this.navCtrl.push(VacinasLogInComponent);
  }

  abrirOpcao(tour: any) {
    this.navCtrl.push(TourComponent, {args: tour.args});
        // this.navCtrl.push(OpcoesComponent, {chave: tour.chave});
  }

}
