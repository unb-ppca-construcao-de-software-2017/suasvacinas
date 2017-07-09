import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {Observable} from "rxjs/Observable";
import {DescricaoVacina, Dose, VacinasRepository} from "../firebase/vacinas.repository";

@Component({
  selector: 'vacinas-descricao-vacina',
  styles: [`
    p.detalhesvacina {
      float: right;
      margin-right: 10px;
      color: gray;
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
  `],
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content class="bg-style">
      <p class="detalhesvacina">Detalhes da Vacina</p>
      <h1 class="nomevacina">{{ (vacina | async)?.nomevacina }}</h1>
      <ion-card *ngIf="(doses|async)?.length > 0">
        <ion-card-header>Doses</ion-card-header>
        <ion-card-content>
          <vacinas-dose [dose]="dose" *ngFor="let dose of doses | async" [dentroDeDescricaoVacina]="true"></vacinas-dose>
        </ion-card-content>
      </ion-card>
      <ion-card *ngIf="(vacina|async)?.descricao.texto !== '-'"><ion-card-header>Descrição</ion-card-header><ion-card-content><span class="quebra-linha">{{ (vacina | async)?.descricao.texto }}</span><p class="fonte">Fonte: {{ (vacina | async)?.descricao.fonte }}</p></ion-card-content></ion-card>
      <ion-card *ngIf="(vacina|async)?.redepublica.texto !== '-'"><ion-card-header>Rede Pública</ion-card-header><ion-card-content><span class="quebra-linha">{{ (vacina | async)?.redepublica.texto }}</span><p class="fonte">Fonte: {{ (vacina | async)?.redepublica.fonte }}</p></ion-card-content></ion-card>
      <ion-card *ngIf="(vacina|async)?.variacao.texto !== '-'"><ion-card-header>Variação (Rede Privada)</ion-card-header><ion-card-content><span class="quebra-linha">{{ (vacina | async)?.variacao.texto }}</span><p class="fonte">Fonte: {{ (vacina | async)?.variacao.fonte }}</p></ion-card-content></ion-card>
      <ion-card *ngIf="(vacina|async)?.comentarios.texto !== '-'"><ion-card-header>Outros dados</ion-card-header><ion-card-content><span class="quebra-linha">{{ (vacina | async)?.comentarios.texto }}</span><p class="fonte">Fonte: {{ (vacina | async)?.comentarios.fonte }}</p></ion-card-content></ion-card>
    </ion-content>

    <ion-footer>
      <vacinas-footer></vacinas-footer>
    </ion-footer>
  `
})
export class DescricaoVacinaComponent {

  vacina: Observable<DescricaoVacina>;
  doses: Observable<Dose[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public vacinasRepository: VacinasRepository) {
    let chaveVacina = navParams.get('nomevacina');
    this.vacina = this.vacinasRepository.getDescricaoVacina(chaveVacina);
    this.doses = this.vacinasRepository.getDosesVacina(chaveVacina);
  }

}
