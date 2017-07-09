import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ExemploCrudPage } from '../ts/exemplo-crud/exemplo-crud';
import { ListPage } from '../ts/list/list';
import {InicialComponent} from "../ts/home/inicial.component";
import {VacinasExtraSUSComponent} from "../ts/extra-sus/extra-sus";
import {WelderComponent} from "../ts/welder/welder.component";
import {ContatoComponent} from "../ts/contato/contato";
import {AlergiaComponent} from "../ts/alergia/alergia";

@Component({
  template: `
    <ion-menu [content]="content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <ion-list>
          <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">
            {{p.title}}
          </button>
        </ion-list>
      </ion-content>

    </ion-menu>

    <!-- Disable swipe-to-go-back because it's poor UX to combine STGB with side menus -->
    <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>
  `
})
export class SuasVacinasAppComponent {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = InicialComponent;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Início', component: InicialComponent },
      { title: 'Exemplo Crud', component: ExemploCrudPage },
      { title: 'Lista', component: ListPage },
      { title: 'Ampliar Cobertura do SUS', component: VacinasExtraSUSComponent},
      { title: 'Alergias', component: AlergiaComponent},
      { title: 'Componente do Welder', component: WelderComponent},
      { title: 'Fale Conosco', component: ContatoComponent}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
