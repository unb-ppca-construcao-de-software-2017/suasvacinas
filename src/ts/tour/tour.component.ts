import {Component, ViewChild} from "@angular/core";
import {NavController, NavParams, Slides} from "ionic-angular";
import {OpcoesComponent} from "../opcoes/opcoes";
import {VacinasLogInComponent} from "../login/vacinas-login.component";
import {GoogleAnalytics} from "../../app/google-analytics";

@Component({
  selector: 'vacinas-banner-cadastre-se',
  styles: [`
    img.emoji-cool {
      height: 110px;
    }
    .duvida {
      margin-top: 20%;
      text-align: center;
    }
    img.vacina {
      height: 100px;
    }
    @media(max-height:480px) {
      img.emoji-cool {
        height: 40px;
      }
      img.vacina {
        height: 30px;
      }
      .duvida {
        margin-top: 0;
      }
      .quebra-de-linha-ocultavel {
        display: none;
      }
      .slide-com-emoticon {
        font-size: 90%;
      }
    }
  `],
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content padding>

      <ion-slides pager>

        <ion-slide class="slide-com-emoticon">

          <h5>Crie...</h5>
          <img class="emoji-cool" src="assets/icon/emoji-cool.png" alt="legal"><br class="quebra-de-linha-ocultavel">
          <h5>a {{ args.msg }}...</h5>
          ...e de quem você quiser!

          <br><br class="quebra-de-linha-ocultavel">
          Acompanhe datas, doses recomendadas (<span class="cor-verde">SUS e rede privada</span>), alergias e até
          dicas.

          <br><br>
          <button ion-button color="primary" outline icon-end (click)="proximoSlide()">
            Próximo
            <ion-icon name='arrow-forward'></ion-icon>
          </button>


        </ion-slide>

        <ion-slide style="background-color: #ecf4f7">
          <ion-grid>
            <ion-row>
              <ion-col col-12>
                <div>
                  Só na curiosidade?<br>Comece agora mesmo!<br>
                  <a (click)="abrirIdadeEspecifica()" href="#">Confira as vacinas para uma idade específica e entenda como podemos te ajudar.</a>
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
          
          <div class="duvida">
            <img class="vacina" src="assets/icon/notepad2.png" alt="suas vacinas">
            <img class="vacina" src="assets/icon/vaccine-256.png" alt="suas vacinas"><br>
            Já quer criar a caderneta?
            <button ion-button outline class="cadastrese" (click)="irParaLogin()">
              <span>Crie sua caderneta!</span>
              &nbsp;&nbsp;<ion-icon name="logo-facebook"></ion-icon>
              &nbsp;<ion-icon name="logo-google"></ion-icon>
              &nbsp;<ion-icon name="logo-twitter"></ion-icon>
            </button>
          </div>
        </ion-slide>

      </ion-slides>

    </ion-content>

    <ion-footer>
      <vacinas-footer></vacinas-footer>
    </ion-footer>
  `
})
export class TourComponent {

  @ViewChild(Slides) slides: Slides;

  args: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.args = navParams.get('args');
    GoogleAnalytics.sendPageViewForPage('/tour');
  }

  proximoSlide() {
    this.slides.slideNext();
  }

  abrirIdadeEspecifica() {
    GoogleAnalytics.sendEvent('click', "Tour:Sair", this.args.chave);
    this.navCtrl.push(OpcoesComponent, {chave: this.args.chave});
  }

  irParaLogin(): void {
    GoogleAnalytics.sendEvent('click', "Tour:Sair", 'LogIn');
    this.navCtrl.push(VacinasLogInComponent, { ocultarTextoCuriosidade: true });
  }

}
