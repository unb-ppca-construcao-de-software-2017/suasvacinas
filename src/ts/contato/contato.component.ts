import {Component} from "@angular/core";
import "rxjs/add/operator/pluck";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";
import {GoogleAnalytics} from "../../app/google-analytics";

@Component({
  selector: 'contato',
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <ion-card-header>
          Envie sugestões ou críticas
        </ion-card-header>
        <ion-card-content>
          <p>
            Não possuímos nenhum fim lucrativo. Nosso único propósito é fornecer 
            um conteúdo de qualidade e que ajude a potencializar a imunização das 
            crianças.
          </p>
          <br>
          <p>
            Nosso conteúdo está sempre em aprimoramento e toda sugestão, crítica
            ou elogio será útil para melhorarmos nossa qualidade. Envie nos um e-mail:
          </p>
          <h3>contato@vacine.org</h3>
        </ion-card-content>
      </ion-card>
      <br>
      <ion-card>
        <ion-card-header>
          Termos de Serviço
        </ion-card-header>
        <ion-card-content>
          <p>
            Nosso conteúdo é fornecido com caráter informativo. Nada substitui a consulta a um profissional de saúde.
            As vacinas indicadas são recomendações do
            <a href="http://portalarquivos.saude.gov.br/campanhas/pni/">Sistema Único de Saúde - SUS</a>,
            <a href="https://sbim.org.br/calendarios-de-vacinacao">Sociedade Brasileira de Imunizações - SBIm</a> e
            <a href="http://www.sbp.com.br/departamentos-cientificos/imunizacoes/">Sociedade Brasileira de Pediatria - SBP</a>.
          </p>
        </ion-card-content>
      </ion-card>

      <ion-card>
        <ion-card-header>
          Política de Privacidade
        </ion-card-header>
        <ion-card-content>
          <p>
            Nunca compartilharemos nenhuma de suas informações pessoais individuais (nome/e-mail) com quem quer que seja.<br>
            Contamos com a infraestrutura <em>firebase</em>, provida pelo Google, para manter seus dados seguros.
          </p>
        </ion-card-content>
      </ion-card>
    </ion-content>

    <ion-footer>
      <vacinas-footer></vacinas-footer>
    </ion-footer>
  `
})
export class ContatoComponent {

  constructor() {
    GoogleAnalytics.sendPageViewForPage('/contato');
  }

}
