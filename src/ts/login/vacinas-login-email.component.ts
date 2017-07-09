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
        <ion-row *ngIf="aindaNaoSeiSeUsuarioExistenteOuNovo">
          <ion-col col-12  class="centro">
            <h1>Você já tem cadastro conosco?</h1>
            <br>
            <button ion-button outline (click)="definirComoUsuarioExistente()">Sim, já me castrastrei anteriormente!</button>
            <br><br>
            <button ion-button outline (click)="definirComoUsuarioNovo()">Não, esta é minha primeira vez aqui!</button>
          </ion-col>
        </ion-row>
        
        <ion-row *ngIf="!aindaNaoSeiSeUsuarioExistenteOuNovo">
          <ion-col offset-2 col-8>
            <h1 class="centro" *ngIf="usuarioExistente">Diga seu email e senha</h1>
            <h1 class="centro" *ngIf="novoUsuario">Diga-nos seu nome, email e senha</h1>

            <form #cadastroForm="ngForm" (ngSubmit)="submeterForm()">
              <ion-list>
                <ion-item [hidden]="usuarioExistente">
                  <ion-label floating>Nome</ion-label>
                  <ion-input type="text" [required]="novoUsuario" class="form-control" name="nome" minlength="5" [(ngModel)]="nome" #nomeDom="ngModel"></ion-input>
                </ion-item>
                
                <ion-item>
                  <ion-label floating>E-mail</ion-label>
                  <ion-input type="email" required email class="form-control" name="email" [(ngModel)]="email" #emailDom="ngModel"></ion-input>
                </ion-item>

                <ion-item>
                  <ion-label floating>Senha</ion-label>
                  <ion-input type="password" required class="form-control" name="senha" [minlength]="minimoCaracteresSenha" [(ngModel)]="senha" #senhaDom="ngModel"></ion-input>
                </ion-item>

                <ion-item>
                  <div class="centro">
                    <button ion-button outline large type="submit" [disabled]="!cadastroForm.valid">
                      <span *ngIf="novoUsuario">Criar caderneta!</span>
                      <span *ngIf="usuarioExistente">Abrir caderneta!</span>
                    </button><br>
                  </div>
                  <div *ngIf="novoUsuario">
                    <div *ngIf="nomeDom.errors && (nomeDom.dirty || nomeDom.touched)" class="aviso centro">
                      Seu nome deve ter pelo menos<br>5 caracteres.
                    </div>
                  </div>
                  <div *ngIf="emailDom.errors && (emailDom.dirty || emailDom.touched)" class="aviso centro">
                    Um e-mail válido é necessário.
                  </div>
                  <div *ngIf="senhaDom.errors && (senhaDom.dirty || senhaDom.touched)" class="aviso centro">
                    <span *ngIf="novoUsuario">Sua senha deve ter ao menos 6 <br>caracteres.</span>
                    <span *ngIf="usuarioExistente">Uma senha é necessária.</span>
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

  aindaNaoSeiSeUsuarioExistenteOuNovo: boolean;
  usuarioExistente: boolean;
  novoUsuario: boolean;

  minimoCaracteresSenha = 6;

  nome: string;
  email: string;
  senha: string;

  constructor(private autenticacaoService: AutenticacaoService) {
    this.aindaNaoSeiSeUsuarioExistenteOuNovo = true;
    this.usuarioExistente = false;
    this.novoUsuario = false;
  }

  definirComoUsuarioExistente() {
    this.aindaNaoSeiSeUsuarioExistenteOuNovo = false;
    this.usuarioExistente = true;
    this.minimoCaracteresSenha = 1; // nao damos a dica de q a senha tem pelo menos 6 chars, caso seja tela de login e nao de criar usuario
  }
  definirComoUsuarioNovo() {
    this.aindaNaoSeiSeUsuarioExistenteOuNovo = false;
    this.novoUsuario = true;
  }

  submeterForm(): void {
    if (this.usuarioExistente) {
      this.loginComEmail();
    } else {
      this.criarNovoUsuarioComEmailSenha();
    }
  }

  loginComEmail(): void {
    this.autenticacaoService.signinWithComEmailSenha(this.email, this.senha).then(() => this.postLogIn());
    // TODO tratar possiveis erros de login, como email invalido e usuario inexistente
  }

  private criarNovoUsuarioComEmailSenha() {
    this.autenticacaoService.criarUsuarioComEmailSenha(this.email, this.senha).then(() => this.postLogIn());
    // todo gravar nome
  }

  private postLogIn(): void {
    console.log('Logou!');
    // pra onde vai apos login, colocar um nav reroute aqui
  }
}
