import type { Converter } from "../converter";
import * as cv from "../components/array.js";

export const optionalOne = <Input, Output>(
  convert: Converter<Input, Output>
): Converter<readonly Input[] | undefined, Output | undefined> => {
  return (values, sendError) => {
    const value = cv.optionalOne(values, sendError);
    return value === undefined ? undefined : convert(value, sendError);
  };
};

export const zeroOrOne = <Input, Output>(
  convert: Converter<Input, Output>
): Converter<readonly Input[] | undefined, Output | null> => {
  return (values, sendError) => {
    const value = cv.zeroOrOne(values, sendError);
    return value === null ? null : convert(value, sendError);
  };
};

export const justOne = <Input, Output>(
  convert: Converter<Input, Output>
): Converter<readonly Input[] | undefined, Output> => {
  return (values, sendError) => {
    const value = cv.justOne(values, sendError);
    return convert(value, sendError);
  };
};

export const zeroOrMore = <Input, Output>(
  convert: Converter<Input, Output>
): Converter<readonly Input[] | undefined, Output[]> => {
  return (values, sendError) =>
    cv.zeroOrMore(values).map((value) => convert(value, sendError));
};

export const oneOrMore = <Input, Output>(
  convert: Converter<Input, Output>
): Converter<readonly Input[] | undefined, [Output, ...Output[]]> => {
  return (values, sendError) => {
    const outputValues = cv
      .oneOrMore(values, sendError)
      .map((value) => convert(value, sendError));

    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
    return outputValues as [Output, ...Output[]];
  };
};

type MapCallback<Input, Output> = (
  element: Input,
  index: number,
  array: readonly Input[]
) => Output;

export const map = <Input, Output>(
  callback: MapCallback<Input, Output>
): Converter<readonly Input[], Output[]> => (values) => values.map(callback);

export const split = (
  separator: string
): Converter<string | readonly string[], string[]> => {
  return (values) =>
    typeof values === "string"
      ? values.split(separator)
      : values.flatMap((s) => s.split(separator));
};
