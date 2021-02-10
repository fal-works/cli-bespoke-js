import type { RawValues } from "./types";

export class Converter<T> {
  readonly run: (rawValues: RawValues) => T;

  constructor(convert: (rawValues: RawValues) => T) {
    this.run = convert;
  }

  then<U>(nextConvert: (value: T) => U): Converter<U> {
    return new Converter<U>((rawValues) => nextConvert(this.run(rawValues)));
  }
}

export const to = <T>(convert: (rawValues: RawValues) => T): Converter<T> =>
  new Converter(convert);

export const toFlag = new Converter((value: unknown) => (value ? true : false));

export type ConverterRecord<T extends Record<string, unknown>> = {
  readonly [P in keyof T]: Converter<T[P]>;
};
