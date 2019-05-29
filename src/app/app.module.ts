import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import {
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { AddressSearchComponent } from './address-search/address-search.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { CoreModule } from './core/core.module';
import { SearchResultsComponent } from './search-results/search-results.component';

const appRoutes: Routes = [
  { path: 'address-search', component: AddressSearchComponent },
  { path: '', redirectTo: '/address-search', pathMatch: 'full' },
  { path: '**', redirectTo: '/address-search', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    AddressSearchComponent,
    ToolbarComponent,
    AssessmentComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
