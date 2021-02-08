import type { Converter } from "./converter.js";

export type ScanOptionDefinition = {
  readonly isFlag?: boolean;
};

export type ConvertOptionDefinition<T> = {
  readonly convert: Converter<T>;
};

export type OptionsDefinition<
  T extends Record<string, unknown> = Record<string, unknown>
> = {
  readonly [P in keyof T]: ConvertOptionDefinition<T[P]> & ScanOptionDefinition;
};
