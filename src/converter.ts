import type { RawValues, ErrorSender } from "./types";

export type ConverterFunction<SourceType, TargetType> = (
  value: SourceType,
  sendError: ErrorSender
) => TargetType;

export class Converter<TargetType> {
  readonly run: ConverterFunction<RawValues, TargetType>;

  constructor(convert: ConverterFunction<RawValues, TargetType>) {
    this.run = convert;
  }

  then<NextTargetType>(
    nextConvert: (value: TargetType, sendError: ErrorSender) => NextTargetType
  ): Converter<NextTargetType> {
    return new Converter<NextTargetType>((rawValues, sendError) =>
      nextConvert(this.run(rawValues, sendError), sendError)
    );
  }
}

export const to = <TargetType>(
  convert: (
    rawValues: readonly string[] | undefined,
    sendError: ErrorSender
  ) => TargetType
): Converter<TargetType> => new Converter(convert);

export const toFlag = new Converter((value: unknown) => (value ? true : false));

export const asIs = new Converter((rawValues: RawValues) => rawValues);

export type ConverterRecord<T extends Record<string, unknown>> = {
  readonly [P in keyof T]: Converter<T[P]>;
};
