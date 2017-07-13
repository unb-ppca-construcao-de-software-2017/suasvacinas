import {AfterViewInit, Component, Input} from "@angular/core";
import {NavController} from "ionic-angular";
import {SubOpcao, VacinasRepository} from "../firebase/vacinas.repository";
import {Observable} from "rxjs/Observable";
import {OpcoesComponent} from "./opcoes";
import {DosesComponent} from "../doses/doses.component";
import {GoogleAnalytics} from "../../app/google-analytics";

@Component({
  selector: 'vacina-opcao',
  styles: [`
    .pergunta {
      white-space: pre-line;
      text-align: center;
    }
    .botao-pessoa {
      margin-bottom: 15px;
    }
  `],
  template: `
    <vacinas-loading *ngIf="!(descricao | async)"></vacinas-loading>

    <h3 class="pergunta">{{ descricao | async }}</h3>
    <div *ngFor="let subOpcao of subOpcoes | async">
      <button ion-button large block class="botao-pessoa" (click)="abrirOpcao(subOpcao)">{{ subOpcao.titulo }}</button>
    </div>
  `
})
export class OpcaoComponent implements AfterViewInit {

  @Input() chave: string;

  descricao: Observable<string>;
  subOpcoes: Observable<SubOpcao[]>;

  constructor(public navCtrl: NavController, public vacinasRepository: VacinasRepository) { }

  ngAfterViewInit(): void {
    let opcao = this.vacinasRepository.getOpcao(this.chave);
    this.descricao = opcao.pluck('descricao');
    this.subOpcoes = opcao.pluck('subOpcoes');
  }

  abrirOpcao(subOpcao: SubOpcao) {
    if (subOpcao.tipo === "dose") {
      GoogleAnalytics.sendEvent('click', "Doses-Abrir", this.chave + "-" + subOpcao.titulo);
      this.navCtrl.push(DosesComponent, {meses: subOpcao.meses, origem: this.chave, idadeEscolhida: subOpcao.titulo});
    } else {
      GoogleAnalytics.sendEvent('click', "Opcoes", subOpcao.chave);
      this.navCtrl.push(OpcoesComponent, {chave: subOpcao.chave});
    }
  }

}
