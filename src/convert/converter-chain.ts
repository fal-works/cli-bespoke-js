import type { RawValues, ErrorSender } from "../types";
import type { Converter } from "./converter";

/**
 * A `Converter` function that has also a `then()` method, which accepts
 * another `Converter` and creates a new chained `Converter`.
 */
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

/**
 * Creates a `ChainableConverter` so that it can be chained with another
 * `Converter` using the `then()` method.
 */
export const first = <Output>(
  convert: (rawValues: RawValues, sendError: ErrorSender) => Output
): ChainableConverter<Output> => Object.assign(convert.bind(null), { then });
