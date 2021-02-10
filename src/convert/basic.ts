import type { RawValues } from "../types";
import type { Converter } from "../converter";

export const asIs: Converter<RawValues, RawValues> = (rawValues) => rawValues;
