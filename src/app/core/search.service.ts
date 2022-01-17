import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Consumer, and, or } from './ng-soda-client';
import { PropertyInfo } from './property-info.model';

@Injectable()
export class SearchService {
  #consumer = new Consumer('data.edmonton.ca', {
    datasetId: 'dkk9-cj3x'
  });
   
  #searchValue = new BehaviorSubject<string>('');
  #searchResults = new BehaviorSubject<PropertyInfo[]>(null);

  searchValue$ = this.#searchValue.asObservable();
  searchResults$ = this.#searchResults.asObservable();
  
  constructor() {
    this.#searchValue.subscribe(searchValue => this.updateSearchResults(searchValue));
  }

  search(searchValue: string) {
    this.#searchValue.next(searchValue);
  }

  clear() {
    this.#searchValue.next('');
    this.#searchResults.next(null);
  }

  private updateSearchResults(searchValue: string): void {
    if (!searchValue) {
      this.#searchResults.next(null);
      return;
    }

    searchValue = searchValue.toUpperCase();
    this.fetchAssessments(searchValue)
    .pipe( // Add the methods from the class to plain object
      map(properties =>
        Array.from(properties, property =>
          Object.setPrototypeOf(property, new PropertyInfo())
        )
      )
    )
      .subscribe(properties => this.#searchResults.next(properties));
  }

  private fetchAssessments(searchValue: string): Observable<PropertyInfo[]> {
    return !/\s/g.test(searchValue)
      ? this.noSpaceQuery(searchValue)
      : this.hasSpaceQuery(searchValue);
  }

  private noSpaceQuery(searchValue: string): Observable<PropertyInfo[]> {
    return this.#consumer
      .query()
      .where(
        `suite like '${searchValue}%'`,
        or(`house_number like '${searchValue}%'`),
        or(`street_name like '${searchValue}%'`)
      )
      .limit(10)
      .getRows<PropertyInfo>();
  }

  private hasSpaceQuery(searchValue: string): Observable<PropertyInfo[]> {
    const values = searchValue.split(/\s/);

    return this.#consumer
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
      .getRows<PropertyInfo>();
  }
}