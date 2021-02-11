import type { ErrorSender } from "../types";
import type { Converter } from "../converter";

export const optional = <Input, Output>(convert: Converter<Input, Output>) => (
  value: Input | undefined,
  sendError: ErrorSender
): Output | undefined =>
  value === undefined ? undefined : convert(value, sendError);

export const required = <T>(
  value: T | null | undefined,
  sendError: ErrorSender
): T => {
  if (value == null) sendError(new Error("Missing value"));
  return value;
};

export const atDefault = <S>(defaultValue: S) => <T>(
  value: T | null | undefined
): T | S => value ?? defaultValue;
