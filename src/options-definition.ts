import type { RawValues } from "./types";

export type OptionsDefinition<
  T extends Record<string, unknown> = Record<string, unknown>
> = {
  readonly [P in keyof T]: {
    readonly validate: (rawValues: RawValues) => T[P];
    readonly isFlag?: boolean;
  };
};
