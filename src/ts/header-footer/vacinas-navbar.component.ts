import { Component } from '@angular/core';

@Component({
  selector: 'vacinas-navbar',
  styles: [`
    span.row {
      /*display:table-row;*/
      margin: auto;
      display: inline-block;
      padding-top: 7px;
    }
    span.cell {
      display: table-cell; vertical-align: middle;
    }
    span.logo-img img {
      height: 40px;
      width: 40px;
    }
    span.logo-texto {
      font-size: 140%;
      padding-left: 6%;
    }
  `],
  template: `
    <ion-navbar color="primary">
      <button ion-button menuToggle>
        <ion-icon name="menu"></ion-icon>
      </button>
      <ion-title class="vacinas-header-toolbar">
        <span class="row">
          <span class="cell logo-img"><img alt="logo" src="assets/icon/vaccine.png"></span>
          <span class="cell logo-texto">Vacine.org</span>
        </span>
      </ion-title>
    </ion-navbar>
  `
})
export class VacinasNavbarComponent {

}
