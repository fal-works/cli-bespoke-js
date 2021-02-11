const addOptionValue = (
  options: Record<string, string[]>,
  name: string,
  value: string
) => {
  const option = options[name];
  if (option === undefined) options[name] = [value];
  else option.push(value);
};

const findCharCode = (
  str: string,
  charCode: number,
  start: number,
  end: number
): number => {
  for (let i = start; i < end; i += 1)
    if (str.charCodeAt(i) === charCode) return i;

  return -1;
};

type ScanResult = {
  readonly _: readonly string[];
  readonly [optionName: string]: readonly string[];
};

type MutableScanResult = {
  readonly _: string[];
  [optionName: string]: string[];
};

export const scan = (
  args: readonly string[],
  isFlag: (optionName: string) => boolean,
  normalizeOptionName: (name: string) => string
): ScanResult => {
  const parameters: string[] = [];
  const result: MutableScanResult = { _: parameters };
  let currentValueContainer = parameters;

  const argsLen = args.length;
  for (let argIndex = 0; argIndex < argsLen; argIndex += 1) {
    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
    const arg = args[argIndex] as string;

    // Either a parameter or an option value
    if (arg.charCodeAt(0) !== /* hyphen */ 45) {
      currentValueContainer.push(arg);
      currentValueContainer = parameters;
      continue;
    }

    const argLen = arg.length;

    switch (argLen) {
      // bare single hyphen
      case 1:
        continue;

      case 2:
        // bare double hyphens
        if (arg.charCodeAt(1) === /* hyphen */ 45) {
          for (let i = argIndex + 1; i < argsLen; i += 1) {
            // eslint-disable-next-line total-functions/no-unsafe-type-assertion
            parameters.push(args[i] as string);
          }
          return result;
        }
        // just a short option name
        else {
          const optionName = normalizeOptionName(arg.charAt(1));
          currentValueContainer = result[optionName] ??= [];
          continue;
        }
    }

    // Option with single hyphen
    if (arg.charCodeAt(1) !== /* hyphen */ 45) {
      // short option with equal-separated value
      if (arg.charCodeAt(2) === /* equal */ 61) {
        const optionName = normalizeOptionName(arg.charAt(1));
        addOptionValue(result, optionName, arg.substring(3));
        continue;
      }

      // multiple short option names
      for (let i = 1; i < argLen; i += 1) {
        const optionName = normalizeOptionName(arg.charAt(i));
        result[optionName] ??= [];
      }
      continue;
    }
    // Option with double hyphens
    else {
      const equalIndex = findCharCode(arg, /* equal */ 61, 3, argLen);

      // long option with equal-separated value
      if (equalIndex !== -1) {
        const optionName = normalizeOptionName(arg.substring(2, equalIndex));
        addOptionValue(result, optionName, arg.substring(equalIndex + 1));
        continue;
      }

      // just a long option name
      const optionName = normalizeOptionName(arg.slice(2));
      const option = (result[optionName] ??= []);
      if (!isFlag(optionName)) currentValueContainer = option;
    }
  }

  return result;
};
