import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// primeng
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';

// import ngx-translate and the http loader
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';

// manages which component gets displayed and when
import { AppRoutingModule } from './app.routes';

import { AppComponent } from './app.component';
import { CardComponent } from './components/card/app.card.component';
import { NavbarComponent } from './components/navbar/app.navbar.component';
import { HomeComponent } from './components/home/app.home.component';
import { FooterComponent } from './components/footer/app.footer.component';
import { TeamComponent } from './components/team/app.team.component';
import { NotFoundComponent } from './components/not-found/app.not-found.component';
import { SibiuPressComponent } from './components/sibiu-press/app.sibiu-press.component';
import { BrasovPressComponent } from './components/brasov-press/app.brasov-press.component';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    // main component
    AppComponent,

    // page components
    HomeComponent,
    TeamComponent,
    BrasovPressComponent,
    SibiuPressComponent,

    // 404 component
    NotFoundComponent,

    // item components
    NavbarComponent,
    FooterComponent,
    CardComponent
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    // routing
    AppRoutingModule,

    // primeng
     ButtonModule,
     CardModule,
     CarouselModule,

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
