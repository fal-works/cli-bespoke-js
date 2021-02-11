export type StringRecord<T = unknown> = Record<string, T>;
export type LazyProps<T> = { [P in keyof T]: () => T[P] };
