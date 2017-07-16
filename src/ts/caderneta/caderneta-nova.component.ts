import { Component, ViewChild } from '@angular/core';
import {AutenticacaoService} from "../firebase/autenticacao.service";
import {CadernetaRepository} from "./caderneta.repository";
import {Caderneta} from "./caderneta.model";
import {App, Loading, LoadingController, NavParams, ToastController} from "ionic-angular";
import {HomeComponent} from "../home/home.component";
import {GoogleAnalytics} from "../../app/google-analytics";

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
          <ion-col col-12>
            <h1 class="centro">{{ caderneta ? 'Editar' : 'Nova' }} caderneta</h1>

            <form #cadastroForm="ngForm">
              <ion-list>
                <ion-item>
                  <ion-label stacked>Nome da caderneta/pessoa</ion-label>
                  <ion-input type="text" required class="form-control" name="nome" minlength="3" [(ngModel)]="nome" #nomeDom="ngModel" placeholder="Digite aqui o nome da pessoa/caderneta"></ion-input>
                </ion-item>

                <ion-item>
                  <ion-label stacked>Data de nascimento (opcional)</ion-label>
                  <ion-datetime displayFormat="DD MMMM YYYY" [(ngModel)]="data_nascimento" name="data-nascimento" cancelText="Cancelar" doneText="Selecionar" #dataDom="ngModel" placeholder="Clique aqui para selecionar a data"></ion-datetime>
                </ion-item>
              
                <ion-item>
                  <ion-label stacked>Incluir vacinas para</ion-label>
                  <ion-select [(ngModel)]="sexo" name="sexo" interface="popover" #sexoDom="ngModel">
                    <ion-option value="ambos" selected="true">Ambos os sexos</ion-option>
                    <ion-option value="feminino">Somente feminino</ion-option>
                    <ion-option value="masculino">Somente masculino</ion-option>
                  </ion-select>
                </ion-item>

                <ion-item>
                  <div class="centro">
                    <button ion-button outline large type="submit" [disabled]="(!nomeDom.touched && !dataDom.touched && !sexoDom.touched) || !cadastroForm.valid" (click)="criarNovaCaderneta()">
                      {{ caderneta ? 'Salvar Alterações' : 'Criar caderneta!' }}
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

  caderneta: Caderneta;

  nome: string;
  data_nascimento: string;
  sexo: string = "ambos";

  constructor(private appCtrl: App, private autenticacaoService: AutenticacaoService, private cadernetaRepository: CadernetaRepository,
              private loadingCtrl: LoadingController, public toastCtrl: ToastController, public navParams: NavParams) {
    this.caderneta = navParams.get('caderneta');
    if (this.caderneta) {
      this.nome = this.caderneta.nome;
      this.sexo = this.caderneta.sexo;
      this.data_nascimento = this.caderneta.datanascimento;
    }
  }

  criarNovaCaderneta(): void {
    let salvando = this.loadingCtrl.create({content: "Salvando..."});
    salvando.present().then(() => {

      if (this.caderneta) {
        GoogleAnalytics.sendEvent('click', "Caderneta:Nova:Atualizar");
        this.salvarAtualizacaoDeCaderneta(salvando);
      } else {
        GoogleAnalytics.sendEvent('click', "Caderneta:Nova:CriarEfetivamente");
        this.salvarNovaCaderneta(salvando);
      }

    });
  }

  private salvarAtualizacaoDeCaderneta(salvando: Loading) {
    this.caderneta.nome = this.nome;
    this.caderneta.sexo = this.sexo;
    this.caderneta.datanascimento = this.data_nascimento;

    this.cadernetaRepository.salvar(this.caderneta).then(() => {
      return this.bob(salvando, 'atualizada');
    });
  }

  private salvarNovaCaderneta(salvando: Loading) {
    let novaCaderneta;
    if (this.data_nascimento) {
      novaCaderneta = new Caderneta(this.nome, this.sexo, this.data_nascimento);
    } else {
      novaCaderneta = new Caderneta(this.nome, this.sexo, "");
    }

    this.cadernetaRepository.adicionarCaderneta(novaCaderneta).then(() => {
      return this.bob(salvando, 'criada');
    });
  }

  private bob(salvando: Loading, criadaOuAtualizada: string) {
    salvando.dismiss();
    let toast = this.toastCtrl.create({
      message: 'Caderneta ' + this.nome + ' ' + criadaOuAtualizada + '.',
      showCloseButton: true,
      closeButtonText: 'Ok',
      duration: 5000,
      position: 'bottom'
    });
    toast.present(toast);
    return this.appCtrl.getRootNav().setRoot(HomeComponent);
  }

}
