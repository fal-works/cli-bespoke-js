export const flag = (value: unknown): boolean => (value ? true : false);

export const required = <T>(value: T | null | undefined): T => {
  if (value) return value;
  throw "Missing value";
};

export const atDefault = <T>(defaultValue: T) => (
  value: T | null | undefined
): T => value ?? defaultValue;
