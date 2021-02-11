import type { RawValues, ErrorSender } from "../../types";
import type { Converter } from "../converter";

export const asIs: Converter<RawValues, RawValues> = (rawValues) => rawValues;

export const required = <T>(
  value: T | undefined,
  sendError: ErrorSender
): T => {
  if (value === undefined) sendError(new Error("Missing value"));
  return value;
};

export const float: Converter<string, number> = (s) => parseFloat(s);
export const int: Converter<string, number> = (s) => parseInt(s);
