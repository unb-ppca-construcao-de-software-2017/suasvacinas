import {Injectable} from "@angular/core";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {AutenticacaoService} from "../firebase/autenticacao.service";
import {Caderneta} from "./caderneta.model";

@Injectable()
export class CadernetaRepository {

  private cadernetas$: FirebaseListObservable<Caderneta[]>;

  constructor(public afDb: AngularFireDatabase, private autenticacaoService: AutenticacaoService) {
    autenticacaoService.uid$
      .take(1)
      .subscribe(uid => {
        console.log('caderneta repository logado!', uid);
        const path = `/cadernetas/${uid}`;

        this.cadernetas$ = afDb.list(path);
      });

  }

  getCadernetasDoUsuarioLogado(): Observable<any[]> {
    return this.cadernetas$;
  }

  adicionarCaderneta(caderneta: Caderneta): void {
    this.cadernetas$.push(caderneta);
  }

  removeVacina(caderneta: Caderneta): void {
    this.cadernetas$.remove(caderneta.$key);
  }

}
