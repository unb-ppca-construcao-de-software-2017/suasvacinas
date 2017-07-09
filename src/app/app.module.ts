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
import { InicialComponent } from "../ts/home/inicial.component";
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
import {BannerCadastreSeComponent} from "../ts/tour/banner-cadastre-se.component";
import {VacinasLogInComEmailComponent} from "../ts/login/vacinas-login-email.component";
import {HomeCrieSuaCadernetaComponent} from "../ts/home/home-crie-sua-caderneta.component";

@NgModule({
  declarations: [
    SuasVacinasAppComponent,
    InicialComponent,
    HomeCrieSuaCadernetaComponent,
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
    BannerCadastreSeComponent,
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
    InicialComponent,
    ExemploCrudPage,
    ListPage,
    DescricaoVacinaComponent,
    VacinasLogInComponent,
    VacinasLogInComEmailComponent,
    OpcaoComponent,
    OpcoesComponent,
    WelderComponent,
    BannerCadastreSeComponent,
    DosesComponent,
    VacinasExtraSUSPage
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
