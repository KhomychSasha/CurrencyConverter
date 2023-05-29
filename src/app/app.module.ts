import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { MainLayoutComponent } from './main-layout/main-layout.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { ConverterComponent } from './converter/converter.component';
import { ActualCurrenciesComponent } from './converter/actual-currencies/actual-currencies.component';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    ConverterComponent,
    ActualCurrenciesComponent,
    AboutMeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
