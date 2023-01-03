/* eslint @typescript-eslint/naming-convention: "off" */
/** Historical Property Data
 * https://data.edmonton.ca/City-Administration/Property-Assessment-Data-Historical-/qi6a-xuwt
 */
export interface PropertyHistory {
  account_number: string;
  assessment_year: number;
  suite: string;
  house_number: string;
  street_name: string;
  legal_description: string;
  latitude: number;
  longitude: number;
  // point
  neighbourhood_name: string;
  year_built: number;
  garage: "Y" | "N";
  zoning: string;
  lot_size: number;
  assessed_value: number;
  /** Assessment Class 1 */
  mill_class_1: string;
  /** The percentage of buildings or areas on the property making up the first assessment class */
  tax_class_pct_1: string;
  /** Assessment Class 2 */
  mill_class_2: string;
  /** The percentage of buildings or areas on the property making up the second assessment class */
  tax_class_pct_2: string;
  /** Assessment Class 3 */
  mill_class_3: string;
  /** The percentage of buildings or areas on the property making up the third assessment class */
  tax_class_pct_3: string;
}
