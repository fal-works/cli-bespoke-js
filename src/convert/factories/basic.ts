import type { Converter, ErrorSender } from "../converter";

/**
 * - Converts and returns the given value.
 * - If the given value is `undefined`, returns `undefined` without conversion.
 */
export const optional = <Input, Output>(
  convert: Converter<Input, Output>
): Converter<Input | undefined, Output | undefined> => (value, sendError) =>
  value === undefined ? undefined : convert(value, sendError);

/**
 * - Returns the given value.
 * - If the given value is `undefined`, returns `defaultValue` instead.
 */
export const atDefault = <DefaultValue>(defaultValue: DefaultValue) => <T>(
  value: T | undefined
): T | DefaultValue => (value === undefined ? defaultValue : value);

/**
 * Raises error if the given value is not included in `candidates`.
 * Elements will be compared with a simple `===` operator.
 */
export const validValues = <T>(
  candidates: readonly T[]
): Converter<unknown, T> => (value: unknown, sendError: ErrorSender): T => {
  for (const candidate of candidates) if (value === candidate) return candidate;

  sendError(new Error(`Invalid value "${String(value)}"`));
};
