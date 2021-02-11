import type { ConverterRecord } from "./convert";
import type { AliasRecord } from "./alias";
import { scan } from "./scan.js";
import { flag } from "./convert/converter.js";
import { createAliasMapFunction } from "./alias.js";
import { config } from "./common/config.js";

/**
 * Arguments to be passed to `parse()`.
 */
export type ParseParams<T extends Record<string, unknown>> = {
  /**
   * Array of arguments.
   * Typically `process.argv.slice(2)` or `anyCommandlineString.split(" ")`.
   */
  args: readonly string[];

  /**
   * Object whose keys are option names (or an underscore `_` for parameters)
   * and whose values are `Converter` functions.
   *
   * Specify all possible options (excluding aliases) here. Only options
   * whose names are contained in this object will be parsed. This object
   * also determines the types of the returning parameters and option values.
   *
   * Use `flag` (which is a special `Converter`) for options that do not
   * receive values.
   */
  convert: ConverterRecord<T>;

  /**
   * Object whose keys are option names and whose values are alias names.
   * Unlike `convert`, here you do not have to specify all option names.
   */
  alias?: AliasRecord;
};

/**
 * Parses a commandline.
 * Returns an object containg parameters (`_`) and options that are typed and
 * validated.
 */
export const parse = <T extends Record<string, unknown>>(
  params: ParseParams<T>
): T => {
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
