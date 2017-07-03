import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Observable} from "rxjs/Observable";

@Injectable()
export class FirebaseProvider {

  constructor(public afd: AngularFireDatabase) { }

  getVacinas(): Observable<any[]> {
    return this.afd.list('/vacinas/');
  }

  addVacina(name: string): void {
    this.afd.list('/vacinas/').push(name);
  }

  removeVacina(id: string): void {
    this.afd.list('/vacinas/').remove(id);
  }

}
