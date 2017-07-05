import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/concatMap';
import "rxjs/add/operator/filter";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';

export class Opcao {
  chave: string;
  descricao: string;
  subOpcoes: SubOpcao[];
}
export class SubOpcao {
  titulo: string;
  chave: string;
}
export class IdadeDose {
  idadeDose: string[];
    doses: Dose[];
}
export class Dose {
  nome: string;
  dose: string;
}
@Injectable()
export class VacinasRepository {

  constructor(public afd: AngularFireDatabase) { }

  getOpcoes(): Observable<Opcao[]> {
    return this.afd.list('/opcoes/');
  }

  getOpcao(chave: string): Observable<Opcao> {
    return this.getOpcoes().concatMap((x: Opcao[]) => x).filter((x: Opcao) => x.chave === chave).first();
  }

  getDoses(): Observable<IdadeDose[]> {
    return this.afd.list('/doses/');
  }

}
