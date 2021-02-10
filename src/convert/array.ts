import type { RawValues, ErrorSender } from "../types";

export const optionalOne = <T>(
  values: readonly T[] | undefined,
  sendError: ErrorSender
): T | undefined => {
  if (values === undefined) return undefined;
  if (1 < values.length) sendError("Too many values");
  return values[0];
};

export const zeroOrOne = <T>(
  values: readonly T[] | undefined,
  sendError: ErrorSender
): T | null => {
  if (values === undefined) return null;
  if (1 < values.length) sendError("Too many values");
  return values[0] ?? null;
};

export const justOne = <T>(
  values: readonly T[] | undefined,
  sendError: ErrorSender
): T => {
  if (values === undefined) sendError("Missing value");
  if (1 < values.length) sendError("Too many values");
  const value = values[0];
  if (!value) sendError("Missing value");
  return value;
};

export const zeroOrMore = <T>(values: readonly T[] | undefined): readonly T[] =>
  values ?? [];

export const oneOrMore = <T>(
  values: readonly T[] | undefined,
  sendError: ErrorSender
): readonly [T, ...T[]] => {
  if (values === undefined) sendError("Missing value");
  if (values.length === 0) sendError("Missing value");
  return values as readonly [T, ...T[]];
};

export const commaSeparated = (values: RawValues): string[] =>
  values === undefined ? [] : values.flatMap((s) => s.split(","));
