import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {IdadeDose, VacinasRepository} from "../firebase/vacinas.repository";
import {Observable} from "rxjs/Observable";
import {DescricaoVacinaComponent} from "../detalhes/descricao-vacina.component";
import {VacinasLogInComponent} from "../login/vacinas-login.component";
import {AutenticacaoService} from "../firebase/autenticacao.service";
import {Caderneta, idadeEmMeses, idadeEmMesesPorExtenso, mesesPorExtenso} from "../caderneta/caderneta.model";
import {GoogleAnalytics} from "../../app/google-analytics";
import {DosesAtrasadasEProximas} from "../caderneta/caderneta.service";

@Component({
  selector: 'vacinas-doses-lista',
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
            Abaixo as doses recomendadas <span class="idade-escolhida">{{ idadeEscolhida }}</span>.<br>
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
                  <span *ngIf="caderneta.datanascimento">{{ _idadeEmMesesPorExtenso(caderneta.datanascimento) }} -</span>
                  <img class="imagem-genero" [src]="_imagemGenero(caderneta)" [alt]="caderneta.sexo">
                </ion-card-content>

              </ion-card>
            </div>
          </ion-col>
        </ion-row>
        <ion-row *ngIf="caderneta">
          <ion-col col-12>
            <div style="text-align: center; font-size: 90%">
              Abaixo as doses recomendadas <span class="idade-escolhida">{{ idadeEscolhida }}</span>.<br>
              Conheça detalhes e <b>marque</b> as que já foram tomadas.
            </div>
          </ion-col>
        </ion-row>
        
      </ion-grid>
      
      <vacinas-loading *ngIf="!(idadeDoses | async)"></vacinas-loading>
      
      <ion-card *ngFor="let idadeDose of idadeDoses | async">
        <ion-card-header>
          {{ idadeDose.idadeDose }}
        </ion-card-header>
        <ion-card-content>
          <ion-list>
            <vacinas-dose [caderneta]="caderneta" [dose]="dose" *ngFor="let dose of idadeDose.doses"></vacinas-dose>
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

  constructor(private autenticacaoService: AutenticacaoService, public navCtrl: NavController, public navParams: NavParams, public vacinasRepository: VacinasRepository) {
    GoogleAnalytics.sendPageViewForPage('/doses');
    this.autenticado = autenticacaoService.isAutenticado();

    this.caderneta = navParams.get('caderneta');

    if (this.caderneta) {
      let emMeses = idadeEmMeses(this.caderneta.datanascimento);
      if (emMeses < 0) {
        // ainda nao nasceu, exibimos dois meses
        this.meses = DosesAtrasadasEProximas.MESES_CORTE;
      } else {
        // fluxo geral, exibimos até três meses além da idade atual
        this.meses = emMeses + DosesAtrasadasEProximas.MESES_CORTE;
      }
      if (emMeses >= 9999) {
        this.idadeEscolhida = 'para todas as idades';
      } else {
        this.idadeEscolhida = 'até ' + mesesPorExtenso(this.meses);
      }
      this.idadeDoses = this.vacinasRepository.getDosesAtehMeses(this.meses);
    } else {
      this.meses = navParams.get('meses');
      this.idadeDoses = this.vacinasRepository.getDosesAtehMeses(this.meses);

      let idade = navParams.get('idadeEscolhida').toLowerCase();
      if (idade.indexOf('nascer') > -1 || idade.indexOf('até') > -1) {
        this.idadeEscolhida = idade;
      } else if (idade.indexOf('mais') > -1) {
        this.idadeEscolhida = 'para ' + idade;
      } else {
        this.idadeEscolhida = 'até ' + idade;
      }
    }

  }

  abrirVacina(nomevacina: string) {
    this.navCtrl.push(DescricaoVacinaComponent, { nomevacina: nomevacina, caderneta: this.caderneta });
  }

  irParaLogin(): void {
    this.navCtrl.push(VacinasLogInComponent, { ocultarTextoCuriosidade: true });
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
