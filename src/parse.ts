import { scan } from "./scan.js";
import type { OptionsDefinition } from "./options-definition";

export const parse = <T extends Record<string, unknown>>(
  args: readonly string[],
  optionsDefinition: OptionsDefinition<T>
): T => {
  const rawData = scan(args, optionsDefinition);
  const result: Partial<T> = {};

  for (const name in optionsDefinition)
    result[name] = optionsDefinition[name].convert(rawData[name]);

  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  return result as T;
};
