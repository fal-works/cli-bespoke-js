import { scan } from "./scan.js";
import { toFlag } from "./converter.js";
import { createAliasMapFunction } from "./alias.js";
import type { ConverterRecord } from "./converter";
import type { AliasRecord } from "./alias";

export const parse = <T extends Record<string, unknown>>(
  args: readonly string[],
  converters: ConverterRecord<T>,
  aliases: AliasRecord = {}
): T => {
  const isFlag = (optionName: string) => converters[optionName] === toFlag;
  const normalizeOptionName = createAliasMapFunction(aliases);
  const rawData = scan(args, isFlag, normalizeOptionName);
  const result: Partial<T> = {};

  for (const name in converters) {
    const sendError = (message: string) => {
      throw new Error(`${message} (option: ${name})`);
    };
    result[name] = converters[name].run(rawData[name], sendError);
  }

  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  return result as T;
};
