import {Component, ViewChild} from "@angular/core";
import {NavController, NavParams, Slides} from "ionic-angular";
import {OpcoesComponent} from "../opcoes/opcoes";
import {VacinasLogInComponent} from "../login/vacinas-login.component";

@Component({
  selector: 'vacinas-banner-cadastre-se',
  styles: [`
    img.cocar-cabeca {
      height: 90px;
    }
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
  `],
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content padding>

      <ion-slides pager>

        <ion-slide>

          <h5>Crie...</h5>
          <img class="emoji-cool" src="assets/icon/emoji-cool.png" alt="legal"><br>
          <h5>a {{ args.msg }}...</h5>
          ...e de quem você quiser!

          <br><br>
          Acompanhe datas, doses recomendadas (<span class="cor-verde">SUS e rede privada</span>), alergias e até
          dicas.

          <br><br>
          <button ion-button color="primary" outline icon-end (click)="proximoSlide()">
            Próximo
            <ion-icon name='arrow-forward'></ion-icon>
          </button>


        </ion-slide>

        <ion-slide style="background-color: #ecf4f7">
          <img class="vacina" src="assets/icon/notepad2.png" alt="suas vacinas">
          <img class="vacina" src="assets/icon/vaccine-256.png" alt="suas vacinas"><br>

          <button ion-button outline class="cadastrese" (click)="irParaLogin()">
            <span>Crie sua caderneta!</span>
            &nbsp;&nbsp;<ion-icon name="logo-facebook"></ion-icon>
            &nbsp;<ion-icon name="logo-google"></ion-icon>
            &nbsp;<ion-icon name="logo-twitter"></ion-icon>
          </button>
          
          
          
          <div class="duvida">
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
  }

  proximoSlide() {
    this.slides.slideNext();
  }

  abrirIdadeEspecifica() {
    this.navCtrl.push(OpcoesComponent, {chave: this.args.chave});
  }

  irParaLogin(): void {
    this.navCtrl.push(VacinasLogInComponent);
  }

}
