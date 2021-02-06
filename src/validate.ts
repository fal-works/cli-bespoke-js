export type Validators<T extends Record<string, unknown>> = {
  readonly [P in keyof T]: (values: readonly string[] | undefined) => T[P];
};

export const validate = <T extends Record<string, unknown>>(
  rawData: Readonly<Record<string, readonly string[]>>,
  validators: Validators<T>
): T => {
  const result: Partial<T> = {};

  for (const name in validators) result[name] = validators[name](rawData[name]);

  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  return result as T;
};
