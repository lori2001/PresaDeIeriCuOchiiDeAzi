import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

// primeng
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DropdownModule} from 'primeng/dropdown';

// owl-carousel
import { OwlModule } from 'ngx-owl-carousel';

// import ngx-translate and the http loader
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

// manages which component gets displayed and when
import { AppRoutingModule } from './app.routes';

// scroling
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/app.navbar.component';
import { HomeComponent } from './components/home/app.home.component';
import { FooterComponent } from './components/footer/app.footer.component';
import { NotFoundComponent } from './components/not-found/app.not-found.component';

// font awesome
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { PressComponent } from './components/press/app.press.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    // main component
    AppComponent,

    // page components
    HomeComponent,
    PressComponent,

    // 404 component
    NotFoundComponent,

    // item components
    NavbarComponent,
    FooterComponent
    ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,

    // scrolling
    ScrollToModule.forRoot(),

    // routing
    AppRoutingModule,

    // primeng
     ButtonModule,
     CardModule,
     AutoCompleteModule,
     DropdownModule,

     // owl-carousel
     OwlModule,

     // font awesome
     AngularFontAwesomeModule,

     // translate
     HttpClientModule,
     TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
