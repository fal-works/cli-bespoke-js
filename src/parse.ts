import { scan } from "./scan.js";
import { validate } from "./validate.js";
import type { OptionsDefinition } from "./options-definition";

export const parse = <T extends Record<string, unknown>>(
  args: readonly string[],
  optionsDefinition: OptionsDefinition<T>
): T => validate(scan(args, optionsDefinition), optionsDefinition);
