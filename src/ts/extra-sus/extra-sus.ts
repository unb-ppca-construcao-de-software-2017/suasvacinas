import {Component} from "@angular/core";
import "rxjs/add/operator/pluck";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import {NavController} from "ionic-angular";
import {DescricaoVacinaComponent} from "../detalhes/descricao-vacina.component";

@Component({
  selector: 'vacinas-extra-sus',
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content padding>
      <h1>
      A relação abaixo contém as principais vacinas que não fazem parte da rede do SUS:
      </h1>
      <button ion-item *ngFor="let v of vacinas" (click)="abrirVacina(v.nome)">
        {{v.descricao}}
      </button>
    </ion-content>
  `
})
export class VacinasExtraSUSComponent {

  vacinas: any[] = [
    {nome: "Penta/DTP", descricao: "Pentavalente Acelular"},
    {nome: "Hexavalente acelular", descricao: "Hexavalente Acelular"},
    {nome: "Meningocócica B", descricao: "Meningocócica B"},
    {nome: "Meningocócica ACWY", descricao: "Meningocócica ACWY"},
    {nome: "Pneumocócia (conjugada)", descricao: "Pneumocócica 13-Valente"},
    {nome: "Rotavírus Humano", descricao: "Rotavírus Humano Pentavalente"},
    {nome: "Influenza (gripe)", descricao: "Gripe (Influenza) (a partir de 5 anos)"},
    {nome: "Varicela (catapora)", descricao: "Catapora (Varicela) - Segunda Dose"},
    {nome: "Dengue", descricao: "Dengue (a partir de 9 anos)"}
  ];

  constructor(public navCtrl: NavController) {

  }

  abrirVacina(nomevacina: string) {
    this.navCtrl.push(DescricaoVacinaComponent, { nomevacina: nomevacina });
  }
}
