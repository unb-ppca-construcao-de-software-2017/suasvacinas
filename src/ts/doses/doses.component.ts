import { Component } from '@angular/core';
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
    .imagem-genero {
      /* duplicado em caderneta.component.ts */
      height: 16px;
      width: auto;
      display: inline-block;
      margin-bottom: -2px;
    }
  `],
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content class="bg-style">
      <ion-grid>
        <ion-row *ngIf="!caderneta">
          <ion-col col-12>
            <div style="text-align: center">
            Abaixo as doses recomendadas até <span class="idade-escolhida">{{ idadeEscolhida }}</span>.<br>
            Conheça detalhes e <b>marque as que já tomou</b>.<br>

              <button ion-button outline small (click)="irParaLogin()">
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

        <ion-row *ngIf="caderneta">
          <ion-col offset-1 col-10>
            <div style="text-align: center">
              <ion-card>

                <ion-card-header>
                  {{ caderneta.nome }}
                </ion-card-header>
                <ion-card-content>
                  {{ _idadeEmMesesPorExtenso(caderneta.datanascimento) }} de idade - <img class="imagem-genero" [src]="_imagemGenero(caderneta)" [alt]="caderneta.sexo">
                </ion-card-content>

              </ion-card>
            </div>
          </ion-col>
        </ion-row>
        <ion-row *ngIf="caderneta">
          <ion-col col-12>
            <div style="text-align: center">
              Abaixo as doses recomendadas até <span class="idade-escolhida">{{ idadeEscolhida }}</span>.<br>
              Conheça detalhes e <b>marque</b> as que já foram tomadas.
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
                <button ion-fab color="light" mini (click)="abrirActionSheetDose(dose)"><ion-icon name="checkbox-outline"></ion-icon></button>
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

  caderneta: Caderneta;

  autenticado: Observable<any>;

  constructor(private autenticacaoService: AutenticacaoService, public navCtrl: NavController,
              public navParams: NavParams, public vacinasRepository: VacinasRepository, public actionSheetCtrl: ActionSheetController) {
    this.autenticado = autenticacaoService.isAutenticado();

    this.caderneta = navParams.get('caderneta');

    if (this.caderneta) {
      this.meses = idadeEmMeses(this.caderneta.datanascimento) + 3;
      this.idadeEscolhida = mesesPorExtenso(this.meses);
      this.idadeDoses = this.vacinasRepository.getDosesAtehMeses(this.meses);

      // TODO varrer caderneta e marcar na tela as doses que foram tomadas
      // TODO (ou fazer isso direto no template, talvez seja mais simples)
    } else {
      this.meses = navParams.get('meses');
      this.idadeEscolhida = navParams.get('idadeEscolhida').toLowerCase();
      this.idadeDoses = this.vacinasRepository.getDosesAtehMeses(this.meses);
    }

  }

  abrirVacina(nomevacina: string) {
    this.navCtrl.push(DescricaoVacinaComponent, { nomevacina: nomevacina });
  }

  irParaLogin(): void {
    this.navCtrl.push(VacinasLogInComponent);
  }

  //noinspection JSMethodCanBeStatic
  _idadeEmMesesPorExtenso(yyyymmdd) {
    return idadeEmMesesPorExtenso(yyyymmdd); // duplicado em caderneta.component.ts
  }

  //noinspection JSMethodCanBeStatic
  _imagemGenero(caderneta: Caderneta) {
    return `assets/icon/sexo-${caderneta.sexo}.png`; // duplicado em caderneta.component.ts
  }

  abrirActionSheetDose(dose: Dose) {
    let actionSheet = this.actionSheetCtrl.create({
      title: `${dose.nome} - ${dose.dose}`,
      buttons: [
        {
          text: 'Marcar dose como já tomada',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Ver mais informações sobre ' + dose.nome,
          handler: () => {
            console.log('Archive clicked');
          }
        },{
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
