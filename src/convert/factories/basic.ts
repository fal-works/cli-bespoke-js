import type { ErrorSender } from "../../types";
import type { Converter } from "../converter";

export const optional = <Input, Output>(
  convert: Converter<Input, Output>
): Converter<Input | undefined, Output | undefined> => (value, sendError) =>
  value === undefined ? undefined : convert(value, sendError);

export const atDefault = <S>(defaultValue: S) => <T>(
  value: T | undefined
): T | S => (value === undefined ? defaultValue : value);

export const validValues = <T>(
  candidates: readonly T[]
): Converter<unknown, T> => (value: unknown, sendError: ErrorSender): T => {
  for (const candidate of candidates) if (value === candidate) return candidate;

  sendError(new Error(`Invalid value "${String(value)}"`));
};
