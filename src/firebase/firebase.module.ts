import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseProvider } from './firebase';
import {VacinasRepository} from "./vacinas.repository";

const firebaseConfig = {
  apiKey: "AIzaSyC5Y8D-BlICHOwdPGJIR6bxXdmdMFC93uM",
  authDomain: "suasvacinas.firebaseapp.com",
  databaseURL: "https://suasvacinas.firebaseio.com",
  projectId: "suasvacinas",
  storageBucket: "suasvacinas.appspot.com",
  messagingSenderId: "57819698131"
};

@NgModule({
  imports: [
    HttpModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig, 'suasvacinas')
  ],
  providers: [
    FirebaseProvider,
    VacinasRepository
  ]
})
export class FirebaseModule {}
