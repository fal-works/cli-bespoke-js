import { scan } from "./scan.js";
import { toFlag } from "./converter.js";
import { createAliasMap } from "./alias.js";
import type { ConverterMap } from "./converter";
import type { AliasRecord } from "./alias";

export const parse = <T extends Record<string, unknown>>(
  args: readonly string[],
  converterMap: ConverterMap<T>,
  aliases: AliasRecord<T> = {}
): T => {
  const isFlag = (optionName: string) => converterMap[optionName] === toFlag;
  const aliasMap = createAliasMap(aliases);
  const normalizeOptionName = (name: string) => aliasMap.get(name) ?? name;
  const rawData = scan(args, isFlag, normalizeOptionName);
  const result: Partial<T> = {};

  for (const name in converterMap)
    result[name] = converterMap[name].run(rawData[name]);

  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  return result as T;
};
