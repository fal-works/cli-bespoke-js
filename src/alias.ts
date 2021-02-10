export type AliasRecord<T> = Partial<
  Record<keyof T, string | readonly string[]>
>;

export class AliasMap<T = Record<string, unknown>> extends Map<
  string,
  Extract<keyof T, string>
> {}

export const createAliasMap = <T>(aliases: AliasRecord<T>): AliasMap<T> => {
  const reversedMap = new AliasMap<T>();

  for (const optionName in aliases) {
    const alias: string | readonly string[] | undefined = aliases[optionName];
    if (alias === undefined) continue;
    if (typeof alias === "string") reversedMap.set(alias, optionName);
    else for (const aliasName of alias) reversedMap.set(aliasName, optionName);
  }

  return reversedMap;
};
