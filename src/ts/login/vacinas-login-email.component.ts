import { Component } from '@angular/core';
import {AutenticacaoService} from "../firebase/autenticacao.service";

@Component({
  selector: 'vacinas-login-com-email',
  styles: [`
    .centro {
      text-align: center;
    }
    .jogar-pro-centro-verticalmente {
      margin-top: 20%;
    }
    .aviso {
      color: #bf5153;
      font-size: 70%;
    }
  `],
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content padding>
      <ion-grid class="jogar-pro-centro-verticalmente">
        <ion-row>
          <ion-col offset-2 col-8>
            <h1 class="centro">Diga seu email e senha</h1>

            <form #cadastroForm="ngForm" (ngSubmit)="loginComEmail()">
              <ion-list>
                <ion-item>
                  <ion-label floating>E-mail</ion-label>
                  <ion-input type="email" required email class="form-control" name="email" [(ngModel)]="email" #emailDom="ngModel"></ion-input>
                </ion-item>
  
                <ion-item>
                  <ion-label floating>Senha</ion-label>
                  <ion-input type="password" required class="form-control" name="senha" minlength="6" [(ngModel)]="senha" #senhaDom="ngModel"></ion-input>
                </ion-item>
    
                <ion-item>
                  <div class="centro">
                    <button ion-button outline item-end icon-left large type="submit" [disabled]="!cadastroForm.valid">Criar caderneta!</button><br>
                  </div>
                  <div *ngIf="emailDom.errors && (emailDom.dirty || emailDom.touched)" class="aviso centro">
                    Um e-mail válido é necessário.
                  </div>
                  <div *ngIf="senhaDom.errors && (senhaDom.dirty || senhaDom.touched)" class="aviso centro">
                    Sua senha deve ter ao menos 6 <br>caracteres.
                  </div>
                </ion-item>
              </ion-list>
            </form>
            
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `
})
export class VacinasLogInComEmailComponent {

  email: string;
  senha: string;

  constructor(private autenticacaoService: AutenticacaoService) {}

  loginComEmail(): void {
    this.autenticacaoService.signinWithComEmailSenha(this.email, this.senha).then(() => this.postLogIn());
  }

  private postLogIn(): void {
    console.log('Logou!');
    // pra onde vai apos login, colocar um nav reroute aqui
  }

}
