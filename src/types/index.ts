export type JSONPrimitive = string | number | boolean | null;

export type JSONValue =
  | JSONPrimitive
  | readonly JSONValue[]
  | { [key: string]: JSONValue };