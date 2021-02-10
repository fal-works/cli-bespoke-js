import type { RawValues } from "../types";

export const float = (s: string): number => parseFloat(s);
export const int = (s: string): number => parseInt(s);

export const floatList = (values: RawValues): number[] =>
  values === undefined ? [] : values.map(float);

export const intList = (values: RawValues): number[] =>
  values === undefined ? [] : values.map(int);
