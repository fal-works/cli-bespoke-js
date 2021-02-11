import type { RawValues, ErrorSender } from "../../types";
import type { Converter } from "../converter";

export const asIs: Converter<RawValues, RawValues> = (rawValues) => rawValues;

export const required = <T>(
  value: T | null | undefined,
  sendError: ErrorSender
): T => {
  if (value == null) sendError(new Error("Missing value"));
  return value;
};

export const float = (s: string): number => parseFloat(s);
export const int = (s: string): number => parseInt(s);
