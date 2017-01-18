import { BrowserModule } from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AgmCoreModule } from 'angular2-google-maps/core';

import { AppComponent } from './app.component';
import { ZipCodeSearchBoxComponent } from './zip-code-search-box/zip-code-search-box.component';
import { AirQualityResultsComponent } from './air-quality-results/air-quality-results.component';
import { HomeRouteComponent } from './home-route/home-route.component';
import { AboutComponent } from './about/about.component';
import { AqiDefinitionsComponent } from './aqi-definitions/aqi-definitions.component';

const routes: Routes = [
{ path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'home', component: HomeRouteComponent },
{ path: 'defs', component: AqiDefinitionsComponent },
{ path: 'about', component: AboutComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ZipCodeSearchBoxComponent,
    AirQualityResultsComponent,
    HomeRouteComponent,
    AboutComponent,
    AqiDefinitionsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
	RouterModule.forRoot(routes),
	AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDvcmGvinGgybxfb6CxlI-EfljbkiAUbew'
    })
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch((err: any) => console.error(err));
