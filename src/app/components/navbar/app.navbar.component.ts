import { Component, HostListener, ElementRef, Input } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { NewsService } from 'src/app/services/news.service';
import { NewsElement } from 'src/app/models/database/news.element';


@Component({
  selector: 'app-navbar',
  templateUrl: './app.navbar.component.html',
  styleUrls: ['./app.navbar.component.css']
})
export class NavbarComponent {

  constructor(public translate: TranslateService,
              private newsService: NewsService) {
    // initialization stuff
    this.checkMobileMode();
  }

  get mainPage(): boolean {
    return this._mainPage;
  }

  @Input()
  set mainPage(value: boolean) {
    this._mainPage = value;
    if (!this._mainPage) {
      // should return full opacity background except for mobileMode
      this.checkMobileMode();
      this.calcOpacity();
    }
  }
  width = '100%'; // background width
  bgopacity = 0; // background opacity

  mobileMode = false; // enables/disables mobile mode
  collapse = true; // true if mobile style menu is collapsed

  private _mainPage = true; // checks and behaves differently whether the user is on main page or not

  country: any;
  countries: any[];
  filteredCountriesSingle: any[];

  Lang: string;

  filterCountrySingle(event) {
    const query = event.query;
    this.newsService.getSearchTerms().then(countries => {
        this.filteredCountriesSingle = this.filterCountry(query, countries);
    });
  }

  filterCountry(query, countries: any[]): any[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered: any[] = [];
    for (let i = 0; i < countries.length; i++) {
        const country = countries[i];
        if ( country.name.toLowerCase().indexOf(query.toLowerCase()) === 0) {
            filtered.push(country);
        }
    }
    return filtered;
  }

  @HostListener('window:resize', ['$event'])
  checkMobileMode() {
    if ( window.innerWidth < 768) {
      this.mobileMode = true; // enables mobile mode
      this.bgopacity = 0; // no background as default
      this.collapse = true; // resolves a bug on mobile
      this.width = '200px'; // width when shown
    } else {
      this.mobileMode = false; // disables mobile mode

      this.width = '100%'; // max width
      this.calcOpacity(); // controls this.bgopacity
    }
  }
  @HostListener('window:scroll', ['$event'])
  calcOpacity() {
    if (!this.mobileMode) {

      // calculates the background opacity
      this.bgopacity = window.pageYOffset / window.innerHeight;

      // if it surpasses 1(100%) it is 1
      if (this.bgopacity > 1) {
        this.bgopacity = 0.85 * 1;
      }

      // non-main pages look ugly with transparent navbar
      if (!this.mainPage) {
        this.bgopacity = 1;
      }
    }
  }

  toggleNavbar() {
    // navbar toggle shows only in mobile mode
    if (this.mobileMode) {
    this.collapse = !this.collapse;

      if (!this.collapse) {
        this.bgopacity = 1;
      } else {
        this.bgopacity = 0;
      }
    }
  }

  setLanguage(language: string) {
    let langs: any;
    let found = false;
    let currlanguage: string; // holds currently diplayed language

    for ( langs in this.translate.getLangs() ) {
      if (language === this.translate.getLangs()[langs]) {
        currlanguage = language;
        found = true;
      }
    }

    // if the language requested wasn't loaded
     if (!found) {
      // print error message in console
      alert('Language type not found! Resetting to default languge instead.');
      // set current language to default
      currlanguage = this.translate.getDefaultLang();
    }

    // use the language last set (bugfix applied)
    this.translate.use(currlanguage);
    this.translate.currentLang = currlanguage;
  }
}

