import { formatAddress } from "../src/format_address.ts";
import type { PropertyInfo } from "../src/property_info.model.ts";

export default function SearchOptions(
  { searchResults: properties }: { searchResults: PropertyInfo[] },
) {
  return (
    <div>
      <section>
        <div class="text-gray-900 dark:text-white px-4">
          {properties.map((property) => (
            <a
              key={property.account_number}
              class="block rounded-md
                py-4 px-4 w-full font-medium cursor-pointer
                hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:text-blue-700
                dark:hover:bg-gray-500 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-gray-300"
              href={property.account_number}
            >
              {formatAddress(property)}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
