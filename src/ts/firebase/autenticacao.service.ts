import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import {UsuarioLogado} from "../login/usuario-logado.model";


@Injectable()
export class AutenticacaoService {

  authenticated$: Observable<firebase.User>;
  uid$: Observable<string>;

  constructor(public afAuth: AngularFireAuth) {
    this.authenticated$ = afAuth.authState;
    this.uid$ = afAuth.authState.map(user => user.uid);
  }

  isAutenticado(): Observable<UsuarioLogado> {
    return this.authenticated$
      .take(1)
      .map(usuario => {
        console.log('isAutenticado', usuario);
        if (usuario) {
          return new UsuarioLogado(usuario.displayName);
        }
        return usuario;
      });
  }

  signIn(provider: firebase.auth.AuthProvider): firebase.Promise<any> {
    return this.afAuth.auth.signInWithPopup(provider)
      .catch(error => console.log('ERROR @ AuthService#signIn() :', error));
  }

  signInAnonymously(): firebase.Promise<any> {
    return this.afAuth.auth.signInAnonymously()
      .catch(error => console.log('ERROR @ AuthService#signInAnonymously() :', error));
  }

  signinWithComEmailSenha(email: string, senha: string): firebase.Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, senha)
      .catch(error => console.log('ERROR @ AuthService#signInWithEmailAndPassword() :', error));
  }

  signInWithGithub(): firebase.Promise<any> {
    return this.signIn(new firebase.auth.GithubAuthProvider());
  }

  signInWithGoogle(): firebase.Promise<any> {
    return this.signIn(new firebase.auth.GoogleAuthProvider());
  }

  signInWithTwitter(): firebase.Promise<any> {
    return this.signIn(new firebase.auth.TwitterAuthProvider());
  }

  signInWithFacebook(): firebase.Promise<any> {
    return this.signIn(new firebase.auth.FacebookAuthProvider());
  }

  signOut(): firebase.Promise<any> {
    return this.afAuth.auth.signOut();
  }
}
