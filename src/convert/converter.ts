import type { RawValues, ErrorSender } from "../types";

export type Converter<Input, Output> = (
  value: Input,
  sendError: ErrorSender
) => Output;

export type ConverterRecord<T extends Record<string, unknown>> = {
  readonly [P in keyof T]: Converter<RawValues, T[P]>;
};

export const flag: Converter<RawValues, boolean> = (rawValues) =>
  rawValues === undefined ? false : true;
