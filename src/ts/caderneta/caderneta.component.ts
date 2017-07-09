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
        <ion-col offset-1 col-10 class="texto-centralizado">
        
          <h1>Cadernetas</h1>

          <br>

          <vacinas-loading *ngIf="!(cadernetaRepository.cadernetas$ | async)"></vacinas-loading>

          <ion-card *ngIf="(cadernetaRepository.cadernetas$ | async) && !(cadernetaRepository.cadernetas$ | async)?.length">
            <ion-card-content>
            Você ainda não tem nenhuma caderneta criada.<br>Vamos <a (click)="novaCaderneta()">criar a primeira</a>?
            </ion-card-content>
          </ion-card>
          
          <ion-card *ngFor="let caderneta of cadernetaRepository.cadernetas$ | async">
            
            <ion-card-header>
              {{ caderneta.nome }}
            </ion-card-header>
            <ion-card-content>
              {{ caderneta.datanascimento }} - {{ caderneta.sexo }}

              <ion-buttons item-end>
                <button ion-button outline icon-only>
                  <ion-icon name="open-outline"></ion-icon>
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

}
