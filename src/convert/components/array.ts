import type { ErrorSender } from "../../types";

/**
 * - Returns the first element of `values`.
 * - Returns `undefined` if `values` is `undefined` or empty.
 * - Raises error if `values` has more than 1 elements.
 */
export const optionalOne = <T>(
  values: readonly T[] | undefined,
  sendError: ErrorSender
): T | undefined => {
  if (values === undefined) return undefined;
  if (1 < values.length) sendError(new Error("Too many values"));
  return values[0];
};

/**
 * - Returns the first element of `values`.
 * - Returns `null` if `values` is `undefined` or empty.
 * - Raises error if `values` has more than 1 elements.
 */
export const zeroOrOne = <T>(
  values: readonly T[] | undefined,
  sendError: ErrorSender
): T | null => {
  if (values === undefined) return null;
  if (1 < values.length) sendError(new Error("Too many values"));
  return values[0] ?? null;
};

/**
 * - Returns the first element of `values`.
 * - Raises error unless `values` has just 1 element.
 */
export const justOne = <T>(
  values: readonly T[] | undefined,
  sendError: ErrorSender
): T => {
  if (values === undefined) sendError(new Error("Missing value"));
  if (1 < values.length) sendError(new Error("Too many values"));
  const value = values[0];
  if (!value) sendError(new Error("Missing value"));
  return value;
};

/**
 * Returns an empty array if `values` is `undefined`.
 */
export const zeroOrMore = <T>(values: readonly T[] | undefined): readonly T[] =>
  values ?? [];

/**
 * Raises error if `values` is `undefined` or empty.
 */
export const oneOrMore = <T>(
  values: readonly T[] | undefined,
  sendError: ErrorSender
): [T, ...T[]] => {
  if (values === undefined) sendError(new Error("Missing value"));
  if (values.length === 0) sendError(new Error("Missing value"));

  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  return values as [T, ...T[]];
};
