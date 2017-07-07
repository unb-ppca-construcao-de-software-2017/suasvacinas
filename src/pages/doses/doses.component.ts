import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {IdadeDose, VacinasRepository} from "../../providers/firebase/vacinas.repository";
import {Observable} from "rxjs/Observable";
import {DescricaoVacinaComponent} from "../descricao-vacina.component";

@Component({
  selector: 'vacinas-dose',
  styles: [`
    h1 { padding: 5px; }
    p.item-note {
      margin-left: 0;
    }
    .bg-style {
      background: #f4f4f7;
    }
    button.botao-dose {
      padding-left: 40px;
    }
    .fab-dose {
      margin-left: -15px;
    }
    .dose-div {
      border-bottom: 1px solid #f4f4f7;
      border-top: 1px solid #f4f4f7;
    }
    ._e_ {
      padding: 0;
      margin-right: -15px;
    }
    .idade-escolhida {
      color: #488aff;
    }
  `],
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content class="bg-style">
      <ion-grid>
        <ion-row>
          <ion-col col-12>
            <div style="text-align: center">
            Abaixo as doses recomendadas até <span class="idade-escolhida">{{ idadeEscolhida }}</span>.<br>
            Conheça detalhes e <b>marque as que já tomou</b>.<br>

              <button ion-button outline small>
                Crie uma caderneta
                &nbsp;&nbsp;<ion-icon name="logo-facebook"></ion-icon>
                &nbsp;<ion-icon name="logo-google"></ion-icon>
                &nbsp;<ion-icon name="logo-twitter"></ion-icon></button>
              <div ion-button clear small class="_e_" color="dark">e</div>
              <br>
              
              cadastre as idades de seus familiares.<br>
              Nós te ajudaremos a acompanhar!
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-card *ngFor="let idadeDose of idadeDoses | async">
        <ion-card-header>
          {{ idadeDose.idadeDose }}
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <div class="dose-div" *ngFor="let dose of idadeDose.doses">
              <ion-fab class="fab-dose">
                <button ion-fab color="light" mini><ion-icon name="ios-log-in"></ion-icon></button>
                <ion-fab-list side="right">
                  <button ion-fab (click)="marcarVacina()" color="secondary"><ion-icon name="checkmark"></ion-icon></button>
                  <button ion-fab (click)="abrirVacina(dose.nome)" color="danger"><ion-icon name="information"></ion-icon></button>
                  <button ion-fab (click)="shareTwitter()" color="default"><ion-icon name="logo-facebook"></ion-icon></button>
                  <button ion-fab (click)="shareTwitter()"><ion-icon name="logo-twitter"></ion-icon></button>
                </ion-fab-list>
              </ion-fab>
              <button ion-item class="botao-dose" (click)="abrirVacina(dose.nome)">
                {{ dose.nome }}
                <p>{{ dose.dose }}</p>
                <p class="item-note" item-right>{{ dose.fonte }}</p>
              </button>
            </div>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>

    <ion-footer>
      <vacinas-footer></vacinas-footer>
    </ion-footer>
  `
})
export class DosesComponent {

  meses: number;
  idadeEscolhida: string;

  idadeDoses: Observable<IdadeDose[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public vacinasRepository: VacinasRepository) {
    this.meses = navParams.get('meses');
    this.idadeEscolhida = navParams.get('idadeEscolhida').toLowerCase();

    this.idadeDoses = this.vacinasRepository.getDosesAtehMeses(this.meses);
  }

  abrirVacina(nomevacina: string) {
    this.navCtrl.push(DescricaoVacinaComponent, { nomevacina: nomevacina });
  }

  marcarVacina() {
    // fazendo
  }

  shareTwitter() {
    // abrir "https://twitter.com/intent/tweet?text={{ base_path }}{{ page.url }}"
    // "https://www.facebook.com/sharer/sharer.php?u={{ base_path }}{{ page.url }}"
    // "https://plus.google.com/share?url={{ base_path }}{{ page.url }}"
  }

}
