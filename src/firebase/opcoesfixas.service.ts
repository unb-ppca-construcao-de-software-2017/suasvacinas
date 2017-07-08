import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {Opcao} from "./vacinas.repository";


@Injectable()
export class OpcoesFixasRepository {

  base: any = {
    'fixa-inicial': {
      "chave": "fixa-inicial",
      "descricao": "Que vacinas deveria ter tomado...",
      "subOpcoes": [
        {"tipo": "opcao", "titulo": "Meu filho ou minha filha", "chave": "meu-filho"},
        {"tipo": "opcao", "titulo": "Joãozinho", "chave": "fixa-page-joaozinho"},
        {"tipo": "opcao", "titulo": "Mariazinha", "chave": "fixa-page-mariazinha"}
      ]
    }
  };

  getOpcao(chave: string): Observable<Opcao> {
    return Observable.of(this.base[chave]);
  }

}
