import type { Property } from "./data.edmonton.ca/property.type.ts";
import type { PropertyInfo } from "./data.edmonton.ca/property_info.type.ts";

export function formatAddress(property: PropertyInfo | Property) {
  let address = "";
  if (property.suite) {
    address += `#${property.suite} `;
  }
  if (property.house_number) {
    address += `${property.house_number} `;
  }
  address += property.street_name;
  return address;
}
