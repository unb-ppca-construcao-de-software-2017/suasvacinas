import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

export class FirebaseProviderMock {

  private vacinas: BehaviorSubject<any>;

  getVacinas(): Observable<any[]> {
    return this.vacinas;
  }

  addVacina(name: string): void {
    this.vacinas.next(name);
  }

  removeVacina(id: string): void {
    // nada
  }

}
