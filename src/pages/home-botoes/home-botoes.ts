import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-home-botoes',
  template: `
    <ion-header>
      <ion-navbar color="primary">
        <button ion-button menuToggle>
          <ion-icon name="menu"></ion-icon>
        </button>
        <ion-title>
          <span class="row">
            <span class="cell logo-img"><img alt="logo" height="40" src="assets/icon/vaccine.png"></span>
            <span class="cell">Suas Vacinas</span>
          </span>
        </ion-title>
      </ion-navbar>
    </ion-header>


    <ion-content padding>
      <h1>HELLO BOTOES</h1>
    </ion-content>
  `
})
export class HomeBotoesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomeBotoesPage');
  }

}
