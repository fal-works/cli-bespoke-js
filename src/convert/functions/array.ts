type MapCallback<Input, Output> = (
  element: Input,
  index: number,
  array: readonly Input[]
) => Output;

export const map = <Input, Output>(callback: MapCallback<Input, Output>) => (
  values: readonly Input[]
): Output[] => values.map(callback);

export const split = (separator: string) => (
  values: string | readonly string[]
): string[] =>
  typeof values === "string"
    ? values.split(separator)
    : values.flatMap((s) => s.split(separator));
