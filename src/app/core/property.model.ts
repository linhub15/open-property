/// <reference types="@types/googlemaps" />

import { Assessment } from './assessment.model';

export class Property {
  constructor(assessment: Assessment) {
    this._assessment = assessment;
  }

  private _assessment: Assessment;

  get address(): string {
    let address = '';
    if (this._assessment.suite) {
      address += `${this._assessment.suite} `;
    }
    if (this._assessment.house_number) {
      address += `${this._assessment.house_number} `;
    }
    address += this._assessment.street_name && this._assessment.street_name;
    return address;
  }

  get assessedValue(): string {
    return `${this._assessment.assessed_value}`;
  }

  get latLng(): google.maps.LatLng {
    return new google.maps.LatLng(
      this._assessment.latitude,
      this._assessment.longitude
    );
  }
}
