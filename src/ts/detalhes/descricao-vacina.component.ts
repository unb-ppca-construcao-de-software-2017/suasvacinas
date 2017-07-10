import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Observable} from "rxjs/Observable";
import {DescricaoVacina, VacinasRepository} from "../firebase/vacinas.repository";
import {Caderneta, idadeEmMesesPorExtenso} from "../caderneta/caderneta.model";

@Component({
  selector: 'vacinas-descricao-vacina',
  styles: [`
    p.detalhesvacina {
      float: right;
      margin-right: 10px;
      color: gray;
      max-width: 22%;
      margin-top: -1px;
      text-align: center;
    }
    .nomevacina {
      padding: 0 5px 5px 20px;
    }
    .bg-style {
      background: #ecf4f7;
    }
    p.fonte {
      margin-top: 10px;
    }
    ion-card-header {
      font-weight: bold;
    }
    span.quebra-linha {
      white-space: pre-line;
    }
    .imagem-genero {
      /* duplicado em caderneta.component.ts e + */
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
      
      <vacinas-loading *ngIf="!(vacina | async)"></vacinas-loading>
      
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
      
      <div *ngIf="(vacina | async)">
        <p class="detalhesvacina">Detalhes da Vacina</p>
        <h1 class="nomevacina">{{ (vacina | async)?.nomevacina }}</h1>
        <ion-card *ngIf="(vacina|async)?.doses?.length">
          <ion-card-header>Doses</ion-card-header>
          <ion-card-content>
            <vacinas-dose [dose]="dose" *ngFor="let dose of (vacina|async)?.doses" [dentroDeDescricaoVacina]="true"></vacinas-dose>
          </ion-card-content>
        </ion-card>
        <ion-card *ngIf="(vacina|async)?.descricao.texto !== '-'"><ion-card-header>Descrição</ion-card-header><ion-card-content><span class="quebra-linha">{{ (vacina | async)?.descricao.texto }}</span><p class="fonte">Fonte: {{ (vacina | async)?.descricao.fonte }}</p></ion-card-content></ion-card>
        <ion-card *ngIf="(vacina|async)?.redepublica.texto !== '-'"><ion-card-header>Rede Pública</ion-card-header><ion-card-content><span class="quebra-linha">{{ (vacina | async)?.redepublica.texto }}</span><p class="fonte">Fonte: {{ (vacina | async)?.redepublica.fonte }}</p></ion-card-content></ion-card>
        <ion-card *ngIf="(vacina|async)?.variacao.texto !== '-'"><ion-card-header>Variação (Rede Privada)</ion-card-header><ion-card-content><span class="quebra-linha">{{ (vacina | async)?.variacao.texto }}</span><p class="fonte">Fonte: {{ (vacina | async)?.variacao.fonte }}</p></ion-card-content></ion-card>
        <ion-card *ngIf="(vacina|async)?.comentarios.texto !== '-'"><ion-card-header>Outros dados</ion-card-header><ion-card-content><span class="quebra-linha">{{ (vacina | async)?.comentarios.texto }}</span><p class="fonte">Fonte: {{ (vacina | async)?.comentarios.fonte }}</p></ion-card-content></ion-card>
      </div>
    </ion-content>

    <ion-footer>
      <vacinas-footer></vacinas-footer>
    </ion-footer>
  `
})
export class DescricaoVacinaComponent {

  vacina: Observable<DescricaoVacina>;

  caderneta: Caderneta;

  constructor(public navCtrl: NavController, public navParams: NavParams, public vacinasRepository: VacinasRepository) {
    this.caderneta = navParams.get('caderneta');

    let chaveVacina = navParams.get('nomevacina');
    this.vacina = this.vacinasRepository.getDescricaoVacina(chaveVacina);
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
