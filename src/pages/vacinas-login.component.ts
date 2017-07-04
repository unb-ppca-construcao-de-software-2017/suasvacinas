import { Component } from '@angular/core';
import {VacinasAuthService} from "../firebase/vacinas-auth.service";

@Component({
  selector: 'vacinas-login',
  styles: [`
    .login {
      margin-top: 10%;
      text-align: center;
    }
    .login * { font-size: 96%; }
  `],
  template: `
    <div class="login">
      <h1>Ou cadastre o histórico do seu filho</h1>
      <button ion-button outline item-end icon-left (click)="signInWithGoogle()"><ion-icon name="logo-google"></ion-icon>Google</button>
      <button ion-button outline item-end icon-left (click)="signInWithTwitter()"><ion-icon name="logo-twitter"></ion-icon>Twitter</button>
      <button ion-button outline item-end icon-left (click)="signInWithFacebook()"><ion-icon name="logo-facebook"></ion-icon>Facebook</button>
      <h1>e receva avisos automaticamente</h1>
    </div>
  `
})
export class VacinasLogInComponent {

  constructor(private vacinasAuthService: VacinasAuthService) {}

  signInWithGoogle(): void {
    this.vacinasAuthService.signInWithGoogle().then(() => this.postLogIn());
  }

  signInWithTwitter(): void {
    this.vacinasAuthService.signInWithTwitter().then(() => this.postLogIn());
  }

  signInWithFacebook(): void {
    this.vacinasAuthService.signInWithFacebook().then(() => this.postLogIn());
  }

  private postLogIn(): void {
    // pra onde vai apos login, colocar um nav reroute aqui
  }

}
