import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {Opcao} from "./vacinas.repository";
import {BannerCadastreSeComponent} from "../componentes/banner-cadastre-se/banner-cadastre-se.component";


export class BaseFixaPageComponentArgs {
  component: any;
  args: any;
}

@Injectable()
export class OpcoesFixasRepository {

  private readonly baseFixa = {
    'fixa-inicial': {
      "chave": "fixa-inicial",
      "descricao": "Que vacinas deveria ter tomado...",
      "subOpcoes": [
        // {"tipo": "opcao", "titulo": "Meu filho ou minha filha", "chave": "meu-filho"},
        {"tipo": "opcao", "titulo": "Minha filha", "chave": "fixapage-filha"},
        {"tipo": "opcao", "titulo": "Meu filho", "chave": "fixapage-filho"},
        {"tipo": "opcao", "titulo": "Eu", "chave": "fixapage-eu"},
        {"tipo": "opcao", "titulo": "Meu familiar", "chave": "fixapage-familiar"}
      ]
    }
  };

  private readonly baseFixaPage = {
    'fixapage-filha': {component: BannerCadastreSeComponent, args: {msg: "caderneta da sua filha", chave: "minha-filha"}},
    'fixapage-filho': {component: BannerCadastreSeComponent, args: {msg: "caderneta do seu filho", chave: "meu-filho"}},
    'fixapage-eu': {component: BannerCadastreSeComponent, args: {msg: "sua caderneta, do seu filho", chave: "meu-filho"}},
    'fixapage-familiar': {component: BannerCadastreSeComponent, args: {msg: "caderneta do seu familiar", chave: "meu-familiar"}}
  };

  getOpcao(chave: string): Observable<Opcao> {
    return Observable.of(this.baseFixa[chave]);
  }

  getOpcaoFixaPage(chave: string): BaseFixaPageComponentArgs {
    if (chave.indexOf('fixapage-') !== -1) {
      return this.baseFixaPage[chave];
    }
    return undefined;
  }

}
