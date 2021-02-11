import type { RawValues } from "../../scan";
import type { Converter, ErrorSender } from "../converter";

/**
 * Returns the passed values without any conversion.
 */
export const asIs: Converter<RawValues, RawValues> = (rawValues) => rawValues;

/**
 * Raises error if `value` is `undefined`.
 */
export const required = <T>(
  value: T | undefined,
  sendError: ErrorSender
): T => {
  if (value === undefined) sendError(new Error("Missing value"));
  return value;
};

/**
 * Converts a string to a floating point number.
 */
export const float: Converter<string, number> = (s) => parseFloat(s);

/**
 * Converts a string to an integer.
 */
export const int: Converter<string, number> = (s) => parseInt(s);
