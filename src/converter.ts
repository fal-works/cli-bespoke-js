import type { RawValues, ErrorSender } from "./types";

export type Converter<Input, Output> = (
  value: Input,
  sendError: ErrorSender
) => Output;

export type ChainableConverter<Output> = Converter<RawValues, Output> & {
  then: <NextOutput>(
    convert: Converter<Output, NextOutput>
  ) => ChainableConverter<NextOutput>;
};

const then = function <CurrentOutput, NextOutput>(
  this: Converter<RawValues, CurrentOutput>,
  next: Converter<CurrentOutput, NextOutput>
): ChainableConverter<NextOutput> {
  const convert: Converter<RawValues, NextOutput> = (rawValues, sendError) =>
    next(this(rawValues, sendError), sendError);

  return Object.assign(convert, { then });
};

export const first = <Output>(
  convert: (rawValues: RawValues, sendError: ErrorSender) => Output
): ChainableConverter<Output> => Object.assign(convert.bind(null), { then });

export type ConverterRecord<T extends Record<string, unknown>> = {
  readonly [P in keyof T]: Converter<RawValues, T[P]>;
};

export const flag: Converter<RawValues, boolean> = (rawValues) =>
  rawValues === undefined ? false : true;
