import { Component } from '@angular/core';

@Component({
  selector: 'vacinas-navbar',
  template: `
    <ion-navbar color="primary">
      <button ion-button menuToggle>
        <ion-icon name="menu"></ion-icon>
      </button>
      <ion-title>
        <span class="row">
          <span class="cell logo-img"><img alt="logo" height="40" src="assets/icon/vaccine.png"></span>
          <span class="cell">Suas Vacinas?</span>
        </span>
      </ion-title>
    </ion-navbar>
  `
})
export class VacinasNavbarComponent {

}
