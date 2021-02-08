import type { RawValues } from "./types";
import type { OptionsDefinition } from "./options-definition";

export type Validators<T extends Record<string, unknown>> = {
  readonly [P in keyof T]: (rawValues: RawValues) => T[P];
};

export const validate = <T extends Record<string, unknown>>(
  rawData: Readonly<Record<string, readonly string[]>>,
  optionsDefinition: OptionsDefinition<T>
): T => {
  const result: Partial<T> = {};

  for (const name in optionsDefinition)
    result[name] = optionsDefinition[name].validate(rawData[name]);

  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  return result as T;
};
