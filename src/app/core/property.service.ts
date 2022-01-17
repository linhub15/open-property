import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

import { PropertyHistory } from './property-history.model';
import { Consumer, and, or } from './ng-soda-client';
import { PropertyInfo } from './property-info.model';

@Injectable()
export class PropertyService {
  #consumer = new Consumer('data.edmonton.ca', {
    datasetId: 'qi6a-xuwt'
  });

  #selectedProperty = new BehaviorSubject<PropertyInfo>(null);
  #historicalProperties = new BehaviorSubject<PropertyHistory[]>(null);

  get selectedProperty$(): Observable<PropertyInfo> {
    return this.#selectedProperty.asObservable();
  }

  get historicalProperties$(): Observable<PropertyHistory[]> {
    return this.#historicalProperties.asObservable();
  }

  select(property: PropertyInfo): void {
    this.#selectedProperty.next(property);
    this.fetchPropertyHistory(property.account_number);
  }

  private fetchPropertyHistory(accountNumber: string) {
    this.fetchProperties(accountNumber)
    .pipe( // Add the methods from the class to plain object
      map(properties =>
        Array.from(properties, property =>
          Object.setPrototypeOf(property, new PropertyHistory())
        )
      )
    )
    .subscribe(properties => this.#historicalProperties.next(properties));
  }


  private fetchProperties(accountNumber: string): Observable<PropertyHistory[]> {
    return this.#consumer
      .query()
      .where(`account_number like '${accountNumber}'`)
      .limit(10)
      .getRows<PropertyHistory>();
  }
}
