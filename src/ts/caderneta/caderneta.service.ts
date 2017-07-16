import {Injectable} from "@angular/core";
import {VacinasRepository, IdadeDose, Dose} from "../firebase/vacinas.repository";
import {Caderneta, idadeEmMeses} from "./caderneta.model";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

export class DosesAtrasadasEProximas {

  public static readonly MESES_CORTE = 3;

  public atrasadas: string;
  public proximas: string;

  constructor(doses: Dose[], idadeAtualEmMeses: number) {
    let dosesAtrasadas = 0;
    let dosesProximas = 0;
    doses.forEach(dose => {
      if (dose.idadedosemeses < idadeAtualEmMeses) {
        dosesAtrasadas++;
      } else {
        dosesProximas++;
      }
    });
    this.atrasadas = DosesAtrasadasEProximas.calcularMensagemDosesAtrasadas(dosesAtrasadas);
    this.proximas = DosesAtrasadasEProximas.calcularMensagemDosesProximas(dosesProximas, idadeAtualEmMeses);
  }
  private static calcularMensagemDosesAtrasadas(dosesAtrasadas: number) {
    if (dosesAtrasadas === 0) {
      return 'Nenhuma dose atrasada';
    } else if (dosesAtrasadas === 1) {
      return 'Uma dose atrasada';
    } else {
      return dosesAtrasadas + ' doses atrasadas';
    }
  }
  private static calcularMensagemDosesProximas(dosesProximas: number, idadeAtualEmMeses: number) {
    if (idadeAtualEmMeses === 0) {
      return dosesProximas + ' nos três primeiros meses';
    }
    if (dosesProximas === 0) {
      return 'Nenhuma nova nos próximos três meses';
    } else if (dosesProximas === 1) {
      return 'Uma nova nos próximos três meses';
    } else {
      return dosesProximas + ' novas nos próximos três meses';
    }
  }
}

@Injectable()
export class CadernetaService {

  constructor(public vacinasRepository: VacinasRepository) { }

  static flatten<T>(arrayOfArrays: T[][]): T[] {
    return [].concat.apply([], arrayOfArrays);
  }

  cadernetaDosesNaoTomadas(caderneta: Caderneta, meses: number): Observable<Dose[]> {
    let dosesTomadas = caderneta.doses || {};
    let dosesAtehMeses: Observable<IdadeDose[]> = this.vacinasRepository.getDosesAtehMeses(meses);
    let dosesDevidas: Observable<Dose[]> = dosesAtehMeses.map((idadeDoses: IdadeDose[]) => {
      let doses: Dose[][] = idadeDoses.map((idadeDose: IdadeDose) => idadeDose.doses);
      return CadernetaService.flatten(doses);
    });
    return dosesDevidas.map((doses: Dose[]) => doses.filter((dose: Dose) => !dosesTomadas[dose.chavedose]));
  }

  cadernetaDosesAtrasadasEProximas(caderneta: Caderneta): Observable<DosesAtrasadasEProximas> {
    if (caderneta.datanascimento.length === 0) {
      return Observable.of();
    }
    let meses = Math.max(idadeEmMeses(caderneta.datanascimento), 0);
    return this.cadernetaDosesNaoTomadas(caderneta, meses + DosesAtrasadasEProximas.MESES_CORTE).map((doses: Dose[]) => new DosesAtrasadasEProximas(doses, meses));
  }

}

