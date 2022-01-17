export class Property {
  public account_number: string;
  public suite: string;
  public house_number: string;
  public street_name: string;
  public assessed_value: number;
  public tax_class: string;
  public neighbourhood_id: number;
  public neighbourhood: string;
  public ward: string;
  public garage: string;
  public latitude: number;
  public longitude: number;

  get address(): string {
    let address = '';
    if (this.suite) {
      address += `${this.suite} `;
    }
    if (this.house_number) {
      address += `${this.house_number} `;
    }
    address += this.street_name && this.street_name;
    return address;
  }

  get assessedValue(): string {
    return `$${this.assessed_value}`;
  }

  get latLng(): google.maps.LatLng {
    return new google.maps.LatLng(this.latitude, this.longitude);
  }
}
