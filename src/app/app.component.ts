import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {

  constructor(private translate: TranslateService) {
    translate.addLangs(['ro']);

    translate.setDefaultLang('ro');
    this.translate.currentLang = 'ro';
  }
}
