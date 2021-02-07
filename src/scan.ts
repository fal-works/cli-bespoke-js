import type { OptionsDefinition } from "./options-definition";

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

export const scan = (
  args: readonly string[],
  optionsDefinition: OptionsDefinition
): Readonly<Record<string, readonly string[]>> => {
  const parameters: string[] = [];
  const options: Record<string, string[]> = { _: parameters };
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
          return options;
        }
        // just a short option name
        else {
          currentValueContainer = options[arg.charAt(1)] ??= [];
          continue;
        }
    }

    // Option with single hyphen
    if (arg.charCodeAt(1) !== /* hyphen */ 45) {
      // short option with equal-separated value
      if (arg.charCodeAt(2) === /* equal */ 61) {
        addOptionValue(options, arg.charAt(1), arg.substring(3));
        continue;
      }

      // multiple short option names
      for (let i = 1; i < argLen; i += 1) options[arg.charAt(i)] ??= [];
      continue;
    }
    // Option with double hyphens
    else {
      const equalIndex = findCharCode(arg, /* equal */ 61, 3, argLen);

      // long option with equal-separated value
      if (equalIndex !== -1) {
        addOptionValue(
          options,
          arg.substring(2, equalIndex),
          arg.substring(equalIndex + 1)
        );
        continue;
      }

      // just a long option name
      const optionName = arg.slice(2);
      const option = (options[optionName] ??= []);
      if (!optionsDefinition[optionName]?.isFlag)
        currentValueContainer = option;
    }
  }

  return options;
};
