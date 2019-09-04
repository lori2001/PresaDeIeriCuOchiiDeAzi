import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

// primeng
import { ButtonModule } from 'primeng/button';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    // primeng
     ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
