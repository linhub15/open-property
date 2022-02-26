import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { GoogleMapsModule } from '@angular/google-maps';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PropertyComponent } from './property/property.component';
import { CoreModule } from './core/core.module';
import { SearchResultsComponent } from './search-results/search-results.component';
import { MapComponent } from './map/map.component';
import { ChartComponent } from './chart/chart.component';
import { NgChartsModule } from 'ng2-charts';

const appRoutes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: '**', redirectTo: '/search', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ToolbarComponent,
    PropertyComponent,
    SearchResultsComponent,
    MapComponent,
    ChartComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    GoogleMapsModule,
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CoreModule,
    NgChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
