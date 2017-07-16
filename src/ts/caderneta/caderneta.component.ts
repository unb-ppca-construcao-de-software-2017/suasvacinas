import {Component} from "@angular/core";
import {AutenticacaoService} from "../firebase/autenticacao.service";
import {NavController} from "ionic-angular";
import {CadernetaNovaComponent} from "./caderneta-nova.component";
import {CadernetaRepository} from "./caderneta.repository";
import {Caderneta, cadernetaDosesTomadas, idadeEmMesesPorExtenso} from "./caderneta.model";
import {Observable} from "rxjs/Observable";
import {DosesComponent} from "../doses/doses.component";
import {CadernetaService, DosesAtrasadasEProximas} from "./caderneta.service";
import {GoogleAnalytics} from "../../app/google-analytics";

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
    .doses-aviso {
      font-size: 95%;
      display: inline-block;
      min-width: 170px;
    }
    .aviso-tomadas   { color: #6d89b3; }
    .aviso-atrasadas { color: #bf5153; }
    .aviso-proximos  { color: #53b32f; }
    @media (max-width: 720px) {
      .aviso-proximos  { margin-top: 2px; }
    }
    .coluna-avisos {
      margin-top: 8px;
      margin-left: 5px;
    }
    .abrir-caderneta {
      margin-left: -10px;
      width: 35px;
    }
    @media (min-width:450px) {
      .abrir-caderneta {
        margin-left: auto;
      }
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
          <ion-col col-sm-9 col-10 text-left class="coluna-avisos">
            <span class="doses-aviso aviso-tomadas"   clear small icon-start><ion-icon name="md-done-all">               </ion-icon>{{ _cadernetaDosesTomadas(caderneta) }}</span>
            <span *ngIf="caderneta?.datanascimento" class="doses-aviso aviso-atrasadas" clear small icon-start><ion-icon name="clock-outline">             </ion-icon>{{ (cadernetaDosesAtrasadasEProximas(caderneta) | async)?.atrasadas }}</span>
            <span *ngIf="caderneta?.datanascimento" class="doses-aviso aviso-proximos"  clear small icon-start><ion-icon name="information-circle-outline"></ion-icon>{{ (cadernetaDosesAtrasadasEProximas(caderneta) | async)?.proximas }}</span>
          </ion-col>
          <ion-col col-sm-2 col-1 align-self-center text-right>
            <ion-note>
              <ion-buttons>
                <button ion-button outline small icon-only (click)="editarCaderneta(caderneta)" class="abrir-caderneta">
                  <ion-icon name="md-create"></ion-icon>
                </button>
                <button ion-button outline small icon-only (click)="abrirCaderneta(caderneta)" class="abrir-caderneta">
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

  private cacheDosesAtrasadasEProximas: any = {};

  constructor(private autenticacaoService: AutenticacaoService, private navCtrl: NavController,
              public cadernetaRepository: CadernetaRepository, private cadernetaService: CadernetaService) {
    autenticacaoService.isAutenticado();
    this.cadernetas = cadernetaRepository.cadernetas$;
  }

  novaCaderneta(): void {
    GoogleAnalytics.sendEvent('click', "Caderneta:Nova:AbrirForm");
    this.navCtrl.push(CadernetaNovaComponent);
  }

  abrirCaderneta(caderneta): void {
    GoogleAnalytics.sendEvent('click', "Caderneta:Abrir");
    this.navCtrl.push(DosesComponent, {caderneta: caderneta});
  }

  editarCaderneta(caderneta): void {
    GoogleAnalytics.sendEvent('click', "Caderneta:Editar");
    this.navCtrl.push(CadernetaNovaComponent, {caderneta: caderneta});
  }

  //noinspection JSMethodCanBeStatic
  _idadeEmMesesPorExtenso(yyyymmdd) {
    return idadeEmMesesPorExtenso(yyyymmdd); // duplicado em doses.component.ts
  }

  //noinspection JSMethodCanBeStatic
  _imagemGenero(caderneta: Caderneta) {
    return `assets/icon/sexo-${caderneta.sexo}.png`; // duplicado em doses.component.ts
  }

  //noinspection JSMethodCanBeStatic
  _cadernetaDosesTomadas(caderneta: Caderneta) {
    return cadernetaDosesTomadas(caderneta);
  }

  cadernetaDosesAtrasadasEProximas(caderneta: Caderneta): Observable<DosesAtrasadasEProximas> {
    let valorNaoCacheadoOuDesatualizado = !this.cacheDosesAtrasadasEProximas[caderneta.nome] || this.cacheDosesAtrasadasEProximas[caderneta.nome].desatualizado;
    if (valorNaoCacheadoOuDesatualizado) {
      this.cacheDosesAtrasadasEProximas[caderneta.nome] = {
        caderneta: this.cadernetaService.cadernetaDosesAtrasadasEProximas(caderneta),
        desatualizado: false
      };
      // marca como desatualizado apos 4s
      setTimeout(() => {
        if (this.cacheDosesAtrasadasEProximas[caderneta.nome]) {
          this.cacheDosesAtrasadasEProximas[caderneta.nome].desatualizado = true;
        }
      }, 4000);
    }
    return this.cacheDosesAtrasadasEProximas[caderneta.nome].caderneta;
  }

}
