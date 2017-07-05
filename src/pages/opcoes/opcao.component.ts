import {AfterViewInit, Component, Input} from "@angular/core";
import {NavController} from "ionic-angular";
import {Opcao, SubOpcao, VacinasRepository} from "../../providers/firebase/vacinas.repository";
import {Observable} from "rxjs/Observable";
import {OpcoesComponent} from "./opcoes";
import {DosesComponent} from "../doses/doses.component";

@Component({
  selector: 'vacina-opcao',
  template: `
    <h1 class="pergunta">{{ descricao | async }}</h1>
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
    this.subOpcoes = opcao.map((x: Opcao) => x.subOpcoes);
  }

  abrirOpcao(subOpcao: SubOpcao) {
    if (subOpcao.tipo === "dose") {
      this.navCtrl.push(DosesComponent, {chave: subOpcao.chave, origem: this.chave});
    } else {
      this.navCtrl.push(OpcoesComponent, {chave:  subOpcao.chave});
    }
  }

}
