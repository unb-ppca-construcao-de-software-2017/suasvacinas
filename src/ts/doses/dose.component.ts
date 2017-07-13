import {Component, Input} from "@angular/core";
import {
  ActionSheetController, LoadingController, ModalController, NavController, NavParams,
  ToastController
} from "ionic-angular";
import {Dose, VacinasRepository} from "../firebase/vacinas.repository";
import {Observable} from "rxjs/Observable";
import {DescricaoVacinaComponent} from "../detalhes/descricao-vacina.component";
import {Caderneta} from "../caderneta/caderneta.model";
import {CadernetaRepository} from "../caderneta/caderneta.repository";
import {MarcarVacinaModalComponent} from "./dose-data.modal";

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
      margin-left: -23px;
      margin-top: -8px;
    }
    .dose-fonte {
      position: absolute;
      right: 0;
      top: 50%;
    }
    .tomada *,.tomada {
      text-decoration: line-through;
      color: #e03939 !important;
    }
  `],
  template: `
    <div class="dose-div" *ngIf="!dentroDeDescricaoVacina">
      <ion-fab class="fab-dose">
        <button *ngIf="doseFoiTomada(); else icone_dose" ion-fab color="light" mini (click)="abrirActionSheetDose()">
          <ion-icon name="information-circle-outline"></ion-icon>
        </button>
        <ng-template #icone_dose>
          <button ion-fab color="secondary" mini (click)="abrirActionSheetDose()">
            <ion-icon name="checkbox-outline"></ion-icon>
          </button>
        </ng-template>
      </ion-fab>
      <button ion-item class="botao-dose" (click)="abrirVacina(dose.nomevacina)">
        <span [ngClass]="{tomada: doseFoiTomada()}">{{ dose.nomevacina }}
        <p>{{ dose.dosevacina }}</p>
        </span>
        <p class="item-note" item-right>
          <span *ngIf="doseFoiTomada(); else fonte_dose" class="cor-vermelha">{{ dataFoiTomada() }}</span>
          <ng-template #fonte_dose>{{ dose.fontedose }}</ng-template>
        </p>
      </button>
    </div>

    <ion-item *ngIf="dentroDeDescricaoVacina">
      <ion-fab class="fab-dose-descricao">
        <button *ngIf="doseFoiTomada(); else icone_dose2" ion-fab color="light" mini (click)="abrirActionSheetDose()">
          <ion-icon name="information-circle-outline"></ion-icon>
        </button>
        <ng-template #icone_dose2>
          <button ion-fab color="secondary" mini (click)="abrirActionSheetDose()">
            <ion-icon name="checkbox-outline"></ion-icon>
          </button>
        </ng-template>
      </ion-fab>

      <div class="div-dose" [ngClass]="{tomada: doseFoiTomada()}">
        <h2>{{ dose.idadedoseextenso }}</h2>
        <p>{{ dose.dosevacina }}</p>
        <p class="dose-fonte">
          <span *ngIf="doseFoiTomada(); else fonte_dose2" class="cor-vermelha" style="text-decoration: none;">{{ dataFoiTomada() }}</span>
          <ng-template #fonte_dose2>Fonte: {{ dose.fontedose }}</ng-template>
        </p>
      </div>
    </ion-item>
    `
})
export class DoseComponent {

  @Input('caderneta') caderneta: Caderneta;
  @Input('dose') dose: Dose;
  @Input('dentroDeDescricaoVacina') dentroDeDescricaoVacina: boolean = false;

  autenticado: Observable<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams, public vacinasRepository: VacinasRepository,
              public actionSheetCtrl: ActionSheetController, private cadernetaRepository: CadernetaRepository,
              private loadingCtrl: LoadingController, public toastCtrl: ToastController, public modalCtrl: ModalController) {
  }

  openModal(characterNum) {
    let modal = this.modalCtrl.create(MarcarVacinaModalComponent, characterNum);
    modal.present();
  }

  abrirVacina(nomevacina: string) {
    this.navCtrl.push(DescricaoVacinaComponent, { nomevacina: nomevacina, caderneta: this.caderneta });
  }

  abrirActionSheetDose() {
    let botoesAction = [];

    botoesAction.push(this.botaoActionMarcarDoseComoTomada(this.dose));

    // botoesAction.push({text: 'Destructive', , handler: () => { console.log('Destructive clicked'); } });

    if (!this.dentroDeDescricaoVacina) {
      botoesAction.push({
        text: 'Ver mais informações sobre ' + this.dose.nomevacina,
        handler: () => {
          this.abrirVacina(this.dose.nomevacina);
        }
      });
    }

    botoesAction.push({
      text: 'Cancelar',
      role: 'cancel',
      handler: () => { /* nada a fazer quando cancelarem */ }
    });

    let actionSheet = this.actionSheetCtrl.create({
      title: `${this.dose.nomevacina} - ${this.dose.dosevacina}`,
      buttons: botoesAction
    });
    actionSheet.present();
  }

  doseFoiTomada() {
    return this.caderneta && this.caderneta.doses && this.caderneta.doses[this.dose.chavedose] && this.caderneta.doses[this.dose.chavedose].tomada;
  }

  dataFoiTomada() {
    if (this.caderneta && this.caderneta.doses && this.caderneta.doses[this.dose.chavedose] && this.caderneta.doses[this.dose.chavedose].dataTomada) {
      return this.caderneta.doses[this.dose.chavedose].dataTomada;
    }
    return "Já tomada";
  }

  private botaoActionMarcarDoseComoTomada(dose: Dose) {
    return {
      text: 'Marcar/Desmarcar dose como já tomada',
      handler: () => {
        this.openModal({caderneta: this.caderneta, dose: this.dose});
      }
    };
  }

}
