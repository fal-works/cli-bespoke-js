import { scan } from "./scan.js";
import { flag } from "./converter.js";
import { createAliasMapFunction } from "./alias.js";
import { config } from "./config.js";
import type { ConverterRecord } from "./converter";
import type { AliasRecord } from "./alias";

export const parse = <T extends Record<string, unknown>>(
  args: readonly string[],
  converters: ConverterRecord<T>,
  aliases: AliasRecord = {}
): T => {
  const isFlag = (optionName: string) => converters[optionName] === flag;
  const normalizeOptionName = createAliasMapFunction(aliases);
  const rawData = scan(args, isFlag, normalizeOptionName);
  const result: Partial<T> = {};

  for (const optionName in converters) {
    const convert = converters[optionName];
    const sendError = (error: Error) =>
      config.onError(config.editError(error, optionName));
    result[optionName] = convert(rawData[optionName], sendError);
  }

  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  return result as T;
};
