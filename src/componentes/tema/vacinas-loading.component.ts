import {Component} from "@angular/core";

@Component({
  selector: 'vacinas-loading',
  styles: [`
    img.drop {
      margin-left: auto;
      margin-right: auto;
      display: block;
    }
  `],
  template: `
    <div>
      <img class="drop" src="assets/icon/loading.gif" alt="">
    </div>
  `
})
export class LoadingDropComponent {
}
