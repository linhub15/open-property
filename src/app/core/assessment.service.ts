import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Assessment } from './assessment.model';
import { Property } from './property.model';
import { Consumer, and, or } from './ng-soda-client';

@Injectable()
export class AssessmentService {
  private _consumer = new Consumer('data.edmonton.ca', {
    datasetId: '3pdp-qp95'
  });
  private _searchValue = new BehaviorSubject<string>('');
  private _selectedProperty = new BehaviorSubject<Property>(null);
  private _properties = new BehaviorSubject<Property[]>(null);

  public searchValue$: Observable<string>;
  public selectedProperty$: Observable<Property>;
  public properties$: Observable<Property[]>;

  constructor() {
    this.searchValue$ = this._searchValue.asObservable();
    this.selectedProperty$ = this._selectedProperty.asObservable();
    this.properties$ = this._properties.asObservable();
  }

  select(property: Property) {
    this._selectedProperty.next(property);
    this._searchValue.next(property.address);
    this._properties.next(null);
  }

  update(searchValue: string) {
    this._searchValue.next(searchValue);
    this.fetchProperties(searchValue);
  }

  clear() {
    this._searchValue.next('');
    this._selectedProperty.next(null);
    this._properties.next(null);
  }

  private fetchProperties(searchValue) {
    if (!searchValue) {
      return;
    }
    searchValue = searchValue.toUpperCase();
    this.fetchAssessments(searchValue)
      .pipe(map(assessments => Array.from(assessments, a => new Property(a))))
      .subscribe(properties => this._properties.next(properties));
  }

  private fetchAssessments(searchValue: string): Observable<Assessment[]> {
    return !/\s/g.test(searchValue)
      ? this.noSpaceQuery(searchValue)
      : this.hasSpaceQuery(searchValue);
  }

  private noSpaceQuery(searchValue: string): Observable<Assessment[]> {
    return this._consumer
      .query()
      .where(
        `suite like '${searchValue}%'`,
        or(`house_number like '${searchValue}%'`),
        or(`street_name like '${searchValue}%'`)
      )
      .limit(10)
      .getRows<Assessment>();
  }

  private hasSpaceQuery(searchValue: string): Observable<Assessment[]> {
    const values = searchValue.split(/\s/);

    return this._consumer
      .query()
      .where(
        `suite='${values[0]}'`,
        and(`house_number like '${values[1]}%'`),
        and(`street_name like '${values.slice(2).join(' ')}%'`),
        or(
          `house_number='${values[0]}'`,
          and(`street_name like '${values.slice(1).join(' ')}%'`)
        )
      )
      .limit(10)
      .getRows<Assessment>();
  }
}
