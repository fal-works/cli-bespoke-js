import { scan } from "./scan.js";
import { toFlag } from "./converter.js";
import type { ConverterMap } from "./converter";

export const parse = <T extends Record<string, unknown>>(
  args: readonly string[],
  converterMap: ConverterMap<T>
): T => {
  const isFlag = (optionName: string) => converterMap[optionName] === toFlag;
  const rawData = scan(args, isFlag);
  const result: Partial<T> = {};

  for (const name in converterMap)
    result[name] = converterMap[name].run(rawData[name]);

  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  return result as T;
};
