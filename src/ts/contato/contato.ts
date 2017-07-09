import {Component} from "@angular/core";
import "rxjs/add/operator/pluck";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/map";

@Component({
  selector: 'contato',
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content padding>
      <ion-card>
        <ion-card-header>
          Envie sugestões, críticas ou elogios
        </ion-card-header>
        <ion-card-content text-justify>
          <p>
            Não possuímos nenhum fim lucrativo. Nosso único propósito é fornecer 
            um conteúdo de qualidade e que ajude a potencializar a imunização das 
            crianças.
          </p>
          <p>
            Nosso conteúdo está sempre em aprimoramento e toda sugestão, crítica
            ou elogio será útil para melhorarmos nossa qualidade. Envie nos um e-mail:
          </p>
          <h3>contato@vacine.org</h3>
        </ion-card-content>
      </ion-card>
    </ion-content>
  `
})
export class ContatoComponent {
}
