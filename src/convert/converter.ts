import type { StringRecord } from "../common/types";
import type { RawValues } from "../scan";

/**
 * Function that handles `error` and performs a nonlocal exit.
 */
export type ErrorSender = (error: Error) => never;

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
export type ConverterRecord<T extends StringRecord> = {
  readonly [P in keyof T]: Converter<RawValues, T[P]>;
};

/**
 * A special `Converter` that returns `true` if the given value is not
 * `undefined`. If passed to `parse()`, it also prevents the option from
 * receiving subsequent values.
 */
export const flag: Converter<RawValues, boolean> = (rawValues) =>
  rawValues === undefined ? false : true;
