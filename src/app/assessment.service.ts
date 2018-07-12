import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Assessment } from './assessment';
import { PropertyAddress } from './property-address';


@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  protected assessmentUrl: string = 'https://data.edmonton.ca/resource/3pdp-qp95.json';

  constructor(private http: HttpClient) { }

  getAssessments(address: PropertyAddress): Observable<Assessment[]> {
    let queryUri: string;
    console.log(address);
    // Case 1: Apartment
    if (address.isApartment()) {
      queryUri = address.makeApartmentUri(this.assessmentUrl);
    }
    // Case 2: House
    else if (address.isHouse()) {
      queryUri = address.makeHouseUri(this.assessmentUrl);
    }
    console.log(queryUri);
    return this.callAssessmentsApi(queryUri);
  }

  callAssessmentsApi(uri: string): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(uri);
  }
}
