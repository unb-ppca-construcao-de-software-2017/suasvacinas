import { Component } from '@angular/core';

@Component({
  selector: 'welder-component',
  styles: [`
    .css-aqui-qualquer {
      text-align: center;
    }
  `],
  template: `
    <ion-header>
      <vacinas-navbar></vacinas-navbar>
    </ion-header>

    <ion-content padding>
      
      <ion-slides pager>
  
        <ion-slide style="background-color: green">
          <h2>Slide 1</h2>
        </ion-slide>
  
        <ion-slide style="background-color: blue">
          <h2>Slide 2</h2>
        </ion-slide>
  
        <ion-slide style="background-color: red">
          <h2>Slide 3</h2>
        </ion-slide>
  
      </ion-slides>

    </ion-content>

    <ion-footer>
      <vacinas-footer></vacinas-footer>
    </ion-footer>
  `
})
export class WelderComponent {

}
