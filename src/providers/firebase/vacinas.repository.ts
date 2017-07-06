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
  tipo: string;
  titulo: string;
  chave?: string;
  meses?: number;
}
export class IdadeDose {
  chave: string;
  meses: number;
  idadeDose: string;
  doses: Dose[];
}
export class Dose {
  nome: string;
  dose: string;
  fonte: string;
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

  getAllDoses(): Observable<IdadeDose[]> {
    return this.afd.list('/doses/');
  }

  getDosesAtehMeses(meses: number): Observable<IdadeDose[]> {
    console.log('getting doses ateh meses', meses);
    return this.getAllDoses().map((idadeDoses: IdadeDose[]) => {
      console.log('during map', idadeDoses.length);
      return idadeDoses.filter((idadeDose: IdadeDose) => idadeDose.meses <= meses);
    });
  }

}
