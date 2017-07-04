import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SuasVacinasAppComponent } from './app.component';
import { ExemploCrudPage } from '../pages/exemplo-crud/exemplo-crud';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FirebaseModule } from "../firebase/firebase.module";
import { FirebaseProvider } from '../providers/firebase/firebase';
import { HomeBotoesPage } from "../pages/home-botoes/home-botoes";
import {VacinasNavbarComponent} from "../pages/vacinas-navbar/vacinas-navbar.component";
import {VacinasLogInComponent} from "../pages/vacinas-login.component";
import {VacinasAuthService} from "../firebase/vacinas-auth.service";

@NgModule({
  declarations: [
    HomeBotoesPage,
    SuasVacinasAppComponent,
    ExemploCrudPage,
    ListPage,
    VacinasNavbarComponent,
    VacinasLogInComponent
  ],
  imports: [
    BrowserModule,
    FirebaseModule,
    IonicModule.forRoot(SuasVacinasAppComponent)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SuasVacinasAppComponent,
    HomeBotoesPage,
    ExemploCrudPage,
    ListPage
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
