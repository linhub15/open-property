import * as v from "@valibot/valibot";

/** Historical Property Data
 * https://data.edmonton.ca/City-Administration/Property-Assessment-Data-Historical-/qi6a-xuwt
 */
export const PropertySchema = v.object({
  account_number: v.string(),
  assessment_year: v.pipe(v.string(), v.transform(Number)),
  suite: v.string(),
  house_number: v.string(),
  street_name: v.string(),
  legal_description: v.string(),
  latitude: v.pipe(v.string(), v.transform(Number)),
  longitude: v.pipe(v.string(), v.transform(Number)),
  point_location: v.object({
    type: v.string("Point"),
    coordinates: v.tuple([v.number(), v.number()]),
  }),
  neighbourhood_name: v.string(),
  year_built: v.pipe(v.string(), v.transform(Number)),
  garage: v.union([v.literal("Y"), v.literal("N")]),
  zoning: v.string(),
  lot_size: v.pipe(v.string(), v.transform(Number)),
  assessed_value: v.pipe(v.string(), v.transform(Number)),
  mill_class_1: v.string(),
  tax_class_pct_1: v.string(),
  mill_class_2: v.string(),
  tax_class_pct_2: v.string(),
  mill_class_3: v.string(),
  tax_class_pct_3: v.string(),
});

export type Property = v.InferOutput<typeof PropertySchema>;
