import {Component, AfterViewInit} from "@angular/core";
import "rxjs/add/operator/pluck";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {AutenticacaoService} from "../firebase/autenticacao.service";
import {SubOpcao} from "../firebase/vacinas.repository";
import {VacinasLogInComponent} from "../login/vacinas-login.component";
import {NavController} from "ionic-angular";

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
    
    <div *ngFor="let subOpcao of opcoesTour">
      <button ion-button large block class="botao-pessoa" (click)="abrirOpcao(subOpcao)">{{ subOpcao.titulo }}</button>
    </div>

    <div class="login">
      <h1>Cadastre as vacinas do seu filho, filha ou familiar</h1>
      <button ion-button outline large (click)="irParaLogin()">
        Crie sua caderneta!
        &nbsp;&nbsp;<ion-icon name="logo-facebook" class="branco"></ion-icon>
        &nbsp;<ion-icon name="logo-google" class="branco"></ion-icon>
        &nbsp;<ion-icon name="logo-twitter" class="branco"></ion-icon>
      </button>
      <h1 style="margin-top: 0.5em;">e administre seu histórico automaticamente.</h1>
    </div>
  `
})
export class TourHomeComponent {

  autenticado: Observable<any>;

  opcoesTour: any[];

  constructor(private autenticacaoService: AutenticacaoService, private navCtrl: NavController) {
    this.autenticado = autenticacaoService.isAutenticado();
    this.opcoesTour = [
      {titulo: "Minha filha",  chave: "fixapage-filha"},
      {titulo: "Meu filho",    chave: "fixapage-filho"},
      {titulo: "Eu",           chave: "fixapage-eu"},
      {titulo: "Meu familiar", chave: "fixapage-familiar"}
    ];
  }

  irParaLogin(): void {
    this.navCtrl.push(VacinasLogInComponent);
  }

}
