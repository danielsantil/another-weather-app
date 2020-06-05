import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private translateService: TranslateService) {
    this.translateService.addLangs(['en', 'nl']);
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
  }
}
