import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MatInputModule, MatCardModule } from '@angular/material';


import { AppComponent } from './app.component';
import { AddressSearchComponent } from './address-search/address-search.component';

@NgModule({
  declarations: [
    AppComponent,
    AddressSearchComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
