import {Component} from '@angular/core';
import {AutenticacaoService} from "../firebase/autenticacao.service";
import {NavController, NavParams} from "ionic-angular";
import {VacinasLogInComEmailComponent} from "./vacinas-login-email.component";
import {OpcoesComponent} from "../opcoes/opcoes";
import {GoogleAnalytics} from "../../app/google-analytics";

@Component({
  selector: 'vacinas-login',
  styles: [`
    .login {
      margin-top: 5%;
      text-align: center;
    }
    .duvida {
      margin-top: 5%;
      text-align: center;
    }
  `],
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content padding>
      <ion-grid>
        <ion-row *ngIf="!ocultarTextoCuriosidade">
          <ion-col col-12>
            
            <div class="duvida">
              <h4>Só na curiosidade?<br><span style="font-size: 80%">Comece agora mesmo!</span></h4>
              <a (click)="abrirIdadeEspecifica()" href="#" style="font-size: 110%">
                Clique aqui, confira as vacinas para uma idade específica e entenda como podemos te ajudar.
              </a>
            </div>
            
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col col-12 class="login">
            <h5><span style="font-size: 80%">Tudo pronto para salvar suas cadernetas? Ótimo!</span><br>Como você prefere se autenticar?</h5>
            
            <button ion-button outline item-end icon-left large (click)="signInWithFacebook()"><ion-icon name="logo-facebook"></ion-icon>Facebook</button><br>
          
            <button ion-button outline item-end icon-left large (click)="signInWithGoogle()"><ion-icon name="logo-google"></ion-icon>Google</button><br>
          
            <button ion-button outline item-end icon-left large (click)="signInWithTwitter()">&nbsp;<ion-icon name="logo-twitter"></ion-icon>Twitter&nbsp;</button>
          
            <button *ngIf="false" ion-button outline item-end icon-left large (click)="loginComEmail()"><ion-icon name="mail"></ion-icon>E-mail</button>
          </ion-col>
        </ion-row>

      </ion-grid>
    </ion-content>
  `
})
export class VacinasLogInComponent {

  ocultarTextoCuriosidade: boolean = false;

  constructor(private navCtrl: NavController, private autenticacaoService: AutenticacaoService, public navParams: NavParams) {
    GoogleAnalytics.sendPageViewForPage('/login');
    this.ocultarTextoCuriosidade = navParams.get('ocultarTextoCuriosidade') || false;
  }

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

  //noinspection JSMethodCanBeStatic
  private postLogIn(): void {
    window.location.reload();
  }

  abrirIdadeEspecifica() {
    this.navCtrl.push(OpcoesComponent, {chave: "meu-filho"});
  }

}
