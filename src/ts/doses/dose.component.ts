import {Component, Input} from '@angular/core';
import {ActionSheetController, NavController, NavParams} from 'ionic-angular';
import {Dose, IdadeDose, VacinasRepository} from "../firebase/vacinas.repository";
import {Observable} from "rxjs/Observable";
import {DescricaoVacinaComponent} from "../detalhes/descricao-vacina.component";
import {VacinasLogInComponent} from "../login/vacinas-login.component";
import {AutenticacaoService} from "../firebase/autenticacao.service";
import {Caderneta, idadeEmMeses, idadeEmMesesPorExtenso, mesesPorExtenso} from "../caderneta/caderneta.model";

@Component({
  selector: 'vacinas-dose',
  styles: [`
    p.item-note {
      margin-left: 0;
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

    div.div-dose {
      padding-left: 40px;
    }
    .fab-dose-descricao {
      margin-left: -25px;
      margin-top: -8px;
    }
    .dose-fonte {
      position: absolute;
      right: 0;
      top: 50%;
    }
  `],
  template: `
    <div class="dose-div" *ngIf="!dentroDeDescricaoVacina">
      <ion-fab class="fab-dose">
        <button ion-fab color="light" mini (click)="abrirActionSheetDose(dose)"><ion-icon name="checkbox-outline"></ion-icon></button>
      </ion-fab>
      <button ion-item class="botao-dose" (click)="abrirVacina(dose.nomevacina)">
        {{ dose.nomevacina }}
        <p>{{ dose.dosevacina }}</p>
        <p class="item-note" item-right>{{ dose.fontedose }}</p>
      </button>
    </div>

    <ion-item *ngIf="dentroDeDescricaoVacina">
      <ion-fab class="fab-dose-descricao">
        <button ion-fab color="light" mini (click)="abrirActionSheetDose(dose)"><ion-icon name="checkbox-outline"></ion-icon></button>
      </ion-fab>

      <div class="div-dose">
        <h2>{{ dose.idadedose }}</h2>
        <p>{{ dose.dosevacina }}</p>
        <p class="dose-fonte">Fonte: {{ dose.fontedose }}</p>
      </div>
    </ion-item>
    `
})
export class DoseComponent {

  @Input('dose') dose: Dose;
  @Input('dentroDeDescricaoVacina') dentroDeDescricaoVacina: boolean = false;

  autenticado: Observable<any>;

  constructor(private autenticacaoService: AutenticacaoService, public navCtrl: NavController,
              public navParams: NavParams, public vacinasRepository: VacinasRepository, public actionSheetCtrl: ActionSheetController) {
  }

  abrirVacina(nomevacina: string) {
    this.navCtrl.push(DescricaoVacinaComponent, { nomevacina: nomevacina });
  }

  abrirActionSheetDose(dose: Dose) {
    let actionSheet = this.actionSheetCtrl.create({
      title: `${dose.nomevacina} - ${dose.dosevacina}`,
      buttons: [
        {
          text: 'Marcar dose como já tomada',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          // text: 'Marcar dose como nunca será tomada',
          // role: 'destructive',
          // handler: () => { console.log('Destructive clicked'); }
        // },{
          text: 'Ver mais informações sobre ' + dose.nomevacina,
          handler: () => {
            this.abrirVacina(dose.nomevacina);
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => { /* nada a fazer quando cancelarem */ }
        }
      ]
    });
    actionSheet.present();
  }

}
