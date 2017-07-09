import { Component, ViewChild } from '@angular/core';
import {AutenticacaoService} from "../firebase/autenticacao.service";
import {CadernetaRepository} from "./caderneta.repository";
import {Caderneta} from "./caderneta.model";
import {App} from "ionic-angular";
import {HomeComponent} from "../home/home.component";

@Component({
  selector: 'vacinas-caderneta-nova',
  styles: [`
    .centro {
      text-align: center;
    }
    .jogar-pro-centro-verticalmente {
      margin-top: 20%;
    }
    .aviso {
      color: #bf5153;
      font-size: 70%;
    }
  `],
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content padding>
      <ion-grid>
        <ion-row>
          <ion-col offset-1 col-10>
            <h1 class="centro">Nova caderneta</h1>

            <form #cadastroForm="ngForm">
              <ion-list>
                <ion-item>
                  <ion-label stacked>Nome da caderneta/pessoa</ion-label>
                  <ion-input type="text" required class="form-control" name="nome" minlength="3" [(ngModel)]="nome" #nomeDom="ngModel"></ion-input>
                </ion-item>

                <ion-item>
                  <ion-label stacked>Data de nascimento (opcional)</ion-label>
                  <ion-datetime displayFormat="DD MMMM YYYY" [(ngModel)]="data_nascimento" name="data-nascimento" cancelText="Cancelar" doneText="Selecionar"></ion-datetime>
                </ion-item>
              
                <ion-item>
                  <ion-label stacked>Incluir vacinas para</ion-label>
                  <ion-select [(ngModel)]="sexo" name="sexo" interface="popover">
                    <ion-option value="ambos" selected="true">Ambos os sexos</ion-option>
                    <ion-option value="feminino">Somente feminino</ion-option>
                    <ion-option value="masculino">Somente masculino</ion-option>
                  </ion-select>
                </ion-item>

                <ion-item>
                  <div class="centro">
                    <button ion-button outline large type="submit" [disabled]="!cadastroForm.valid" (click)="criarNovaCaderneta()">
                      Criar caderneta!
                    </button><br>
                  </div>
                  <div *ngIf="nomeDom.errors && (nomeDom.dirty || nomeDom.touched)" class="aviso centro">
                    O nome deve ter pelo menos 3 caracteres.
                  </div>
                </ion-item>
              </ion-list>
            </form>
            
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  `
})
export class CadernetaNovaComponent {

  @ViewChild('nomeInput') nomeInput ;

  nome: string;
  data_nascimento: string;
  sexo: string = "ambos";

  constructor(private appCtrl: App, private autenticacaoService: AutenticacaoService, private cadernetaRepository: CadernetaRepository) {
  }

  criarNovaCaderneta(): void {
    this.cadernetaRepository.adicionarCaderneta(new Caderneta(this.nome, this.data_nascimento, this.sexo)).then(() =>
      this.appCtrl.getRootNav().setRoot(HomeComponent)
    );
  }

}
