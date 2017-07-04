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

@NgModule({
  declarations: [
    SuasVacinasAppComponent,
    ExemploCrudPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    FirebaseModule,
    IonicModule.forRoot(SuasVacinasAppComponent)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SuasVacinasAppComponent,
    ExemploCrudPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider
  ]
})
export class AppModule {}
