import {Injectable} from "@angular/core";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {AutenticacaoService} from "../firebase/autenticacao.service";
import {Caderneta} from "./caderneta.model";
import * as firebase from "firebase/app";

@Injectable()
export class CadernetaRepository {

  public cadernetas$: FirebaseListObservable<Caderneta[]>;

  constructor(public afDb: AngularFireDatabase, private autenticacaoService: AutenticacaoService) {
    autenticacaoService.uid$
      .take(1)
      .subscribe(uid => {
        const path = `/cadernetas/${uid}`;
        this.cadernetas$ = afDb.list(path);
      });
  }

  adicionarCaderneta(caderneta: Caderneta): firebase.Promise<any> {
    return this.cadernetas$.push(caderneta);
  }

  removerCaderneta(caderneta: Caderneta): firebase.Promise<any> {
    return this.cadernetas$.remove(caderneta.$key);
  }

  salvar(caderneta: Caderneta): firebase.Promise<any> {
    if (!caderneta.$key) {
      console.error(caderneta);
      throw new Error("Tentou salvar uma caderneta que não veio do banco!");
    }
    return this.cadernetas$.update(caderneta.$key, caderneta);
  }

}
