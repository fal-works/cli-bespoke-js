import type { ErrorSender } from "../../types";
import type { Converter } from "../converter";

export const optional = <Input, Output>(convert: Converter<Input, Output>) => (
  value: Input | undefined,
  sendError: ErrorSender
): Output | undefined =>
  value === undefined ? undefined : convert(value, sendError);

export const atDefault = <S>(defaultValue: S) => <T>(
  value: T | null | undefined
): T | S => value ?? defaultValue;

export const validValues = <T>(candidates: readonly T[]) => (
  value: unknown,
  sendError: ErrorSender
): T => {
  for (const candidate of candidates) if (value === candidate) return candidate;

  sendError(new Error(`Invalid value "${String(value)}"`));
};
