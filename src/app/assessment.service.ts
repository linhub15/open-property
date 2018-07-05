import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Assessment } from './assessment';


@Injectable({
  providedIn: 'root'
})
export class AssessmentService {

  protected assessmentUrl: string = 'https://data.edmonton.ca/resource/3pdp-qp95.json';

  constructor(private http: HttpClient) { }

  getAssessment(): Observable<Assessment[]> {
    return this.http.get<Assessment[]>(this.assessmentUrl);
  }

  


}
