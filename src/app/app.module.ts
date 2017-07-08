import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SuasVacinasAppComponent } from './app.component';
import { ExemploCrudPage } from '../componentes/exemplo-crud/exemplo-crud';
import { ListPage } from '../componentes/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseModule } from "../firebase/firebase.module";
import { FirebaseProvider } from '../firebase/firebase';
import { HomeBotoesPage } from "../componentes/inicial/home-botoes";
import {VacinasNavbarComponent} from "../componentes/tema/vacinas-navbar.component";
import {VacinasLogInComponent} from "../componentes/tema/vacinas-login.component";
import {VacinasAuthService} from "../firebase/vacinas-auth.service";
import {OpcoesComponent} from "../componentes/opcoes/opcoes";
import {OpcaoComponent} from "../componentes/opcoes/opcao.component";
import {DosesComponent} from "../componentes/doses/doses.component";
import {DescricaoVacinaComponent} from "../componentes/descricao-vacina.component";
import {LoadingDropComponent} from "../componentes/tema/loading-drop.component";
import {VacinasFooterComponent} from "../componentes/tema/vacinas-footer.component";
import {VacinasExtraSUSPage} from "../componentes/extra-sus/extra-sus";
import {WelderComponent} from "../componentes/welder/welder.component";

@NgModule({
  declarations: [
    HomeBotoesPage,
    SuasVacinasAppComponent,
    ExemploCrudPage,
    ListPage,
    OpcaoComponent,
    OpcoesComponent,
    WelderComponent,
    DosesComponent,
    DescricaoVacinaComponent,
    VacinasNavbarComponent,
    VacinasFooterComponent,
    VacinasLogInComponent,
    LoadingDropComponent,
    VacinasExtraSUSPage
  ],
  imports: [
    BrowserModule,
    FirebaseModule,
    IonicModule.forRoot(SuasVacinasAppComponent,{
      backButtonText: 'Voltar',
      iconMode: 'ios',
      mode: 'ios'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SuasVacinasAppComponent,
    HomeBotoesPage,
    ExemploCrudPage,
    ListPage,
    DescricaoVacinaComponent,
    OpcaoComponent,
    OpcoesComponent,
    WelderComponent,
    DosesComponent,
    VacinasExtraSUSPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    VacinasAuthService
  ]
})
export class AppModule {}
