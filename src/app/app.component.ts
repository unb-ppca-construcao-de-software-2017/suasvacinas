import {Component} from "@angular/core";
import {Platform} from "ionic-angular";
import {StatusBar} from "@ionic-native/status-bar";
import {SplashScreen} from "@ionic-native/splash-screen";
import {InicialComponent} from "../ts/home/inicial.component";

@Component({
  template: `
    <ion-menu [content]="content">
      
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <vacinas-menu></vacinas-menu>
      </ion-content>
      
    </ion-menu>

    <!-- Disable swipe-to-go-back because it's poor UX to combine STGB with side menus -->
    <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>
  `
})
export class SuasVacinasAppComponent {

  rootPage: any = InicialComponent;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
