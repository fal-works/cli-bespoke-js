import type { RawValues, ErrorSender } from "../types";

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

export const commaSeparated = (values: RawValues): string[] =>
  values === undefined ? [] : values.flatMap((s) => s.split(","));
