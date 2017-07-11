import {Injectable} from "@angular/core";
import {VacinasRepository, IdadeDose, Dose} from "../firebase/vacinas.repository";
import {Caderneta, idadeEmMeses} from "./caderneta.model";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

export class DosesAtrasadasEProximas {
  public atrasadas: string;
  public proximas: string;
  constructor(_atrasadas: number, _proximas: number) {
    this.atrasadas = _atrasadas ? 'Nenhuma dose atrasada' : _atrasadas + ' doses atrasadas';
    this.proximas = _proximas ? 'Nenhuma dose nos próximos meses' : _proximas + ' doses nos próximos meses';
  }
}

@Injectable()
export class CadernetaService {

  constructor(public vacinasRepository: VacinasRepository) { }

  cadernetaDosesNaoTomadas(caderneta: Caderneta, meses: number): Observable<Dose[]> {
    let dosesTomadas = caderneta.doses || {};
    let dosesAtehMeses: Observable<IdadeDose[]> = this.vacinasRepository.getDosesAtehMeses(meses).do((ids: IdadeDose[]) => {
      console.log('dosesAtehMeses', caderneta.nome, ids);
    });
    let dosesDevidas: Observable<Dose[]> = dosesAtehMeses.mergeMap((idadeDoses: IdadeDose[]) => idadeDoses.map((idadeDose: IdadeDose) => idadeDose.doses));
    return dosesDevidas.map((doses: Dose[]) => doses.filter((dose: Dose) => !dosesTomadas[dose.chavedose]));
  }

  cadernetaDosesAtrasadasEProximas(caderneta: Caderneta): Observable<DosesAtrasadasEProximas> {
    console.log('consultando para', caderneta.nome, caderneta.datanascimento.length, caderneta.datanascimento);
    if (caderneta.datanascimento.length === 0) {
      return Observable.of();
    }
    let meses = idadeEmMeses(caderneta.datanascimento);
    if (meses < 0) {
      meses = 0;
    }
    console.log('consultando para', meses + 3);
    return this.cadernetaDosesNaoTomadas(caderneta, meses + 3).map((doses: Dose[]) => {
      console.log('doses nao tomadas para', caderneta.nome, doses);
      let dosesAtrasadas = 0;
      let dosesProximas = 0;
      doses.forEach(dose => {
        if (dose.idadedosemeses < meses) {
          dosesAtrasadas++;
        } else {
          dosesProximas++;
        }
      });
      return new DosesAtrasadasEProximas(dosesAtrasadas, dosesProximas);
    });
  }

}

