export type OptionsDefinition<
  T extends Record<string, unknown> = Record<string, unknown>
> = {
  readonly [P in keyof T]: {
    readonly validate: (values: readonly string[] | undefined) => T[P];
    readonly isFlag?: boolean;
  };
};
