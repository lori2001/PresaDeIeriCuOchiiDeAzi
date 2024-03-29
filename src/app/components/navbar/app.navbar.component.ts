import { Component, HostListener, Input } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { NewsService } from 'src/app/services/news.service';


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

  bgopacity = 0; // background opacity

  mode = 'desktop'; // desktop tablet mobile
  toggleOpen = false; // true if mobile style menu is open
  toggleBlocker = false; // blocks collapsing right along if toggler button is pressed

  private _mainPage = true; // checks and behaves differently whether the user is on main page or not

  searchedNews: any;
  NewsGroup: any[];
  filteredNewsGroupSingle: any[];

  Lang: string;

  filterNewsSingle(event) {
    const query = event.query;
    this.newsService.getSearchTerms().then(elements => {
        this.filteredNewsGroupSingle = this.filterNews(query, elements);
    });
  }

  filterNews(query, elements: any[]): any[] {
    // in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    const filtered: any[] = [];
    for (let i = 0; i < elements.length; i++) {
        const news = elements[i];

        if ( news.name.toLowerCase().indexOf(query.toLowerCase()) === 0 ||
             news.publish_date.toLowerCase().indexOf(query.toLowerCase()) === 0 ||
             String(news.num).toLowerCase().indexOf(query.toLowerCase()) === 0 ||
             String(news.page).toLowerCase().indexOf(query.toLowerCase()) === 0) {

            if (news.noMonth && news.noDay) {
              news.publish_date = news.publish_date.substring(0, 4);
            } else if (news.noDay) {
              news.publish_date = news.publish_date.substring(0, 7);
            } else if (news.noMonth) {
              news.publish_date = news.publish_date.substring(0, 4) + '-00-' + news.publish_date.substring(8, 10);
            }

            news.name = news.publish_date + ' ' + elements[i].name + ' - Nr.' + elements[i].num + ' Pg.' + elements[i].page ;

            filtered.push(news);
        }
    }
    return filtered;
  }

  showNews(){
    if (this.searchedNews) {
      window.location.href = this.searchedNews.href;
    }
  }

  @HostListener('window:resize', ['$event'])
  checkMobileMode() {
    if (window.innerWidth >= 1200) {
      this.mode = 'desktop'; // enables desktop mode
      this.toggleOpen = true; // always open
      this.calcOpacity(); // controls this.bgopacity
    } else if (window.innerWidth >= 768) {
      this.mode = 'tablet'; // enables tablet mode
      this.toggleOpen = true; // always open
      this.calcOpacity(); // controls this.bgopacity
    } else {
      this.mode = 'mobile'; // enables mobile mode
      this.bgopacity = 0; // no background as default
      this.toggleOpen = false; // starts collapsed
    }
  }
  @HostListener('window:scroll', ['$event'])
  calcOpacity() {
    if (this.mode !== 'mobile') {
      // calculates the background opacity
      this.bgopacity = window.pageYOffset / window.innerHeight;

      // if it surpasses 1(100%) it is 1
      if (this.bgopacity > 1) {
        this.bgopacity = 0.9 * 1;
      }

      // non-main pages look ugly with transparent navbar
      if (!this.mainPage) {
        this.bgopacity = 0.9;
      }
    }
  }
  @HostListener('document:click', ['$event']) // calls function whenever clicked anywhere on screen
    clickedOutside() {
      if (this.mode === 'mobile') {
        if (this.toggleBlocker) {
          this.toggleOpen = false;
          this.bgopacity = 0;
        }
        if (this.toggleOpen) {
          this.toggleBlocker = true;
        }
      }
  }

  toggleNavbar() {
    // navbar toggle shows only in mobile mode
    if (this.mode === 'mobile') {
    this.toggleOpen = !this.toggleOpen;
    this.toggleBlocker = false;

      if (this.toggleOpen) {
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

