/**
 * Property Information Current Calendar Year
 * https://data.edmonton.ca/City-Administration/Property-Information-Current-Calendar-Year-/dkk9-cj3x
 */
export type PropertyInfo = {
  account_number: string;
  suite: string;
  house_number: string;
  street_name: string;
  legal_description: string;
  zoning: string;
  lot_size: number;
  year_built: number;
  garage: boolean;
  tax_class: string;
  neighbourhood_id: number;
  neighbourhood: string;
  ward: string;
  latitude: number;
  longitude: number;
};
