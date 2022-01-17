/** Property Information Current Calendar Year
 * https://data.edmonton.ca/City-Administration/Property-Information-Current-Calendar-Year-/dkk9-cj3x
 *
 */
export class PropertyInfo {
  public account_number: string;
  public suite: string;
  public house_number: string;
  public street_name: string;
  public legal_description: string;
  public zoning: string;
  public lot_size: number;
  public year_built: number;
  public garage: boolean;
  public tax_class: string;
  public neighbourhood_id: number;
  public neighbourhood: string;
  public ward: string;
  public latitude: number;
  public longitude: number;

  get address(): string {
    let address = '';
    if (this.suite) {
      address += `#${this.suite} `;
    }
    if (this.house_number) {
      address += `${this.house_number} `;
    }
    address += this.street_name && this.street_name;
    return address;
  }

  get latLng(): google.maps.LatLng {
    return new google.maps.LatLng(this.latitude, this.longitude);
  }
}
