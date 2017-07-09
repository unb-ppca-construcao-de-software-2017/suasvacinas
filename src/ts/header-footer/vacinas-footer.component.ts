import { Component } from '@angular/core';
import {AutenticacaoService} from "../firebase/autenticacao.service";
import {Observable} from "rxjs/Observable";

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
          
        <span *ngIf="(autenticado | async)?.naoLogado;else usuario_logado">
        <button ion-button outline small class="cadastrese">
        <span class="branco">quem é você?</span>
        &nbsp;&nbsp;<ion-icon name="logo-facebook" class="branco"></ion-icon>
        &nbsp;<ion-icon name="logo-google" class="branco"></ion-icon>
        &nbsp;<ion-icon name="logo-twitter" class="branco"></ion-icon></button>!
        </span>
        <ng-template #usuario_logado>{{ (autenticado | async)?.nome }}!</ng-template></p>
        
        
      </ion-title>
      <ion-buttons end>
        <button ion-button icon-right color="royal">
          <ion-icon name="bookmarks"></ion-icon> &nbsp;&nbsp;
        </button>
      </ion-buttons>
    </ion-toolbar>
  `
})
export class VacinasFooterComponent {

  autenticado: Observable<any>;

  constructor(private autenticacaoService: AutenticacaoService) {
    this.autenticado = autenticacaoService.isAutenticado();
  }

}
