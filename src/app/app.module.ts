import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SuasVacinasAppComponent } from './app.component';
import { ExemploCrudPage } from '../ts/exemplo-crud/exemplo-crud';
import { ListPage } from '../ts/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseModule } from "../ts/firebase/firebase.module";
import { FirebaseProvider } from '../ts/firebase/firebase';
import { HomeComponent } from "../ts/home/home.component";
import {VacinasNavbarComponent} from "../ts/header-footer/vacinas-navbar.component";
import {VacinasLogInComponent} from "../ts/login/vacinas-login.component";
import {AutenticacaoService} from "../ts/firebase/autenticacao.service";
import {OpcoesComponent} from "../ts/opcoes/opcoes";
import {OpcaoComponent} from "../ts/opcoes/opcao.component";
import {DosesComponent} from "../ts/doses/doses.component";
import {DescricaoVacinaComponent} from "../ts/detalhes/descricao-vacina.component";
import {LoadingDropComponent} from "../ts/header-footer/vacinas-loading.component";
import {VacinasFooterComponent} from "../ts/header-footer/vacinas-footer.component";
import {VacinasExtraSUSPage} from "../ts/extra-sus/extra-sus";
import {WelderComponent} from "../ts/welder/welder.component";
import {OpcoesFixasRepository} from "../ts/firebase/opcoesfixas.service";
import {TourComponent} from "../ts/tour/tour.component";
import {VacinasLogInComEmailComponent} from "../ts/login/vacinas-login-email.component";
import {ContatoComponent} from "../ts/contato/contato";
import {VacinasMenuComponent} from "../ts/menu/menu.component";
import {CadernetaMioloComponent} from "../ts/caderneta/caderneta-miolo.component";
import {TourHomeComponent} from "../ts/tour/tour-home.component";

@NgModule({
  declarations: [
    VacinasMenuComponent,
    SuasVacinasAppComponent,
    HomeComponent,
    CadernetaMioloComponent,
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
    VacinasLogInComEmailComponent,
    LoadingDropComponent,
    TourComponent,
    TourHomeComponent,
    VacinasExtraSUSPage,
    ContatoComponent
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
    HomeComponent,
    ExemploCrudPage,
    ListPage,
    DescricaoVacinaComponent,
    VacinasLogInComponent,
    VacinasLogInComEmailComponent,
    OpcaoComponent,
    OpcoesComponent,
    WelderComponent,
    TourComponent,
    DosesComponent,
    VacinasExtraSUSPage,
    ContatoComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    OpcoesFixasRepository,
    AutenticacaoService
  ]
})
export class AppModule {}
