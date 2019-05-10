import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes, Router } from '@angular/router';
import { MatInputModule, MatCardModule, MatToolbarModule, MatButtonModule } from '@angular/material';


import { AppComponent } from './app.component';
import { AddressSearchComponent } from './address-search/address-search.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { CoreModule } from './core/core.module';


const appRoutes: Routes = [
  { path: 'address-search', component: AddressSearchComponent },
  { path: 'results', component: AssessmentComponent },
  { path: '', redirectTo: '/address-search', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    AddressSearchComponent,
    ToolbarComponent,
    AssessmentComponent
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
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
