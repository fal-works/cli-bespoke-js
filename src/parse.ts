import { scan } from "./scan.js";
import { flag } from "./converter.js";
import { createAliasMapFunction } from "./alias.js";
import { config } from "./config.js";
import type { ConverterRecord } from "./converter";
import type { AliasRecord } from "./alias";

export const parse = <T extends Record<string, unknown>>(params: {
  args: readonly string[];
  convert: ConverterRecord<T>;
  alias?: AliasRecord;
}): T => {
  const { args, convert, alias = {} } = params;

  const isFlag = (optionName: string) => convert[optionName] === flag;
  const normalizeOptionName = createAliasMapFunction(alias);
  const rawData = scan(args, isFlag, normalizeOptionName);
  const result: Partial<T> = {};

  for (const optionName in convert) {
    const convertValues = convert[optionName];
    const sendError = (error: Error) =>
      config.onError(config.editError(error, optionName));
    result[optionName] = convertValues(rawData[optionName], sendError);
  }

  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  return result as T;
};
