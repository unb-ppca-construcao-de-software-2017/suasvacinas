import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ExemploCrudPage } from '../pages/exemplo-crud/exemplo-crud';
import { ListPage } from '../pages/list/list';
import {HomeBotoesPage} from "../pages/home-botoes/home-botoes";
import {VacinasExtraSUSPage} from "../pages/extra-sus/extra-sus";
import {WelderComponent} from "../welder/welder.component";

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

  rootPage: any = HomeBotoesPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    this.pages = [
      { title: 'Início', component: HomeBotoesPage },
      { title: 'Exemplo Crud', component: ExemploCrudPage },
      { title: 'Lista', component: ListPage },
      { title: 'Ampliar Cobertura do SUS', component: VacinasExtraSUSPage},
      { title: 'Componente do Welder', component: WelderComponent}
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
