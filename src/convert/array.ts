export const zeroOrOne = <T>(values: readonly T[] | undefined): T | null => {
  if (!values) return null;
  if (1 < values.length) throw "Too many values";
  return values[0] ?? null;
};

export const justOne = <T>(values: readonly T[] | undefined): T => {
  if (!values) throw "Missing value";
  if (1 < values.length) throw "Too many values";
  const value = values[0];
  if (!value) throw "Missing value";
  return value;
};
