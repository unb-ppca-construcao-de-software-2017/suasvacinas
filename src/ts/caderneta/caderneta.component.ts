import { Component } from '@angular/core';
import {AutenticacaoService} from "../firebase/autenticacao.service";
import {NavController} from "ionic-angular";
import {CadernetaNovaComponent} from "./caderneta-nova.component";
import {CadernetaRepository} from "./caderneta.repository";
import {Caderneta} from "./caderneta.model";
import {Observable} from "rxjs/Observable";

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

          <ion-card *ngIf="!(cadernetas | async) || !(cadernetas | async)?.length">
            Você não tem nenhuma caderneta criada.
          </ion-card>
          <ion-card *ngFor="let caderneta of cadernetas | async">
            <ion-card-header>
              {{ caderneta.nome }}
            </ion-card-header>
            <ion-card-content>
              {{ caderneta.datanascimento }} - {{ caderneta.sexo }}
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

  constructor(private autenticacaoService: AutenticacaoService, private navCtrl: NavController, private cadernetaRepository: CadernetaRepository) {
    autenticacaoService.isAutenticado();
    this.cadernetas = cadernetaRepository.getCadernetasDoUsuarioLogado();
  }

  novaCaderneta(): void {
    this.navCtrl.push(CadernetaNovaComponent);
  }

}
