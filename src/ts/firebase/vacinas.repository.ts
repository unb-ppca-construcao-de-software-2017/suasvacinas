import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/concatMap';
import "rxjs/add/operator/filter";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/first';
import 'rxjs/add/observable/of';

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
  idadedose: string;
  nomevacina: string;
  dosevacina: string;
  fontedose: string;
}
export class DescricaoVacina {
  nomevacina: string;
  descricao: TextoFonte;
  redepublica: TextoFonte;
  variacao: TextoFonte;
  comentarios: TextoFonte;
}
export class TextoFonte {
  texto: string;
  fonte: string;
}
@Injectable()
export class VacinasRepository {

  constructor(public afd: AngularFireDatabase) { }

  getOpcoes(): Observable<Opcao[]> {
    return this.afd.list('/base/opcoes/');
  }

  getOpcao(chave: string): Observable<Opcao> {
    return this.getOpcoes().concatMap((x: Opcao[]) => x).filter((x: Opcao) => x.chave === chave).first();
  }

  getAllDoses(): Observable<IdadeDose[]> {
    return this.afd.list('/base/doses/');
  }

  getDosesAtehMeses(meses: number): Observable<IdadeDose[]> {
    return this.getAllDoses().map((idadeDoses: IdadeDose[]) => idadeDoses.filter((idadeDose: IdadeDose) => idadeDose.meses <= meses));
  }

  getDescricaoVacina(nomevacina: string): Observable<DescricaoVacina> {
    return this.afd.list('/base/descricoes-vacinas/').concatMap((dvs: DescricaoVacina[]) => dvs).filter((dv: DescricaoVacina) => dv.nomevacina === nomevacina).first();
  }

  getDosesVacina(chaveVacina: string): Observable<Dose[]> {
    return this.getAllDoses().map((idadeDoses: IdadeDose[]) => this.idadeDosesToVacinaIdadeDoseFontes(idadeDoses, chaveVacina));
  }

  private static flatMap<ENTRADA, SAIDA>(listaEntrada: ENTRADA[], funcaoConversaoEntradaSaida: (entrada: ENTRADA) => SAIDA[]): SAIDA[] {
    return [].concat(...listaEntrada.map(funcaoConversaoEntradaSaida));
  }

  private idadeDosesToVacinaIdadeDoseFontes(idadeDoses: IdadeDose[], chaveVacina: string): Dose[] {
    return VacinasRepository.flatMap<IdadeDose, Dose>(idadeDoses, (idadeDose: IdadeDose) => {
      return idadeDose.doses.filter(dose => dose.nomevacina === chaveVacina);
    });
  }
}
