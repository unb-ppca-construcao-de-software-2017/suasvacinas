import { Component } from '@angular/core';
import {AutenticacaoService} from "../firebase/autenticacao.service";
import {NavController} from "ionic-angular";
import {CadernetaNovaComponent} from "./caderneta-nova.component";

@Component({
  selector: 'vacinas-caderneta',
  styles: [`
  `],
  template: `
    <ion-grid>
      <ion-row>
        <ion-col offset-2 col-8 class="texto-centralizado">
        
          <h1>Cadernetas</h1>

          <br>
          
          <button ion-button outline item-end icon-left (click)="novaCaderneta()">
            <ion-icon name="add"></ion-icon>
            Nova Caderneta
          </button>
          
          <br><br>
          
          Você não tem nenhuma caderneta criada.

        </ion-col>
      </ion-row>
    </ion-grid>
  `
})
export class CadernetaComponent {

  constructor(private autenticacaoService: AutenticacaoService, private navCtrl: NavController) {
    autenticacaoService.isAutenticado();
  }

  novaCaderneta(): void {
    this.navCtrl.push(CadernetaNovaComponent);
  }

}
