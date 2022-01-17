/** Historical Property Data
 * https://data.edmonton.ca/City-Administration/Property-Assessment-Data-Historical-/qi6a-xuwt
 */
export class PropertyHistory {
  public account_number: string;
  public assessment_year: number;
  public suite: string;
  public house_number: string;
  public street_name: string;
  public legal_description: string;
  public latitude: number;
  public longitude: number;
  // point
  public neighbourhood_name: string;
  public year_built: number;
  public garage: string; // 'Y', 'N'
  public zoning: string;
  public lot_size: number;
  public assessed_value: number;
  /** Assessment Class 1 */
  public mill_class_1: string;
  /** The percentage of buildings or areas on the property making up the first assessment class */
  public tax_class_pct_1: string;
  /** Assessment Class 2 */
  public mill_class_2: string;
  /** The percentage of buildings or areas on the property making up the second assessment class */
  public tax_class_pct_2: string;
  /** Assessment Class 3 */
  public mill_class_3: string;
  /** The percentage of buildings or areas on the property making up the third assessment class */
  public tax_class_pct_3: string;

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
