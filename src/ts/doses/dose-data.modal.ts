import {NavParams, Platform, ViewController, LoadingController, ToastController} from "ionic-angular";
import {Component} from "@angular/core";
import {Dose} from "../firebase/vacinas.repository";
import {Caderneta, idadeEmMesesPorExtenso} from "../caderneta/caderneta.model";
import {CadernetaRepository} from "../caderneta/caderneta.repository";

@Component({
  styles: [`
    .imagem-genero {
      /* duplicado em doses.component.ts */
      height: 16px;
      width: auto;
      display: inline-block;
      margin-bottom: -2px;
    }
    .nome-vacina {
      font-weight: bold;
      font-size: 140%;
      white-space: pre-line;
    }
    .dose-vacina {
      color: #777;
      font-size: 120%;
      white-space: pre-line;
    }
  `],
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>
          Marcações de Vacina
        </ion-title>
        <ion-buttons start>
          <button ion-button (click)="dismiss()">
            <span ion-text color="primary">Cancelar</span>
          </button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item *ngIf="caderneta">
          <h5>Caderneta: {{ caderneta.nome }}</h5>
          <p><span *ngIf="caderneta.datanascimento">{{ _idadeEmMesesPorExtenso(caderneta.datanascimento) }}</span>
            <img item-end class="imagem-genero" [src]="_imagemGenero(caderneta)" [alt]="caderneta.sexo"></p>
        </ion-item>
        <ion-item>
          <h1 class="nome-vacina">{{ dose.nomevacina }}</h1>
          <h1 class="dose-vacina">{{ dose.dosevacina }}</h1>
        </ion-item>
        <ion-item>
          <ion-label>Vacina foi tomada?</ion-label>
          <ion-toggle [(ngModel)]="foiTomada" #foiTomadaDom="ngModel"></ion-toggle>
        </ion-item>
        <ion-item no-lines>
          <ion-label>Data em que a dose foi tomada</ion-label>
        </ion-item>
        <ion-item>
          <ion-datetime displayFormat="DD MMMM YYYY" [(ngModel)]="dataTomada" name="data-tomada" cancelText="Cancelar" doneText="Selecionar" placeholder="Selecione aqui a data (opcional)" #dataTomadaDom="ngModel"></ion-datetime>
        </ion-item>
        <ion-item text-center>
          <button ion-button outline large [disabled]="!foiTomadaDom.touched && !dataTomadaDom.touched" (click)="salvar()">Salvar</button>
        </ion-item>
      </ion-list>
    </ion-content>
  `
})
export class MarcarVacinaModalComponent {

  dose: Dose;
  caderneta: Caderneta;

  foiTomada: boolean;
  dataTomada: string;

  constructor(public platform: Platform, public params: NavParams, public viewCtrl: ViewController,
              private loadingCtrl: LoadingController, public toastCtrl: ToastController,
              private cadernetaRepository: CadernetaRepository) {
    this.caderneta = this.params.get('caderneta');
    this.dose = this.params.get('dose');

    this.foiTomada = this.doseFoiTomada();
    this.dataTomada = this.dataFoiTomada();
  }

  private doseFoiTomada() {
    return this.caderneta && this.caderneta.doses && this.caderneta.doses[this.dose.chavedose] && this.caderneta.doses[this.dose.chavedose].tomada;
  }

  private dataFoiTomada() {
    if (this.caderneta && this.caderneta.doses && this.caderneta.doses[this.dose.chavedose]) {
      return this.caderneta.doses[this.dose.chavedose].dataTomada;
    }
  }

  salvar() {
    if (!this.caderneta) {
      let toast = this.toastCtrl.create({
        message: 'Se você estivesse em uma caderneta, neste momento a vacina teria sido marcada como tomada! Crie sua caderneta e veja muito mais!',
        showCloseButton: true,
        closeButtonText: 'Ok',
        duration: 12000,
        position: 'bottom'
      });
      toast.present(toast);
      this.viewCtrl.dismiss();
      return;
    }

    let salvando = this.loadingCtrl.create({
      content: "Salvando..."
    });
    salvando.present();
    this.viewCtrl.dismiss();

    if (this.foiTomada) {
      this.gravarComoTomada();
    } else {
      this.apagarComoTomada();
    }

    this.cadernetaRepository.salvar(this.caderneta).then(() => {
      salvando.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Marcação gravada com sucesso',
        duration: 2000,
        position: 'bottom'
      });
      toast.present(toast);
    });
  }

  private gravarComoTomada() {
    if (!this.caderneta.doses) {
      this.caderneta.doses = {};
    }
    this.caderneta.doses[this.dose.chavedose] = this.caderneta.doses[this.dose.chavedose] || {};
    this.caderneta.doses[this.dose.chavedose].tomada = true;
    if (this.dataTomada && this.dataTomada.length > 0) {
      this.caderneta.doses[this.dose.chavedose].dataTomada = this.dataTomada;
    }
  }

  private apagarComoTomada() {
    if (!this.caderneta.doses) {
      this.caderneta.doses = {};
    }
    delete this.caderneta.doses[this.dose.chavedose];
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  //noinspection JSMethodCanBeStatic
  _idadeEmMesesPorExtenso(yyyymmdd) {
    return idadeEmMesesPorExtenso(yyyymmdd); // duplicado em caderneta.component.ts e descricao-vacina.component.ts
  }

  //noinspection JSMethodCanBeStatic
  _imagemGenero(caderneta: Caderneta) {
    return `assets/icon/sexo-${caderneta.sexo}.png`; // duplicado em caderneta.component.ts e descricao-vacina.component.ts
  }

}
