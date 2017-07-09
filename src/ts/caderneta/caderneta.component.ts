import {Component} from "@angular/core";
import {AutenticacaoService} from "../firebase/autenticacao.service";
import {NavController} from "ionic-angular";
import {CadernetaNovaComponent} from "./caderneta-nova.component";
import {CadernetaRepository} from "./caderneta.repository";
import {Caderneta, idadeEmMesesPorExtenso} from "./caderneta.model";
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
  `],
  template: `
    <ion-grid>
      <ion-row>
        <ion-col offset-1 col-10 class="texto-centralizado">
        
          <h1>Cadernetas</h1>

          <br>

          <vacinas-loading *ngIf="!(cadernetaRepository.cadernetas$ | async)"></vacinas-loading>

          <ion-card *ngIf="(cadernetaRepository.cadernetas$ | async) && !(cadernetaRepository.cadernetas$ | async)?.length">
            <ion-card-content>
            Você ainda não tem nenhuma caderneta criada.<br><br>Vamos <a (click)="novaCaderneta()">criar a primeira</a>?
            </ion-card-content>
          </ion-card>
          
          <ion-card *ngFor="let caderneta of cadernetaRepository.cadernetas$ | async">
            
            <ion-card-header>
              {{ caderneta.nome }}
            </ion-card-header>
            <ion-card-content>
              {{ _idadeEmMesesPorExtenso(caderneta.datanascimento) }} de idade - <img class="imagem-genero" [src]="_imagemGenero(caderneta)" [alt]="caderneta.sexo">

              <ion-buttons item-end>
                <button ion-button outline icon-only (click)="abrirCaderneta(caderneta)">
                  <ion-icon name="folder-open-outline"></ion-icon>
                </button>
              </ion-buttons>
            </ion-card-content>
            
          </ion-card>

          <br><br>

          <button ion-button outline item-end icon-left (click)="novaCaderneta()">
            <ion-icon name="add"></ion-icon>
            Nova Caderneta
          </button>
          
        </ion-col>
      </ion-row>
    </ion-grid>
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

}
