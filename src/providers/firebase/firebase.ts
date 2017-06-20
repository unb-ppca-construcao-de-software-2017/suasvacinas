import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
export class FirebaseProvider {

  constructor(public afd: AngularFireDatabase) { }

  getVacinas(): FirebaseListObservable<any[]> {
    return this.afd.list('/vacinas/');
  }

  addVacina(name: string): void {
    this.afd.list('/vacinas/').push(name);
  }

  removeVacina(id: string): void {
    this.afd.list('/vacinas/').remove(id);
  }

}
