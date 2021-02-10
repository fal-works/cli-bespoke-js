import type { ErrorSender } from "../types";

export const required = <T>(
  value: T | null | undefined,
  sendError: ErrorSender
): T => {
  if (value == null) sendError("Missing value");
  return value;
};

export const atDefault = <T>(defaultValue: T) => (
  value: T | null | undefined
): T => value ?? defaultValue;
