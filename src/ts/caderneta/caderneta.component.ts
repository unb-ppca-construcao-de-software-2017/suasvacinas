import {Component} from "@angular/core";
import {AutenticacaoService} from "../firebase/autenticacao.service";
import {NavController} from "ionic-angular";
import {CadernetaNovaComponent} from "./caderneta-nova.component";
import {CadernetaRepository} from "./caderneta.repository";
import {Caderneta, cadernetaDosesTomadas, idadeEmMesesPorExtenso} from "./caderneta.model";
import {Observable} from "rxjs/Observable";
import {DosesComponent} from "../doses/doses.component";

@Component({
  selector: 'vacinas-caderneta',
  styles: [`
    .imagem-genero {
      /* duplicado em doses.component.ts */
      height: 16px;
      width: auto;
      display: inline-block;
      margin-bottom: -2px;
    }
    .cor-maisoumenos {
      color: #6d89b3;
    }
    .doses-tomadas {
      font-size: 95%;
      display: inline-block;
      min-width: 170px;
      color: #6d89b3;
      margin-top: 8px;
      margin-left: 5px;
    }
  `],
  template: `
    <div text-center>
      <h1>Cadernetas</h1>

      <vacinas-loading *ngIf="!(cadernetaRepository.cadernetas$ | async)"></vacinas-loading>

      <ion-card *ngIf="(cadernetaRepository.cadernetas$ | async) && !(cadernetaRepository.cadernetas$ | async)?.length">
        <ion-card-content>
        Você ainda não tem nenhuma caderneta criada.<br><br>Vamos <a (click)="novaCaderneta()">criar a primeira</a>?
        </ion-card-content>
      </ion-card>
      
      <ion-card *ngFor="let caderneta of cadernetaRepository.cadernetas$ | async">

        <ion-card-header text-center>
          {{ caderneta.nome }}
        </ion-card-header>
        <p><span *ngIf="caderneta.datanascimento">{{ _idadeEmMesesPorExtenso(caderneta.datanascimento) }}</span>
          <img item-end class="imagem-genero" [src]="_imagemGenero(caderneta)" [alt]="caderneta.sexo"></p>
        <ion-row>
          <ion-col text-left>
            <span class="cor-maisoumenos doses-tomadas" clear small icon-start>
              <ion-icon name='done-all' name="md-done-all"></ion-icon>
              {{ _cadernetaDosesTomadas(caderneta) }}
            </span>
            <br>
            <button *ngIf="false" ion-button class="cor-maisoumenos" clear small icon-start>
              <ion-icon name='clock-outline'></ion-icon>
              4 nos próximos meses
            </button>
          </ion-col>
          <ion-col align-self-center text-right>
            <ion-note>
              <ion-buttons item-end>
                <button ion-button outline small icon-only (click)="abrirCaderneta(caderneta)">
                  <ion-icon name="folder-open-outline"></ion-icon>
                </button>
              </ion-buttons>
            </ion-note>
          </ion-col>
        </ion-row>
      </ion-card>

      <br><br>

      <button ion-button outline item-end icon-left (click)="novaCaderneta()">
        <ion-icon name="add"></ion-icon>
        Nova Caderneta
      </button>
    </div>
  `
})
export class CadernetaComponent {

  private cadernetas: Observable<Caderneta[]>;

  constructor(private autenticacaoService: AutenticacaoService, private navCtrl: NavController, public cadernetaRepository: CadernetaRepository) {
    autenticacaoService.isAutenticado();
    this.cadernetas = cadernetaRepository.cadernetas$;
  }

  novaCaderneta(): void {
    this.navCtrl.push(CadernetaNovaComponent);
  }

  abrirCaderneta(caderneta): void {
    this.navCtrl.push(DosesComponent, {caderneta: caderneta});
  }

  //noinspection JSMethodCanBeStatic
  _idadeEmMesesPorExtenso(yyyymmdd) {
    return idadeEmMesesPorExtenso(yyyymmdd); // duplicado em doses.component.ts
  }

  //noinspection JSMethodCanBeStatic
  _imagemGenero(caderneta: Caderneta) {
    return `assets/icon/sexo-${caderneta.sexo}.png`; // duplicado em doses.component.ts
  }

  _cadernetaDosesTomadas(caderneta: Caderneta) {
    return cadernetaDosesTomadas(caderneta);
  }

}
