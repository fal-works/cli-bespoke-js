export type AliasRecord = Record<string, string | readonly string[]>;

export const createAliasMap = (aliases: AliasRecord): Map<string, string> => {
  const reversedMap = new Map<string, string>();

  for (const optionName in aliases) {
    const alias: string | readonly string[] | undefined = aliases[optionName];
    if (alias === undefined) continue;
    if (typeof alias === "string") reversedMap.set(alias, optionName);
    else for (const aliasName of alias) reversedMap.set(aliasName, optionName);
  }

  return reversedMap;
};

export const createAliasMapFunction = (
  aliases: AliasRecord
): ((name: string) => string) => {
  const aliasMap = createAliasMap(aliases);
  return (name) => aliasMap.get(name) ?? name;
};
