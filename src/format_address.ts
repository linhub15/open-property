import { PropertyHistory } from "./property_history.model.ts";
import { PropertyInfo } from "./property_info.model.ts";

export function formatAddress(property: PropertyInfo | PropertyHistory) {
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
