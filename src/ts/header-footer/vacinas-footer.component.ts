import { Component } from '@angular/core';
import {AutenticacaoService} from "../firebase/autenticacao.service";
import {Observable} from "rxjs/Observable";
import {VacinasLogInComponent} from "../login/vacinas-login.component";
import {NavController} from "ionic-angular";
import {TourComponent} from "../tour/tour.component";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'vacinas-footer',
  styles: [`
    .cadastrese {
      margin-top: -16px;
      margin-bottom: -4px;
      border-color: white;
    }
    .branco {
      color: white !important;
    }
    .saudacoes {
      color: white !important;
      font-weight: bold !important;
    }
  `],
  template: `
    <ion-toolbar color="primary">
      <button ion-button menuToggle>
        <ion-icon name="menu"></ion-icon>
      </button>
      <ion-title>
        <p class="saudacoes">Oi, 
          
          <span *ngIf="(autenticado | async)?.logado;else botao_quem_eh_voce">{{ (autenticado | async)?.nome }}!</span>
          <ng-template #botao_quem_eh_voce>
            <button ion-button outline small class="cadastrese" (click)="irParaLogin()">
            <span class="branco">quem é você?</span>
            &nbsp;&nbsp;<ion-icon name="logo-facebook" class="branco"></ion-icon>
            &nbsp;<ion-icon name="logo-google" class="branco"></ion-icon>
            &nbsp;<ion-icon name="logo-twitter" class="branco"></ion-icon></button>
          </ng-template>
        </p>
        
        
      </ion-title>
      <ion-buttons end>
        <span *ngIf="(autenticado | async)?.logado;else caderneta_abrirah_tour">
          <button ion-button icon-right color="royal" (click)="irParaCaderneta()">
            <ion-icon name="bookmarks"></ion-icon> &nbsp;&nbsp;
          </button>
        </span>
        <ng-template #caderneta_abrirah_tour>
          <button ion-button icon-right color="royal" (click)="irParaTour()">
            <ion-icon name="bookmarks"></ion-icon> &nbsp;&nbsp;
          </button>
        </ng-template>
      </ion-buttons>
    </ion-toolbar>
  `
})
export class VacinasFooterComponent {

  autenticado: Observable<any>;

  constructor(private autenticacaoService: AutenticacaoService, private navCtrl: NavController) {
    this.autenticado = autenticacaoService.isAutenticado();
  }

  irParaLogin(): void {
    this.navCtrl.push(VacinasLogInComponent);
  }

  irParaCaderneta(): void {
    this.navCtrl.push(HomeComponent);
  }

  irParaTour(): void {
    this.navCtrl.push(TourComponent, {args: {msg: "sua caderneta, a do seu filho", chave: "meu-filho"}}); // duplicado de tour-home.component.ts
  }

}
