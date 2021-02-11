import type { RawValues, ErrorSender } from "../types";

/**
 * Function that converts an input `value` to another.
 */
export type Converter<Input, Output> = (
  value: Input,
  sendError: ErrorSender
) => Output;

/**
 * Object containing `Converter` functions. Should be passed to `parse()`.
 */
export type ConverterRecord<T extends Record<string, unknown>> = {
  readonly [P in keyof T]: Converter<RawValues, T[P]>;
};

/**
 * A special `Converter` that returns `true` if the given value is not
 * `undefined`. If passed to `parse()`, it also prevents the option from
 * receiving subsequent values.
 */
export const flag: Converter<RawValues, boolean> = (rawValues) =>
  rawValues === undefined ? false : true;
