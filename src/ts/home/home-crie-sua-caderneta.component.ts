import { Component } from '@angular/core';
import {AutenticacaoService} from "../firebase/autenticacao.service";
import {NavController} from "ionic-angular";
import {VacinasLogInComponent} from "../login/vacinas-login.component";

@Component({
  selector: 'home-crie-sua-caderneta',
  styles: [`
    .login {
      margin-top: 10%;
      text-align: center;
    }
    .login * { font-size: 96%; }
  `],
  template: `
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
export class HomeCrieSuaCadernetaComponent {

  constructor(private navCtrl: NavController) { }

  irParaLogin(): void {
    this.navCtrl.push(VacinasLogInComponent);
  }

}
