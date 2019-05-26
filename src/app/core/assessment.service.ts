import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { Assessment } from './assessment.model';
import { Property } from './property.model';
import { Consumer, and, or } from './ng-soda-client';

@Injectable()
export class AssessmentService {

  private _consumer = new Consumer(
    'data.edmonton.ca', 
    { datasetId: '3pdp-qp95' }
  );

  fetchProperties(searchValue: string): Observable<Property[]> {
    return this.fetchAssessments(searchValue)
      .pipe(map(
        assessments => Array.from(assessments, a => new Property(a))
      ));
  }

  fetchAssessments(searchValue: string): Observable<Assessment[]> {
    return !/\s/g.test(searchValue)
      ? this.noSpaceQuery(searchValue)
      : this.handleHasSpace(searchValue);
  }

  private noSpaceQuery(searchValue: string): Observable<Assessment[]> {
    return this._consumer.query()
      .where(
        `suite like '${searchValue}%'`,
        or(`house_number like '${searchValue}%'`),
        or(`street_name like '${searchValue}%'`))
      .limit(10)
      .getRows<Assessment>();
  }

  private handleHasSpace(searchValue: string): Observable<Assessment[]> {
    return forkJoin(
      this.isApartment(searchValue),
      this.isHouse(searchValue)
    ).pipe(
      map(([apartments, houses]) => [
        ...apartments, ...houses
      ])
    );
  }

  private isApartment(searchValue: string): Observable<Assessment[]> {
    const values = searchValue.split(/\s/);
    const suite = values.length > 0 ? values[0] : '';
    const house = values.length > 1 ? values[1] : '';
    let street = values.length > 2
      ? values.slice(2).join(' ') : '';
    return this._consumer.query()
      .where(
        `suite='${suite}'`,
        and(`house_number like '${house}%'`),
        and(`street_name like '${street}%'`)
      )
      .limit(5)
      .getRows<Assessment>();
  }

  private isHouse(searchValue: string): Observable<Assessment[]> {
    const firstSpace = searchValue.indexOf(' ');
    const houseNumber = searchValue.substring(0, firstSpace);
    const streetName = searchValue.substring(firstSpace+1);
    return this._consumer.query()
      .where(
        `house_number='${houseNumber}'`,
        and(`street_name like '${streetName}%'`)
      )
      .limit(5)
      .getRows<Assessment>();
  }

}
