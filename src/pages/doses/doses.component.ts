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
  `],
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content class="bg-style">
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
                  <button ion-fab color="secondary"><ion-icon name="checkmark"></ion-icon></button>
                  <button ion-fab color="danger"><ion-icon name="information"></ion-icon></button>
                  <button ion-fab color="default"><ion-icon name="logo-facebook"></ion-icon></button>
                  <button ion-fab><ion-icon name="logo-twitter"></ion-icon></button>
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
  `
})
export class DosesComponent {

  meses: number;

  idadeDoses: Observable<IdadeDose[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public vacinasRepository: VacinasRepository) {
    this.meses = navParams.get('meses');

    this.idadeDoses = this.vacinasRepository.getDosesAtehMeses(this.meses);
  }

  abrirVacina(nomevacina: string) {
    this.navCtrl.push(DescricaoVacinaComponent, { nomevacina: nomevacina });
  }
}
