import type { StringRecord, LazyProps } from "./common/types";
import type { ConverterRecord } from "./convert";
import type { AliasRecord } from "./alias";
import { scan } from "./scan.js";
import { flag } from "./convert/converter.js";
import { createAliasMapFunction } from "./alias.js";
import { config } from "./common/config.js";

/**
 * Arguments to be passed to `parse()`.
 */
export type ParseParams<Result extends StringRecord> = {
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
  convert: ConverterRecord<Result>;

  /**
   * Object whose keys are option names and whose values are alias names.
   * Unlike `convert`, here you do not have to specify all option names.
   */
  alias?: AliasRecord;
};

/**
 * Calls `scan()`.
 */
const scanData = (params: ParseParams<StringRecord>) => {
  const { args, convert, alias = {} } = params;
  const isFlag = (optionName: string) => convert[optionName] === flag;
  const normalizeOptionName = createAliasMapFunction(alias);

  return scan(args, isFlag, normalizeOptionName);
};

/**
 * Creates a function that raises an `Error` for `optionName`.
 */
const sendError = (optionName: string) => (error: Error) =>
  config.onError(config.editError(error, optionName));

/**
 * Creates a function that converts values for a given option name.
 */
const prepareConvert = <Result extends StringRecord>(
  params: ParseParams<Result>
) => {
  const { convert } = params;
  const rawData = scanData(params);

  return <P extends Extract<keyof Result, string>>(optionName: P) =>
    convert[optionName](rawData[optionName], sendError(optionName));
};

/**
 * Parses a commandline.
 * Returns an object containg parameters (`_`) and options that are typed and
 * validated.
 */
export const parse = <Result extends StringRecord>(
  params: ParseParams<Result>
): Result => {
  const convertValues = prepareConvert(params);
  const result: Partial<Result> = {};

  for (const optionName in params.convert)
    result[optionName] = convertValues(optionName);

  // eslint-disable-next-line total-functions/no-unsafe-type-assertion
  return result as Result;
};
