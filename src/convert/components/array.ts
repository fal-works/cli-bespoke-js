import type { ErrorSender } from "../../types";

export const optionalOne = <T>(
  values: readonly T[] | undefined,
  sendError: ErrorSender
): T | undefined => {
  if (values === undefined) return undefined;
  if (1 < values.length) sendError(new Error("Too many values"));
  return values[0];
};

export const zeroOrOne = <T>(
  values: readonly T[] | undefined,
  sendError: ErrorSender
): T | null => {
  if (values === undefined) return null;
  if (1 < values.length) sendError(new Error("Too many values"));
  return values[0] ?? null;
};

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

export const zeroOrMore = <T>(values: readonly T[] | undefined): readonly T[] =>
  values ?? [];

export const oneOrMore = <T>(
  values: readonly T[] | undefined,
  sendError: ErrorSender
): [T, ...T[]] => {
  if (values === undefined) sendError(new Error("Missing value"));
  if (values.length === 0) sendError(new Error("Missing value"));

  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  return values as [T, ...T[]];
};
