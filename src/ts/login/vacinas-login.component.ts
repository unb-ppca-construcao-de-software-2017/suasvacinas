import { Component } from '@angular/core';
import {AutenticacaoService} from "../firebase/autenticacao.service";
import {NavController} from "ionic-angular";
import {VacinasLogInComEmailComponent} from "./vacinas-login-email.component";

@Component({
  selector: 'vacinas-login',
  styles: [`
    .login {
      margin-top: 10%;
      text-align: center;
    }
  `],
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content padding>
      <ion-grid>
        <ion-row>
          <ion-col offset-2 col-8 class="login">
            <h2>Oi! Como você prefere se autenticar?</h2>
            
            <button ion-button outline item-end icon-left large (click)="signInWithFacebook()"><ion-icon name="logo-facebook"></ion-icon>Facebook</button><br><br>
          
            <button ion-button outline item-end icon-left large (click)="signInWithGoogle()"><ion-icon name="logo-google"></ion-icon>Google</button><br><br>
          
            <button ion-button outline item-end icon-left large (click)="signInWithTwitter()">&nbsp;<ion-icon name="logo-twitter"></ion-icon>Twitter&nbsp;</button><br><br>
          
            <button ion-button outline item-end icon-left large (click)="loginComEmail()"><ion-icon name="mail"></ion-icon>E-mail</button><br>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `
})
export class VacinasLogInComponent {

  constructor(private navCtrl: NavController, private autenticacaoService: AutenticacaoService) {}

  signInWithGoogle(): void {
    this.autenticacaoService.signInWithGoogle().then(() => this.postLogIn());
  }

  signInWithTwitter(): void {
    this.autenticacaoService.signInWithTwitter().then(() => this.postLogIn());
  }

  signInWithFacebook(): void {
    this.autenticacaoService.signInWithFacebook().then(() => this.postLogIn());
  }

  loginComEmail(): void {
    this.navCtrl.push(VacinasLogInComEmailComponent);
  }

  private postLogIn(): void {
    console.log('Logou!');
    // pra onde vai apos login, colocar um nav reroute aqui
  }

}
