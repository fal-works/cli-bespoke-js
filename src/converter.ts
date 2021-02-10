import type { RawValues, ErrorSender } from "./types";

export class Converter<T> {
  readonly run: (rawValues: RawValues, sendError: ErrorSender) => T;

  constructor(convert: (rawValues: RawValues, sendError: ErrorSender) => T) {
    this.run = convert;
  }

  then<U>(nextConvert: (value: T, sendError: ErrorSender) => U): Converter<U> {
    return new Converter<U>((rawValues, sendError) =>
      nextConvert(this.run(rawValues, sendError), sendError)
    );
  }
}

export const to = <T>(
  convert: (rawValues: RawValues, sendError: ErrorSender) => T
): Converter<T> => new Converter(convert);

export const toFlag = new Converter((value: unknown) => (value ? true : false));

export const asIs = new Converter((rawValues: RawValues) => rawValues);

export type ConverterRecord<T extends Record<string, unknown>> = {
  readonly [P in keyof T]: Converter<T[P]>;
};
