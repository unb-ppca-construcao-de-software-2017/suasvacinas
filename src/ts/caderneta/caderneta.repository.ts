import {Injectable} from "@angular/core";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {AutenticacaoService} from "../firebase/autenticacao.service";
import {Caderneta} from "./caderneta.model";
import * as firebase from 'firebase/app';

@Injectable()
export class CadernetaRepository {

  public cadernetas$: FirebaseListObservable<Caderneta[]>;

  constructor(public afDb: AngularFireDatabase, private autenticacaoService: AutenticacaoService) {
    autenticacaoService.uid$
      .take(1)
      .subscribe(uid => {
        console.log('caderneta repository logado!', uid);
        const path = `/cadernetas/${uid}`;

        afDb.list(path).subscribe(x => console.log('subs', x));

        this.cadernetas$ = afDb.list(path);
      });
  }

  adicionarCaderneta(caderneta: Caderneta): firebase.Promise<any> {
    return this.cadernetas$.push(caderneta);
  }

  removerCaderneta(caderneta: Caderneta): firebase.Promise<any> {
    return this.cadernetas$.remove(caderneta.$key);
  }

}