import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { PropertyHistory } from './property-history.model';
import { Consumer } from './ng-soda-client';
import { PropertyInfo } from './property-info.model';

@Injectable()
export class PropertyService {
  #consumer = new Consumer('data.edmonton.ca', {
    datasetId: 'qi6a-xuwt',
  });

  #selectedProperty = new BehaviorSubject<PropertyInfo>(null);
  #propertyHistories = new BehaviorSubject<PropertyHistory[]>(null);

  get selectedProperty$(): Observable<PropertyInfo> {
    return this.#selectedProperty.asObservable();
  }

  get propertyHistories$(): Observable<PropertyHistory[]> {
    return this.#propertyHistories.asObservable();
  }

  select(property: PropertyInfo): void {
    this.#selectedProperty.next(property);
    this.fetchPropertyHistory(property.account_number);
  }

  private fetchPropertyHistory(accountNumber: string) {
    this.fetchProperties(accountNumber)
      .pipe(
        // Add the methods from the class to plain object
        map((histories) =>
          Array.from(histories, (history) =>
            Object.setPrototypeOf(history, new PropertyHistory())
          )
        ),
        map((histories: PropertyHistory[]) =>
          histories.sort((a, b) => a.assessment_year - b.assessment_year)
        )
      )
      .subscribe((histories) => this.#propertyHistories.next(histories));
  }

  private fetchProperties(
    accountNumber: string
  ): Observable<PropertyHistory[]> {
    return this.#consumer
      .query()
      .where(`account_number like '${accountNumber}'`)
      .limit(10)
      .getRows<PropertyHistory>();
  }
}
