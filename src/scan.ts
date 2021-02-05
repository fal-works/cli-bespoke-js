const scanEqualSeaparated = (
  arg: string,
  argLen: number,
  options: Record<string, string[]>
) => {
  for (let i = 3; i < argLen; ++i) {
    if (arg.charCodeAt(i) !== 61) continue;

    const name = arg.substring(2, i);
    const value = arg.substring(i + 1);
    const option = options[name];
    if (option === undefined) options[name] = [value];
    else option.push(value);
    return true;
  }
  return false;
};

export const scan = (
  args: readonly string[],
  maybeValueAfterSpace: (optionName: string) => boolean
): Readonly<Record<string, readonly string[]>> => {
  const parameters: string[] = [];
  const options: Record<string, string[]> = { _: parameters };
  let currentParameterContainer = parameters;

  const len = args.length;
  for (let argIndex = 0; argIndex < len; ++argIndex) {
    // eslint-disable-next-line total-functions/no-unsafe-type-assertion
    const arg = args[argIndex] as string;

    if (arg.charCodeAt(0) === /* hyphen */ 45) {
      const argLen = arg.length;
      if (arg.charCodeAt(1) === /* hyphen */ 45) {
        if (argLen === 2) {
          for (let i = argIndex + 1; i < len; ++i) {
            // eslint-disable-next-line total-functions/no-unsafe-type-assertion
            parameters.push(args[i] as string);
          }
          break;
        }
        if (scanEqualSeaparated(arg, argLen, options)) continue;
        const optionName = arg.slice(2);
        if (maybeValueAfterSpace(optionName))
          currentParameterContainer = options[optionName] ??= [];
        else options[optionName] ??= [];
      } else {
        switch (argLen) {
          case 0:
            continue;
          case 1:
            continue;
          case 2:
            // eslint-disable-next-line total-functions/no-unsafe-type-assertion
            currentParameterContainer = options[arg[1] as string] ??= [];
            continue;
          default:
            if (arg.charCodeAt(2) === 61) {
              // eslint-disable-next-line total-functions/no-unsafe-type-assertion
              const name = arg[1] as string;
              const option = options[name];
              const value = arg.substring(3);
              if (option === undefined) options[name] = [value];
              else option.push(value);
              continue;
            }
            // eslint-disable-next-line total-functions/no-unsafe-type-assertion
            for (let i = 2; i < argLen; ++i) options[arg[i] as string] ??= [];
            continue;
        }
      }
    } else {
      currentParameterContainer.push(arg);
      currentParameterContainer = parameters;
    }
  }

  return options;
};
