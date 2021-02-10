import type { RawValues, ErrorSender } from "./types";

export type ConverterFunction<FromType, ToType> = (
  value: FromType,
  sendError: ErrorSender
) => ToType;

export class Converter<T> {
  readonly run: ConverterFunction<RawValues, T>;

  constructor(convert: ConverterFunction<RawValues, T>) {
    this.run = convert;
  }

  then<NextType>(
    nextConvert: (value: T, sendError: ErrorSender) => NextType
  ): Converter<NextType> {
    return new Converter<NextType>((rawValues, sendError) =>
      nextConvert(this.run(rawValues, sendError), sendError)
    );
  }
}

export const to = <T>(
  convert: (
    rawValues: readonly string[] | undefined,
    sendError: ErrorSender
  ) => T
): Converter<T> => new Converter(convert);

export const toFlag = new Converter((value: unknown) => (value ? true : false));

export const asIs = new Converter((rawValues: RawValues) => rawValues);

export type ConverterRecord<T extends Record<string, unknown>> = {
  readonly [P in keyof T]: Converter<T[P]>;
};
