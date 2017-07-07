import {Component, Input} from "@angular/core";

@Component({
  selector: 'loading-drop',
  styles: [`
    img.drop {
      margin-left: auto;
      margin-right: auto;
      display: block;
    }
  `],
  template: `
    <div>
      <img class="drop" src="assets/icon/loading-drop.gif" alt="">
    </div>
  `
})
export class LoadingDropComponent {
}
