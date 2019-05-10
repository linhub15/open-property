import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Assessment } from './assessment.model';
import { PropertyAddress } from './property-address.model';


@Injectable()
export class AssessmentService {

  protected assessmentUrl = 'https://data.edmonton.ca/resource/3pdp-qp95.json';

  constructor(private http: HttpClient) { }

  getAssessments(address: PropertyAddress): Observable<Assessment[]> {
    let queryUri: string;

    if (address.isApartment()) {
      queryUri = address.makeApartmentUri(this.assessmentUrl);
    } else if (address.isHouse()) {
      queryUri = address.makeHouseUri(this.assessmentUrl);
    }
    return this.callAssessmentsApi(queryUri);
  }

  callAssessmentsApi(uri: string): Observable<Assessment[]> {
    console.log(uri);
    return this.http.get<Assessment[]>(uri);
  }
}
