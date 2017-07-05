import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from "rxjs/Observable";

export class Opcao {
  nomeOpcao: string;
  tipo: string;
  subOpcoes: string[];
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
  getDoses(): Observable<IdadeDose[]> {
    return this.afd.list('/doses/');
  }

}
